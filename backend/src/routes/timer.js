//External imports
import express from 'express';

//Internal imports
import {
  selectTimer,
  createTimer,
  updateTimer,
  selectLastTimer,
  saveTimerLog,
} from '../controllers/timer';
import auth from '../middleware/auth';

const router = express.Router();

// @route   GET api/timer/
// @desc    get timer by userID
// @access  Private
router.get('/', auth, selectLastTimer);

// @route   POST api/timer/save
// @desc    Save timer status
// @access  Private
router.post('/save', auth, createTimer);

// @route   POST api/timer/save
// @desc    Save timer log for statistics
// @access  Private
router.post('/saveLog', auth, saveTimerLog);

// @route   POST api/timer/save
// @desc    Save timer status
// @access  Private
router.post('/update', auth, updateTimer);

export { router as timerRouter };
