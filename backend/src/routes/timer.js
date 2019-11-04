//External imports
import express from 'express';
import dotenv from 'dotenv';

//Internal imports
import { Timer } from '../models/Timer';
import {createTimer} from '../controllers/timer';

const router = express.Router();

// @route   GET api/timer/
// @desc    get timer by userID
// @access  Private
router.get('/', async (req, res) => {
  try {
    const user = req.query.userID;

    //Filter timer by userID
    const allTimers = await Timer.find().where({userID: user});

    //Select all timers
    // const allTimers = await Timer.find();

    // const timer = allTimers[allTimers.length - 1];

    //Return single timer
    // await res.json({timer: timer});

    //Return all timers
    await res.json({ allTimers: allTimers });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST api/timer/save
// @desc    Save timer status
// @access  Private
router.post('/save', createTimer);

export { router as timerRouter };
