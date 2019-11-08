//External imports
import express from 'express';

//Internal imports
import { selectTimer, createTimer } from '../controllers/timer';

const router = express.Router();

// @route   GET api/timer/
// @desc    get timer by userID
// @access  Private
router.get('/', selectTimer);

// @route   POST api/timer/save
// @desc    Save timer status
// @access  Private
router.post('/save', createTimer);

export { router as timerRouter };
