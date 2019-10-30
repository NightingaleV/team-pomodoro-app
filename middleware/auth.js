const jwt = require('jsonwebtoken');
require('dotenv').config();

// https://medium.com/@SilentHackz/simple-way-to-secure-react-apps-using-jwt-and-react-router-2b4a05d780a3
// Todo update axiom request that token will be set from local storage with every request

export default function auth(req, res, next) {
  // Get token from header
  const token = req.headers['x-auth-token'] || req.cookies.token || '';
  if (!token) {
    res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    let decoded = jwt.verify(token, process.env.JWTPrivateKey);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}
