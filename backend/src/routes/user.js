// External imports
import express from 'express';
import { check, validationResult } from 'express-validator';
// import gravatar from 'gravatar';

// Internal imports
import { User } from '../models/User';

const jwt = require('jsonwebtoken');
const router = express.Router();

// @route   POST api/user/register
// @desc    Registration of user account
// @access  Public
router.post(
  '/register',
  [
    check('email', 'Email is invalid')
      .isEmail()
      .custom((value, { req }) => {
        return new Promise((resolve, reject) => {
          User.findOne({ email: req.body.email }, function(err, user) {
            if (err) {
              reject(new Error('Server Error'));
            }
            if (Boolean(user)) {
              reject(new Error('E-mail already in use'));
            }
            resolve(true);
          });
        });
      }),
    check(
      'password',
      'Please enter a password with 6 or more characters;',
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    //Return validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      let user;
      //Get users gravatar
      // const avatar = gravatar.url(email, {
      //   s: '200',
      //   r: 'pg',
      //   d: 'mm',
      // });

      user = new User({
        name,
        email,
        password,
      });
      // save user to database
      user.save(function(err) {
        if (err) throw err;
      });

      // Return json web token for authentication
      const payload = {
        user: { id: user.id },
      };

      jwt.sign(
        payload,
        process.env.JWTPrivateKey,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
          });
        },
      );

      //return res.send('User Registered')
    } catch (err) {
      console.log(err);
      return res.status(500).send('Server Error, Try it later');
    }

    console.log(req.body);
    //res.send('User1 Test Route');
  },
);

export { router as userRouter };
