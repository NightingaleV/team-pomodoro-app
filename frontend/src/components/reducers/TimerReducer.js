import { convertMinToSec } from '../../utils/pomodoroUtils';
import { usePomodoro } from '../providers/PomodoroProvider';
import { useEffect } from 'react';

const POMODORO_SETTINGS = {
  pomodoro: { type: 1, name: 'Work', totTime: convertMinToSec(25) },
  shortBreak: { type: 2, name: 'Short Break', totTime: convertMinToSec(5) },
  longBreak: { type: 3, name: 'Long Break', totTime: convertMinToSec(15) },
};

export function TimerReducer(timerContextData) {
  const { timer, setTimerState, timerReference } = timerContextData;

  //----------------------------------------------------------------------------
  // Timer Settings Control
  //----------------------------------------------------------------------------
  function pickTimerSettings(typeId = 0, reinitiate = false) {
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
  function setTimerSettings(settings) {
    setTimerSettingsState(settings);
    setRemTime(settings.totTime);
    const newIndex = timer.indexInCycle + 1;
    setIndexInCycle(newIndex);
  }

  function initNextTimer() {
    let nextTimerSettings = pickTimerSettings();
    setTimerSettings(nextTimerSettings);
  }

  function setWork() {
    let nextTimerSettings = pickTimerSettings(1);
    setTimerSettings(nextTimerSettings);
    setIndexInCycle(1);
  }
  function setShortBreak() {
    let nextTimerSettings = pickTimerSettings(2);
    setTimerSettings(nextTimerSettings);
    setIndexInCycle(2);
  }
  function setLongBreak() {
    let nextTimerSettings = pickTimerSettings(3);
    setTimerSettings(nextTimerSettings);
    setIndexInCycle(8);
  }

  //----------------------------------------------------------------------------
  // Timer State Control functions
  //----------------------------------------------------------------------------
  function subtractSeconds() {
    setTimerState(prevState => {
      return {
        ...prevState,
        remTime: prevState.remTime - 1,
      };
    });
  }
  // wrap for timer state
  function updateTimer(value) {
    timerReference.timerRef.current = value;
    timerReference.setTimerRefState(timerReference.timerRef.current);
  }

  function setTimerRunning(isRunning = false) {
    setTimerState(prevState => {
      return {
        ...prevState,
        isRunning: isRunning,
      };
    });
  }

  function setTimerSettingsState(newSettings) {
    setTimerState(prevState => {
      return {
        ...prevState,
        settings: newSettings,
      };
    });
  }

  function setRemTime(numOfSec) {
    setTimerState(prevState => {
      return {
        ...prevState,
        remTime: numOfSec,
      };
    });
  }
  function setIndexInCycle(newIndex) {
    setTimerState(prevState => {
      return {
        ...prevState,
        indexInCycle: newIndex,
      };
    });
  }

  function updateProgressBar() {
    //Round to 2 digits
    let progressBar =
      Math.round((timer.remTime / timer.settings.totTime) * 10000) / 100;

    setTimerState(prevState => {
      return {
        ...prevState,
        progressBar: progressBar,
      };
    });
  }
  //----------------------------------------------------------------------------
  // Timer Control High Lvl API
  //----------------------------------------------------------------------------

  // Tick - Run every second
  function tick() {
    subtractSeconds();
    updateProgressBar();
  }
  //----------------------------------------------------------------------------
  // Timer Control High Lvl API
  //----------------------------------------------------------------------------
  function startTimer() {
    updateTimer(
      setInterval(() => {
        tick();
      }, 1000),
    );
    setTimerRunning(true);
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
    let timerSettings = pickTimerSettings(0, true);
    setTimerSettings(timerSettings);
  }

  return {
    startTimer: () => {
      startTimer();
    },
    pauseTimer: () => {
      pauseTimer();
    },
    nextTimer: () => {
      nextTimer();
    },
    restartTimer: () => {
      restartTimer();
    },
  };
}
