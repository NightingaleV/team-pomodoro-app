//External imports
import express from 'express';

//Internal imports
import { selectTimer, createTimer, updateTimer } from '../controllers/timer';
import auth from '../../../middleware/auth';

const router = express.Router();

//TODO make routes protected, also give it header to postman

// @route   GET api/timer/
// @desc    get timer by userID
// @access  Private
router.get('/', selectTimer);

// @route   POST api/timer/save
// @desc    Save timer status
// @access  Private
router.post('/save', createTimer);

// @route   POST api/timer/save
// @desc    Save timer status
// @access  Private
router.post('/update', updateTimer);

export { router as timerRouter };
