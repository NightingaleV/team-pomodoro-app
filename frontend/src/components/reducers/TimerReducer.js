import { convertMinToSec } from '../../utils/pomodoroUtils';
import { TimerDispatcher } from './TimerDispatcher';
import { updateProgressBar } from '../../utils/pomodoroUtils';
import axios from 'axios';

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
    const newIndex = timer.indexInCycle + 1;
    setIndexInCycle(newIndex);
  }

  function setWork() {
    let nextTimerSettings = pickTimerSettings(timer, 1);
    setTimerSettings(nextTimerSettings);
    setIndexInCycle(1);
  }
  function setShortBreak() {
    let nextTimerSettings = pickTimerSettings(timer, 2);
    setTimerSettings(nextTimerSettings);
    setIndexInCycle(2);
  }
  function setLongBreak() {
    let nextTimerSettings = pickTimerSettings(timer, 3);
    setTimerSettings(nextTimerSettings);
    setIndexInCycle(8);
  }

  //----------------------------------------------------------------------------
  // Timer Api Control
  //----------------------------------------------------------------------------
  const { fetchTimerData, sendNewTimerData, updateTimerData } = TimerDispatcher(
    token,
  );
  async function initTimer() {
    const timerDataPromise = fetchTimerData();
    await timerDataPromise.then(timerData => {
      console.log(timerData);
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
        // Send the data
        const newTimerData = sendNewTimerData(timer);
        newTimerData.then(timerData => {
          // Set the timer ID
          const { _id } = timerData;
          setTimerState(prevState => {
            return {
              ...prevState,
              timerID: _id,
            };
          });
        });
      }
    });
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
      updateTimerData(newState);
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
      updateTimerData(newState);
      return newState;
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
      updateTimerData(newState);
      return newState;
    });
  }
  function setIndexInCycle(newIndex) {
    setTimerState(prevState => {
      const newState = {
        ...prevState,
        indexInCycle: newIndex,
      };
      updateTimerData(newState);
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
    initNextTimer();
  }

  function restartTimer() {
    pauseTimer();
    let timerSettings = pickTimerSettings(timer, 0, true);
    setTimerSettings(timerSettings);
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
  };
}

function pickTimerSettings(timer, typeId = 0, reinitiate = false) {
  if (typeId) {
    switch (typeId) {
      case 1:
        return POMODORO_SETTINGS.pomodoro;
        break;
      case 2:
        return POMODORO_SETTINGS.shortBreak;
        break;
      case 3:
        return POMODORO_SETTINGS.longBreak;
        break;
    }
  } else {
    // Short Break
    let newTimerIndex = reinitiate
      ? timer.indexInCycle
      : timer.indexInCycle + 1;
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
