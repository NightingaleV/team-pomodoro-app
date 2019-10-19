// External imports
import React, { Fragment, useEffect, useRef, useState } from 'react';
// Internal imports
import { Button } from '../atoms';

export function PomodoroTimer(...props) {
  // default settings
  const pomodoroSetting = {
    pomodoro: { type: 1, name: 'Pomodoro', length: convertMinToSec(25) },
    shortBreak: { type: 2, name: 'Short Break', length: convertMinToSec(5) },
    longBreak: { type: 3, name: 'Long Break', length: convertMinToSec(15) },
  };
  // Reference for interval
  let timerRef = useRef();
  // Inner State of Timer
  const [timerProperties, setTimerProperties] = useState({
    running: false,
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
    setTimerProperties(prevState => {
      return { ...prevState, running: true };
    });
  }

  function pauseTimer() {
    if (timer) {
      updateTimer(clearInterval(timer));
      setTimerProperties(prevState => {
        return { ...prevState, running: true };
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
    let iterationItem = selectIteration();
    // Set Timer to Timer
    setNumSeconds(iterationItem.length);
    // Add Iteration Item
    setIterations(prevIterations => {
      return [...prevIterations, iterationItem];
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
        <div style={{ fontSize: '100px' }}>
          <span>{format(numSeconds)}</span>
        </div>
        <h3>
          <span>You are doing </span>
          {(iterations.length > 0 && iterations[iterations.length - 1].name) ||
            'Nothing'}
        </h3>
        <Button shape={'bigBtn'} actionButton={'play'} onClick={startTimer}>
          Begin Work
        </Button>
        <Button shape={'bigBtn'} actionButton={'pause'} onClick={pauseTimer}>
          Pause
        </Button>
        <Button shape={'bigBtn'} actionButton={'stop'} onClick={resetTimer}>
          Finish
        </Button>

        <Button
          shape={'bigBtn'}
          actionButton={'restart'}
          onClick={restartTimer}
        >
          Restart
        </Button>
      </div>
    </Fragment>
  );
}
