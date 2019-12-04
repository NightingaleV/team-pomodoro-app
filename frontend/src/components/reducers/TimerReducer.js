import { convertMinToSec } from '../../utils/pomodoroUtils';

const initialState = {
  timer: {
    timerID: '',
    remTime: convertMinToSec(25),
    isRunning: false,
    settings: { type: 1, name: 'Work', totTime: convertMinToSec(25) },
    progressBar: 100,
    indexInCycle: 3,
  },
};

export function TimerReducer({ timer, setTimerState, timerReference }) {
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
    // initNextTimerInRow();
  }

  function restartTimer() {
    pauseTimer();
    // reinitiateCurrentTimer();
  }

  return {
    subtractSeconds: () => {
      subtractSeconds();
      console.log(timerReference);
    },
    startTimer: () => {
      startTimer();
    },
    pauseTimer: () => {
      pauseTimer();
    },
    nextTimer: () => {},
    restartTimer: () => {},
  };
}
