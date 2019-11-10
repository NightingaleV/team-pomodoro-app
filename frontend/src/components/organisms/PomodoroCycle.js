// External imports
import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
  useContext,
  createContext,
  useMemo,
} from 'react';

// Internal imports
import { PomodoroTimer } from '../organisms';
import { convertMinToSec, formatTime } from '../../utils/pomodoroUtils';

export function PomodoroCycle(props) {
  // DEFAULTS
  //----------------------------------------------------------------------------
  const POMODORO_SETTINGS = {
    pomodoro: { type: 1, name: 'Work', totTime: convertMinToSec(25) },
    shortBreak: { type: 2, name: 'Short Break', totTime: convertMinToSec(5) },
    longBreak: { type: 3, name: 'Long Break', totTime: convertMinToSec(15) },
  };

  //TODO POST TIMER WHEN CREATED

  // Component State
  //----------------------------------------------------------------------------
  let [pomodoroCycles, setPomodoroCycles] = useState([]);
  // default settings

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
      let newTimerIndex = pomodoroCycles.length + 1;
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

  // Component State
  //----------------------------------------------------------------------------
  function setNewTimerToCycle(item) {
    setPomodoroCycles(prevIterations => {
      return [...prevIterations, item];
    });
  }

  function initNextTimerInRow() {
    let nextTimer = pickTimerSettings();
    setNewTimerToCycle(nextTimer);
  }

  function removeLastTimer() {
    setPomodoroCycles(prevTimer => {
      const removedElement = prevTimer.pop();
      return prevTimer;
    });
  }

  // Make state for Current Timer
  function getCurrentTimer() {
    return pomodoroCycles[pomodoroCycles.length - 1];
  }

  function cleanIterations() {
    setPomodoroCycles([]);
  }

  function reinitiateCurrentTimer() {
    // Pick Last Timer object
    const lastIteration = getCurrentTimer();
    // Pick Same Settings
    const timerSettings = pickTimerSettings(lastIteration.type);
    // Drop the item
    removeLastTimer();
    // Recreate it
    setNewTimerToCycle(timerSettings);
  }

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
    setPomodoroCycles(prevIterations => {
      return [...prevIterations, null];
    });
    const iterationSetting = POMODORO_SETTINGS.shortBreak;
    // Recreate it
    setNewTimerToCycle(iterationSetting);
  }

  function setLongBreak() {
    cleanIterations();
    // Pick Settings
    setPomodoroCycles(prevIterations => {
      return [...prevIterations, null, null, null, null, null, null, null];
    });
    const iterationSetting = POMODORO_SETTINGS.longBreak;
    // Recreate it
    setNewTimerToCycle(iterationSetting);
  }

  // Component Lifecycle
  //----------------------------------------------------------------------------
  useEffect(() => {}, []);

  return (
    <>
      <PomodoroTimer
        currentSettings={pomodoroCycles[pomodoroCycles.length - 1]}
        pomodoroCycles={pomodoroCycles}
        initNextTimerInRow={initNextTimerInRow}
        reinitiateCurrentTimer={reinitiateCurrentTimer}
        dropdownControlHandlers={{
          setWork: setWork,
          setShortBreak: setShortBreak,
          setLongBreak: setLongBreak,
        }}
      />
    </>
  );
}
