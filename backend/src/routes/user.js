// External imports
import express from 'express';
// import verifyToken from '../../middleware/auth';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

// Internal imports
import { User } from '../models/User';
import auth from '../../../middleware/auth';

require('dotenv').config();
const jwt = require('jsonwebtoken');
const router = express.Router();

// @route   GET api/user/
// @desc    get user by token
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    await res.json({ user: user });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

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
      user.save().then(
        user => {
          res.json({
            user: user.email,
          });

          // const payload = {
          //   user: { id: user.id },
          // };
          // // Send jwt auth token
          // jwt.sign(
          //   payload,
          //   process.env.JWTPrivateKey,
          //   {
          //     expiresIn: 360000,
          //   },
          //   (err, token) => {
          //     if (err) throw err;
          //     res.json({
          //       token,
          //     });
          //   },
          // );
        },
        err => {
          if (err) {
            throw err;
          }
        },
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send('Server Error, Try it later');
    }

    console.log(req.body);
    //res.send('User1 Test Route');
  },
);

// @route    POST api/user/login
// @desc     Authenticate user & get token
// @access   Public
// TODO uncought error Cannot read property 'type' - after bad password
router.post(
  '/login',
  [
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Please enter a password').exists(),
  ],
  async (req, res) => {
    // Return validation
    const errors = validationResult(req);
    process.stdout.write(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      // User with that email not found
      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Meh, we were unable to find you using these credentials.',
            },
          ],
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Meh, we were unable to find you using these credentials.',
            },
          ],
        });
      }

      // Return jsonwebtoken for authentication
      const payload = {
        user: { id: user.id },
      };

      jwt.sign(
        payload,
        process.env.JWTPrivateKey,
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          // return res.cookie('token', token, { httpOnly: true }).sendStatus(200);
          res.json({
            token,
            user,
          });
        },
      );

      //return res.send('User Registered')
    } catch (err) {
      console.log(err);
      return res.status(500).send('Server Error, Try it later');
    }

    // console.log(req.body);
    //res.send('User1 Test Route');
  },
);

export { router as userRouter };
