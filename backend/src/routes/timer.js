//External imports
import express from 'express';

//Internal imports
import { Timer } from '../models/Timer';

//Mame pouzivat jednotne require nebo import?
//import dotenv jsem nevedel jak udelat
import dotenv from 'dotenv';
//import dotenv from 'dotenv';

const router = express.Router();

// @route   GET api/timer/
// @desc    get timer by userID
// @access  Private
router.get('/', async (req, res) => {
  try {
    const user = req.query.userID;

    //Filter timer by userID
    //const allTimers = await Timer.find().where({userID: user});

    //Select all timers
    const allTimers = await Timer.find();

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
router.post('/save', async (req, res) => {
  const { type, name, totTime, remTime, userID, isRunning } = req.body;
  try {
    let timer;

    timer = new Timer({
      type,
      name,
      totTime,
      remTime,
      userID,
      isRunning,
    });

    //save timer to database
    timer.save().then(
      timer => {
        res.json({
          timer,
        });
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
});

export { router as timerRouter };
