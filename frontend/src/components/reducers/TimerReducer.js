import { convertMinToSec } from '../../utils/pomodoroUtils';

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
  // Timer State Control functions
  //----------------------------------------------------------------------------
  function tick() {
    setTimerState(prevState => {
      return {
        ...prevState,
        remTime: prevState.remTime - 1,
        progressBar: updateProgressBar(prevState.remTime - 1),
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
  function resetProgress() {
    setTimerState(prevState => {
      return {
        ...prevState,
        progressBar: 100,
      };
    });
  }

  function updateProgressBar(remTime) {
    //Round to 2 digits
    let newProgressValue =
      Math.round((remTime / timer.settings.totTime) * 10000) / 100;
    return newProgressValue;
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
    let timerSettings = pickTimerSettings(timer, 0, true);
    setTimerSettings(timerSettings);
  }

  return {
    startTimer: startTimer,
    pauseTimer: pauseTimer,
    nextTimer: nextTimer,
    restartTimer: restartTimer,
    setWork: setWork,
    setShortBreak: setShortBreak,
    setLongBreak: setLongBreak,
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
