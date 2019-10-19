// External imports
import React, { Fragment, useEffect, useState, useRef } from "react";
// Internal imports
import { Button } from "../atoms";

export function PomodoroTimer() {
  // default settings
  const defaultSeconds = 3;
  // Reference for interval
  let timerRef = useRef();
  // Inner State of Timer
  const [timerProperties, setTimerProperties] = useState({ running: false });

  // States
  let [timer, setTimer] = useState(null);
  const [numSeconds, setNumSeconds] = useState(defaultSeconds);

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

  // Control Functions
  function startTimer() {
    updateTimer(
      setInterval(() => {
        tick();
      }, 1000)
    );
    setTimerProperties({ running: true });
  }

  function pauseTimer() {
    if (timer) {
      updateTimer(clearInterval(timer));
      setTimerProperties({ running: false });
    }
  }

  function resetTimer(props) {
    pauseTimer();
    setNumSeconds(props.timeLength ? props.timeLength : defaultSeconds);
  }

  function restartTimer(props) {
    resetTimer(props);
    startTimer();
  }

  useEffect(() => {
    console.log(numSeconds);
  }, [numSeconds]);

  function format(seconds) {
    let formMinutes = Math.floor((seconds % 3600) / 60);
    let formSeconds = Math.floor((seconds % 3600) % 60);
    if (seconds >= 0) {
      //Normal Timer
      let timeFormated =
        (formMinutes < 10 ? "0" : "") +
        formMinutes +
        ":" +
        (formSeconds < 10 ? "0" : "") +
        formSeconds;
      return timeFormated;
    } else {
      //Timer below 0
      let absSec = Math.abs(formSeconds);
      let absMin = Math.abs(formMinutes);
      let timeFormated =
        "-" +
        (absMin < 10 ? "0" : "") +
        (absMin - 1) +
        ":" +
        (absSec < 10 ? "0" : "") +
        absSec;
      return timeFormated;
    }
  }
  return (
    <Fragment>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "100px" }}>
          <span>{format(numSeconds)}</span>
        </div>
        {timerProperties.running ? (
          <Button shape={"bigBtn"} actionButton={"stop"} onClick={resetTimer}>
            Finish
          </Button>
        ) : (
          <Button shape={"bigBtn"} actionButton={"play"} onClick={startTimer}>
            Begin Work
          </Button>
        )}

        {/*<ActionButton type={"pause"} onClick={pauseTimer} />*/}
        {/*<ActionButton type={"stop"} onClick={resetTimer} />*/}
        {/*<ActionButton value={5} type={"restart"} onClick={restartTimer} />*/}
      </div>
    </Fragment>
  );
}
