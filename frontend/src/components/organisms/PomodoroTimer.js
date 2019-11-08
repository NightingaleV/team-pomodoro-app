// External imports
import React, { useEffect, useRef, useState, useMemo } from 'react';
// Internal imports
import { TimerControls, ProgressRing } from '../molecules';
import { convertMinToSec, formatTime } from '../../utils/pomodoroUtils';

export function PomodoroTimer(props) {
  // Reference for interval
  let timerRef = useRef();
  // Props
  const {
    currentSettings,
    pomodoroCycles,
    initNextTimerInRow,
    reinitiateCurrentTimer,
    dropdownControlHandlers,
  } = props;

  // Component State
  //----------------------------------------------------------------------------
  const [timerState, setTimerState] = useState({
    remTime: convertMinToSec(25),
    isRunning: false,
    settings: { type: 1, name: 'Work', totTime: convertMinToSec(25) },
    progressBar: 100,
  });

  const timerContext = useMemo(() => ({ timerState, setTimerState }), [
    timerState,
    setTimerState,
  ]);

  let [timer, setTimer] = useState(null);

  // Component Lifecycle
  //----------------------------------------------------------------------------
  useEffect(() => {
    // initNextTimerInRow();
    if (!timerState.isRunning) {
      console.log(pomodoroCycles);
      initNextTimerInRow();
    }
  }, []);

  useEffect(() => {
    if (currentSettings) {
      setTimerSettings(currentSettings);
      setRemTime(currentSettings.totTime);
    }
  }, [currentSettings]);

  useEffect(() => {
    updateProgressBar();
    console.log(timerState.progressBar);
    console.log(timerState.isRunning);
  }, [timerState.remTime]);

  useEffect(() => {}, [timerState]);

  // Tick - Run every second
  function tick() {
    subtractSeconds();
    console.log(timerState);
    //todo: Save data to DB
  }

  // State Updating Function
  //----------------------------------------------------------------------------
  function subtractSeconds() {
    setTimerState(prevState => {
      return {
        ...prevState,
        remTime: prevState.remTime - 1,
      };
    });
  }

  // Calculate Progress for Circle
  function updateProgressBar() {
    //Round to 2 digits
    let progressBar =
      Math.round((timerState.remTime / timerState.settings.totTime) * 10000) /
      100;

    setTimerState(prevState => {
      return {
        ...prevState,
        progressBar: progressBar,
      };
    });
  }
  // wrap for timer state
  function updateTimer(value) {
    timerRef.current = value;
    setTimer(timerRef.current);
  }

  function setTimerRunning(isRunning = false) {
    setTimerState(prevState => {
      return {
        ...prevState,
        isRunning: isRunning,
      };
    });
  }

  function setTimerSettings(newSettings) {
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
  // TIMER CONTROLS
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
    if (timer) {
      updateTimer(clearInterval(timer));
      setTimerRunning(false);
    }
  }

  function nextTimer() {
    pauseTimer();
    initNextTimerInRow();
  }

  function restartTimer() {
    pauseTimer();
    reinitiateCurrentTimer();
  }

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <div>
          <h3>
            <span>You are doing </span>
            {(currentSettings && currentSettings.name) || 'Nothing'}
          </h3>
        </div>
        <div className="circle-container">
          <ProgressRing
            // Height & Width
            radius={150}
            // Thickness
            stroke={10}
            progress={timerState.progressBar}
            typeOfTimer={timerState.settings && timerState.settings.type}
          />
          <div className="circle-countdown" style={{ fontSize: '65px' }}>
            <span>{formatTime(timerState.remTime)}</span>
          </div>
          <div className="circle-controls flexbox">
            <TimerControls
              isRunning={timerState.isRunning}
              typeOfTimer={timerState.settings.type}
              controlHandlers={{
                startTimer: startTimer,
                pauseTimer: pauseTimer,
                nextTimer: nextTimer,
                restartTimer: restartTimer,
              }}
              dropdownControlHandlers={dropdownControlHandlers}
            />
          </div>
        </div>
      </div>
    </>
  );
}
