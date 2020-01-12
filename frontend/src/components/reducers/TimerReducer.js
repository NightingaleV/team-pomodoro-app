import { convertMinToSec } from '../../utils/pomodoroUtils';
import { TimerDispatcher } from './TimerDispatcher';
import { updateProgressBar } from '../../utils/pomodoroUtils';
import notificationSound from '../../assets/sounds/bubble_pop2.mp3';

const POMODORO_SETTINGS = {
  pomodoro: { type: 1, name: 'Work', totTime: convertMinToSec(25) },
  shortBreak: { type: 2, name: 'Short Break', totTime: convertMinToSec(5) },
  longBreak: { type: 3, name: 'Long Break', totTime: convertMinToSec(15) },
};

export function TimerReducer(timerContextData) {
  const { timer, setTimerState, timerReference, token } = timerContextData;

  //----------------------------------------------------------------------------
  // Timer Settings Control
  //----------------------------------------------------------------------------
  function setTimerSettings(settings) {
    setTimerSettingsState(settings);
    setRemTime(settings.totTime);
    resetProgress();
  }

  function initNextTimer() {
    let nextTimerSettings = pickTimerSettings(timer);
    setTimerSettings(nextTimerSettings);
    const newIndex = timer.indexInCycle >= 8 ? 1 : timer.indexInCycle + 1;
    setIndexInCycle(newIndex);
  }

  function setWork() {
    pauseTimer();
    let nextTimerSettings = pickTimerSettings(timer, 1);
    setTimerSettings(nextTimerSettings);
    setIndexInCycle(1);
  }
  function setShortBreak() {
    pauseTimer();
    let nextTimerSettings = pickTimerSettings(timer, 2);
    setTimerSettings(nextTimerSettings);
    setIndexInCycle(2);
  }
  function setLongBreak() {
    pauseTimer();
    let nextTimerSettings = pickTimerSettings(timer, 3);
    setTimerSettings(nextTimerSettings);
    setIndexInCycle(8);
  }

  //----------------------------------------------------------------------------
  // Timer Api Control
  //----------------------------------------------------------------------------
  const {
    fetchTimerData,
    sendNewTimerData,
    updateTimerData,
    saveTimerLog,
  } = TimerDispatcher(token);
  async function initTimer() {
    if (token) {
      const timerDataPromise = fetchTimerData();
      await timerDataPromise.then(timerData => {
        if (timerData) {
          const { remTime, isRunning, settings, _id, indexInCycle } = timerData;
          setTimerState(prevState => {
            return {
              ...prevState,
              timerID: _id,
              remTime: remTime,
              settings: settings,
              isRunning: isRunning,
              indexInCycle: indexInCycle,
              progressBar: updateProgressBar(remTime, settings.totTime),
            };
          });
          if (isRunning) {
            startTimer();
          }
        } else {
          // NO TIMER IN DB
          // Send the data
          console.log('No timer IN DB');
          const newTimerData = sendNewTimerData(timer);
          newTimerData.then(timerData => {
            // Set the new timer
            setWork();
            // Set the timer ID
            setTimerState(prevState => {
              return {
                ...prevState,
                timerID: timerData._id,
              };
            });
          });
        }
      });
    }
  }

  //----------------------------------------------------------------------------
  // Timer State Control functions
  //----------------------------------------------------------------------------
  function tick() {
    setTimerState(prevState => {
      const newState = {
        ...prevState,
        remTime: prevState.remTime - 1,
        progressBar: updateProgressBar(
          prevState.remTime - 1,
          prevState.settings.totTime,
        ),
      };

      // NOTIFICATION SOUND
      if (prevState.remTime - 1 <= 0) {
        const audio = new Audio(notificationSound);
        //run every 5 minutes
        if ((prevState.remTime - 1) % convertMinToSec(5) === 0) {
          audio.play();
        }
      }
      // If user signed, then update in DB
      if (token) {
        updateTimerData(newState);
      }
      console.log(newState);
      return newState;
    });
  }
  // wrap for timer state
  function updateTimer(value) {
    timerReference.timerRef.current = value;
    timerReference.setTimerRefState(timerReference.timerRef.current);
  }

  function setTimerRunning(isRunning = false) {
    setTimerState(prevState => {
      const newState = {
        ...prevState,
        isRunning: isRunning,
      };
      if (token) {
        updateTimerData(newState);
      }
      return newState;
    });
  }

  function setTimerID(newId) {
    setTimerState(prevState => {
      return {
        ...prevState,
        timerID: newId,
      };
    });
  }
  function setTimerSettingsState(newSettings) {
    setTimerState(prevState => {
      const newState = {
        ...prevState,
        settings: newSettings,
      };
      return newState;
    });
  }

  function setRemTime(numOfSec) {
    setTimerState(prevState => {
      const newState = {
        ...prevState,
        remTime: numOfSec,
      };
      if (token) {
        updateTimerData(newState);
      }
      return newState;
    });
  }
  function setIndexInCycle(newIndex) {
    setTimerState(prevState => {
      const newState = {
        ...prevState,
        indexInCycle: newIndex,
      };
      if (token) {
        updateTimerData(newState);
      }
      return newState;
    });
  }
  function resetProgress() {
    setTimerState(prevState => {
      return {
        ...prevState,
        progressBar: 100,
      };
    });
  }
  //----------------------------------------------------------------------------
  // Timer Control High Lvl API
  //----------------------------------------------------------------------------
  function startTimer() {
    if (!timer.isRunning) {
      updateTimer(
        setInterval(() => {
          tick();
        }, 1000),
      );
      setTimerRunning(true);
    }
  }

  function pauseTimer() {
    if (timerReference.timerRefState) {
      updateTimer(clearInterval(timerReference.timerRefState));
      if (timer.isMounted) {
        setTimerRunning(false);
      }
    }
  }

  function nextTimer() {
    pauseTimer();
    saveTimerLog(timer);
    initNextTimer();
  }

  function restartTimer() {
    pauseTimer();
    let timerSettings = pickTimerSettings(timer, 0, true);
    setTimerSettings(timerSettings);
    const audio = new Audio(notificationSound);
    audio.play();
  }

  return {
    initTimer,
    startTimer,
    pauseTimer,
    nextTimer,
    restartTimer,
    setWork,
    setShortBreak,
    setLongBreak,
    setTimerID,
  };
}

function pickTimerSettings(timer, typeId = 0, reinitiate = false) {
  if (typeId) {
    switch (typeId) {
      case 2:
        return POMODORO_SETTINGS.shortBreak;
      case 3:
        return POMODORO_SETTINGS.longBreak;
      default:
        return POMODORO_SETTINGS.pomodoro;
    }
  } else {
    // Short Break
    let newTimerIndex;
    if (reinitiate) {
      newTimerIndex = timer.indexInCycle;
    } else {
      newTimerIndex = timer.indexInCycle >= 8 ? 1 : timer.indexInCycle + 1;
    }
    if (newTimerIndex % 8 === 0) {
      return POMODORO_SETTINGS.longBreak;
    }
    // Long Break
    else if (newTimerIndex % 2 === 0) {
      return POMODORO_SETTINGS.shortBreak;
    }
    // Pomodoro
    else {
      return POMODORO_SETTINGS.pomodoro;
    }
  }
}
