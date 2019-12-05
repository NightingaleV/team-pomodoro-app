import { convertMinToSec } from '../../utils/pomodoroUtils';

const POMODORO_SETTINGS = {
  pomodoro: { type: 1, name: 'Work', totTime: convertMinToSec(25) },
  shortBreak: { type: 2, name: 'Short Break', totTime: convertMinToSec(5) },
  longBreak: { type: 3, name: 'Long Break', totTime: convertMinToSec(15) },
};

export function PomodoroReducer({ pomodoroState, setPomodoroState }) {
  //----------------------------------------------------------------------------
  // Pomodoro State Control functions
  //----------------------------------------------------------------------------
  function setNewTimerToCycle(item) {
    setPomodoroState(prevIterations => {
      return [...prevIterations, item];
    });
  }

  function initNextTimerInRow() {
    let nextTimer = pickTimerSettings();
    setNewTimerToCycle(nextTimer);
  }

  function removeLastTimer() {
    setPomodoroState(prevTimer => {
      const removedElement = prevTimer.pop();
      return prevTimer;
    });
  }

  // Make state for Current Timer
  function getCurrentTimerSetting() {
    return pomodoroState[pomodoroState.length - 1];
  }

  function cleanIterations() {
    setPomodoroState([]);
  }

  function reinitiateCurrentTimer() {
    // Pick Last Timer object
    const lastIteration = getCurrentTimerSetting();
    // Pick Same Settings
    const timerSettings = pickTimerSettings(lastIteration.type);
    // Drop the item
    removeLastTimer();
    // Recreate it
    setNewTimerToCycle(timerSettings);
  }

  function pickTimerSettings(typeId = 0) {
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
      let newTimerIndex = pomodoroState.length + 1;
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

  //----------------------------------------------------------------------------
  // Prepared Setters for dropdown button
  //----------------------------------------------------------------------------
  function setWork() {
    cleanIterations();
    // Pick Settings
    const timerSettings = POMODORO_SETTINGS.pomodoro;
    // Recreate it
    setNewTimerToCycle(timerSettings);
  }

  function setShortBreak() {
    cleanIterations();
    // Pick Settings
    setPomodoroState([null]);
    const iterationSetting = POMODORO_SETTINGS.shortBreak;
    // Recreate it
    setNewTimerToCycle(iterationSetting);
  }

  function setLongBreak() {
    cleanIterations();
    // Pick Settings
    setPomodoroState(prevIterations => {
      return [null, null, null, null, null, null, null];
    });
    const iterationSetting = POMODORO_SETTINGS.longBreak;
    // Recreate it
    setNewTimerToCycle(iterationSetting);
  }

  return {
    initNextTimerInRow: () => {
      initNextTimerInRow();
    },
    reinitiateCurrentTimer: () => {
      reinitiateCurrentTimer();
    },
    setWork: () => {
      setWork();
    },
    setShortBreak: () => {
      setShortBreak();
    },
    setLongBreak: () => {
      setLongBreak();
    },
    getCurrentTimerSetting: () => {
      getCurrentTimerSetting();
    },
  };
}
