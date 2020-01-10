//External imports

//Internal imports
import { Timer } from '../models/Timer';

// LOGIC
//------------------------------------------------------------------------------
export async function selectLastTimer(req, res) {
  try {
    const userID = req.user.id;
    const lastActiveTimer = await Timer.findOne({ userID: userID }).sort({
      updatedAt: -1,
    });
    await res.json(lastActiveTimer);
  } catch (err) {
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
    return res.status(500).send('Server Error, Try it later');
  }
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
    return res.status(500).send('Server Error, Try it later');
  }
}

// VALIDATION
//------------------------------------------------------------------------------
