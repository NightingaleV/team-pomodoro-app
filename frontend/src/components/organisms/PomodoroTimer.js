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

  function nextTimer() {
    pauseTimer();
    let iterationSetting = pickIteration();
    setNewIteration(iterationSetting);
    //setNumSeconds(pomodoroSetting.defaultPomodoro);
  }

  function restartTimer() {
    pauseTimer();
    restartCurrentIteration();
  }

  // ITERATIONS
  //----------------------------------------------------------------------------
  let [iterations, setIterations] = useState([]);

  function pickIteration(typeId = 0) {
    if (typeId) {
      switch (typeId) {
        case 1:
          return pomodoroSetting.pomodoro;
          break;
        case 2:
          return pomodoroSetting.shortBreak;
          break;
        case 3:
          return pomodoroSetting.longBreak;
          break;
      }
    } else {
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
  }

  function setNewIteration(iterationSetting) {
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

  function removeLastIteration() {
    setIterations(prevIterations => {
      const removedElement = prevIterations.pop();
      return prevIterations;
    });
  }
  function cleanIterations() {
    setIterations([]);
  }

  function setWork() {
    cleanIterations();
    // Pick Settings
    const iterationSetting = pomodoroSetting.pomodoro;
    // Recreate it
    setNewIteration(iterationSetting);
  }
  function setShortBreak() {
    cleanIterations();
    // Pick Settings
    setIterations(prevIterations => {
      return [...prevIterations, null];
    });
    const iterationSetting = pomodoroSetting.shortBreak;
    // Recreate it
    setNewIteration(iterationSetting);
  }
  function setLongBreak() {
    cleanIterations();
    // Pick Settings
    setIterations(prevIterations => {
      return [...prevIterations, null, null, null, null, null, null, null];
    });
    const iterationSetting = pomodoroSetting.longBreak;
    // Recreate it
    setNewIteration(iterationSetting);
  }

  function restartCurrentIteration() {
    // Pick Last Timer object
    const lastIteration = iterations[iterations.length - 1];
    // Pick Same Settings
    const iterationSetting = pickIteration(lastIteration.type);
    // Drop the item
    removeLastIteration();
    // Recreate it
    setNewIteration(iterationSetting);
  }

  useEffect(() => {
    console.log(iterations);
  }, [iterations]);

  useEffect(() => {
    if (!timerState.isRunning) {
      let iterationSetting = pickIteration();
      setNewIteration(iterationSetting);
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
        <div className="circle-container">
          <svg
            width="300"
            viewBox="0 0 220 220"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform="translate(110,110)">
              <circle r="100" className="circle-base" />
              <g transform="rotate(-90)">
                <circle r="100" className="circle-progress" />
                <g id="e-pointer">
                  <circle cx="100" cy="0" r="8" className="circle-pointer" />
                </g>
              </g>
            </g>
          </svg>
          <div className="circle-countdown" style={{ fontSize: '65px' }}>
            <span>{format(numSeconds)}</span>
          </div>
          <div className="circle-constrols">
            <TimerControls
              isRunning={timerState.isRunning}
              type={
                iterations.length > 0 && iterations[iterations.length - 1].type
              }
              controlHandlers={{
                startTimer: startTimer,
                pauseTimer: pauseTimer,
                nextTimer: nextTimer,
                restartTimer: restartTimer,
              }}
              dropdownControlHandlers={{
                setWork: setWork,
                setShortBreak: setShortBreak,
                setLongBreak: setLongBreak,
              }}
              // pickWork={setWork}
              // pickSBreak={setShortBreak}
              // pickLBreak={setLongBreak}
            ></TimerControls>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
