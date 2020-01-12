// External imports
import express from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Internal imports
import { User } from '../models/User';

import {
  validateRegistration,
  createUser,
  addTimer,
  addGroup,
  selectUserWithGroups,
  selectUserByName,
  selectUserById,
  changeSettings,
  signInUser,
  validateLogin,
} from '../controllers/user';

import auth from '../middleware/auth';

dotenv.config();
const router = express.Router();

// @route   POST api/user/register
// @desc    Registration of user account
// @access  Public
router.post('/register', validateRegistration(), createUser);

// @route    POST api/user/login
// @desc     Authenticate user & get token
// @access   Public
router.post('/login', validateLogin(), signInUser);

// @route   GET api/user/get
// @desc    Get user by ID
// @access  Private
router.get('/get/:id', selectUserById);

// @route   GET api/user/invite
// @desc    Get user to invite into a group
// @access  Private
router.get('/invite/:email', selectUserByName);

// @route   POST api/user/addTimer
// @desc    Add timer to user
// @access  Private
router.post('/addTimer', addTimer);

// @route   POST api/user/settings
// @desc    Change settings to user
// @access  Private
router.post('/settings', auth, changeSettings);

// @route   POST api/user/addGroup
// @desc    Add group to users groups
// @access  Private
router.post('/addGroup', addGroup);

// @route   POST api/user/addGroup
// @desc    Select user with groups
// @access  Private
router.get('/userGroups', selectUserWithGroups);

export { router as userRouter };
