//External imports

//Internal imports
import {Timer} from '../models/Timer';

// LOGIC
//------------------------------------------------------------------------------
export async function createTimer(req, res){
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
}

// VALIDATION
//------------------------------------------------------------------------------