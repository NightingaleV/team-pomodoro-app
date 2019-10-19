// External imports
import React, { Fragment, useEffect, useRef, useState } from 'react';
// Internal imports
import { TimerControls } from '../molecules';

export function PomodoroTimer(props) {
  // default settings
  const pomodoroSetting = {
    pomodoro: { id: 1, name: 'Work', length: convertMinToSec(25) },
    shortBreak: { id: 2, name: 'Short Break', length: convertMinToSec(5) },
    longBreak: { id: 3, name: 'Long Break', length: convertMinToSec(15) },
  };
  // Reference for interval
  let timerRef = useRef();
  // Inner State of Timer
  const [timerState, setTimerState] = useState({
    isRunning: false,
    type: 1,
  });

  // States
  let [timer, setTimer] = useState(null);
  const [numSeconds, setNumSeconds] = useState(null);

  // Tick - Run every second
  function tick() {
    subtractSeconds();
  }
  function subtractSeconds() {
    setNumSeconds(prevSeconds => {
      return prevSeconds - 1;
    });
  }
  // wrap for timer state
  function updateTimer(value) {
    timerRef.current = value;
    setTimer(timerRef.current);
  }

  // TIMER CONTROLS
  //----------------------------------------------------------------------------
  function startTimer() {
    updateTimer(
      setInterval(() => {
        tick();
      }, 1000),
    );
    setTimerState(prevState => {
      return { ...prevState, isRunning: true };
    });
  }

  function pauseTimer() {
    if (timer) {
      updateTimer(clearInterval(timer));
      setTimerState(prevState => {
        return { ...prevState, isRunning: false };
      });
    }
  }

  function resetTimer(props) {
    pauseTimer();
    setNewIteration();
    //setNumSeconds(pomodoroSetting.defaultPomodoro);
  }

  function restartTimer(props) {
    resetTimer(props);
    startTimer();
  }

  // ITERATIONS
  //----------------------------------------------------------------------------
  let [iterations, setIterations] = useState([]);

  function selectIteration() {
    // Short Break
    let newIterationIndex = iterations.length + 1;
    if (newIterationIndex % 8 === 0) {
      return pomodoroSetting.longBreak;
    }

    // Long Break
    else if (newIterationIndex % 2 === 0) {
      return pomodoroSetting.shortBreak;
    }
    // Pomodoro
    else {
      return pomodoroSetting.pomodoro;
    }
  }

  function setNewIteration() {
    let iterationSetting = selectIteration();
    // Set Timer Seconds
    setNumSeconds(iterationSetting.length);
    let newIterationItem = {
      type: iterationSetting.id,
      name: iterationSetting.name,
      totTime: iterationSetting.length,
    };
    // Add Iteration Item
    setIterations(prevIterations => {
      return [...prevIterations, newIterationItem];
    });
  }

  useEffect(() => {
    console.log(iterations);
  }, [iterations]);

  useEffect(() => {
    if (!timer) {
      setNewIteration();
    }
  }, []);
  // UTILS
  //----------------------------------------------------------------------------
  function convertMinToSec(numOfMinutes) {
    return numOfMinutes * 60;
  }

  function format(seconds) {
    let formMinutes = Math.floor((seconds % 3600) / 60);
    let formSeconds = Math.floor((seconds % 3600) % 60);
    if (seconds >= 0) {
      //Normal Timer
      let timeFormated =
        (formMinutes < 10 ? '0' : '') +
        formMinutes +
        ':' +
        (formSeconds < 10 ? '0' : '') +
        formSeconds;
      return timeFormated;
    } else {
      //Timer below 0
      let absSec = Math.abs(formSeconds);
      let absMin = Math.abs(formMinutes);
      let timeFormated =
        '-' +
        (absMin < 10 ? '0' : '') +
        (absMin - 1) +
        ':' +
        (absSec < 10 ? '0' : '') +
        absSec;
      return timeFormated;
    }
  }
  return (
    <Fragment>
      <div style={{ textAlign: 'center' }}>
        <div>
          <h3>
            <span>You are doing </span>
            {(iterations.length > 0 &&
              iterations[iterations.length - 1].name) ||
              'Nothing'}
          </h3>
        </div>
        <div style={{ fontSize: '100px' }}>
          <span>{format(numSeconds)}</span>
        </div>

        <TimerControls
          isRunning={timerState.isRunning}
          type={iterations.length > 0 && iterations[iterations.length - 1].type}
          handleClick={timerState.isRunning ? resetTimer : startTimer}
        ></TimerControls>
      </div>
    </Fragment>
  );
}
