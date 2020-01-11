//External imports
import mongoose from 'mongoose';
//Internal imports
import { Timer } from '../models/Timer';
import { User } from '../models/User';
import { TimerLog } from '../models/TimerLog';

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

    const user = User.findOneAndUpdate(
      { _id: userID },
      { timerID: timer._id },
      { new: true },
      (err, result) => {
        // Rest of the action goes here
      },
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error, Try it later');
  }

  console.log(req.body);
}

export async function updateTimer(req, res) {
  try {
    const { timerID, isRunning, remTime, settings, indexInCycle } = req.body;
    const userID = req.user.id;
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
}

export async function saveTimerLog(req, res) {
  // Data from request

  try {
    const { type, length, indexInCycle } = req.body;
    const userID = req.user.id;
    let timerLog;

    timerLog = new TimerLog({
      type,
      length,
      indexInCycle,
      userID,
    });

    //save timer to database
    timerLog.save().then(
      timerLog => {
        res.json({
          timerLog,
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

export async function getTimerLog(req, res) {
  // Data from request
  try {
    const userID = req.user.id;
    // const getStats = await TimerLog.find({ userID: userID });
    // const aggregatedResult = await TimerLog.distinct('type');
    const aggregatedResult = await TimerLog.aggregate([
      { $match: { userID: new mongoose.Types.ObjectId(userID) } },

      {
        $group: {
          _id: {
            day: { $dayOfYear: '$createdAt' },
            month: { $month: '$createdAt' },
            week: { $week: '$createdAt' },
            year: { $year: '$createdAt' },
          },
          total: { $sum: '$length' },
        },
      },
      { $sort: { '_id.day': -1, '_id.month': -1, '_id.year': -1 } },
    ]).sort('-day');
    console.log(aggregatedResult);
    await res.json(aggregatedResult);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
  }
}

// VALIDATION
//------------------------------------------------------------------------------
