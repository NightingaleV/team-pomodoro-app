// External imports
import express from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Internal imports
import { User } from '../models/User';

import {
  validateUser,
  createUser,
  addTimer,
  addGroup,
  selectUserWithGroups,
} from '../controllers/user';

import auth from '../middleware/auth';

dotenv.config();
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
router.post('/register', validateUser(), createUser);

// @route    POST api/user/login
// @desc     Authenticate user & get token
// @access   Public
// TODO uncought error Cannot read property 'type' - after bad password
// TODO use promises instead of callbacks
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

      const token = jwt.sign(
        { user: { id: user.id } },
        process.env.JWTPrivateKey,
      );
      return res.status(200).json({
        token,
        user,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send('Server Error, Try it later');
    }
    console.log(req.body);
  },
);

// @route   POST api/user/addTimer
// @desc    Add timer to user
// @access  Private
router.post('/addTimer', addTimer);

// @route   POST api/user/addGroup
// @desc    Add group to users groups
// @access  Private
router.post('/addGroup', addGroup);

// @route   POST api/user/addGroup
// @desc    Select user with groups
// @access  Private
router.get('/userGroups', selectUserWithGroups);

export { router as userRouter };
