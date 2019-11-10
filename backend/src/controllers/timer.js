//External imports
import mongoose from 'mongoose';
//Internal imports
import { Timer } from '../models/Timer';
import { User } from '../models/User';

// LOGIC
//------------------------------------------------------------------------------
export async function selectTimer(req, res) {
  try {
    const userID = req.query.userID;
    const allTimers = await Timer.find().where({ userID: userID });
    await res.json({ allTimers: allTimers });
  } catch (err) {
    return res.status(500).send('Server Error');
  }
}

export async function selectLastTimer(req, res) {
  try {
    const userID = req.user.id;
    const lastActiveTimer = await Timer.findOne({ userID: userID }).sort({
      updatedAt: -1,
    });
    await res.json(lastActiveTimer);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
  }
}

export async function createTimer(req, res) {
  const { isRunning, remTime, settings, indexInCycle } = req.body;
  const userID = req.user.id;
  try {
    let timer;

    timer = new Timer({
      isRunning,
      remTime,
      settings,
      userID,
      indexInCycle,
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
}

export async function updateTimer(req, res) {
  const { timerID, isRunning, remTime, settings, indexInCycle } = req.body;
  const userID = req.user.id;
  try {
    const updatedTimer = {
      isRunning,
      remTime,
      settings,
      userID,
      indexInCycle,
    };
    let timer = await Timer.findOneAndUpdate({ _id: timerID }, updatedTimer, {
      new: true,
    });
    await res.json({ timer });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error, Try it later');
  }

  console.log(req.body);
}

// VALIDATION
//------------------------------------------------------------------------------
