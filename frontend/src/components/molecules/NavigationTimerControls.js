import React from 'react';
import { useTimer } from '../providers/TimerProvider';

export function PlayControl(props) {
  const { timerAction } = useTimer();

  return (
    <>
      <button
        className="btn-floating btn-small btn-flat waves-effect waves-light amber"
        onClick={timerAction.startTimer}
      >
        <i className="material-icons">play_arrow</i>
      </button>
    </>
  );
}

export function StopControl(props) {
  const { timerAction } = useTimer();

  return (
    <>
      <button
        className="btn-floating btn-small btn-flat waves-effect waves-light amber"
        onClick={timerAction.nextTimer}
      >
        <i className="material-icons">stop</i>
      </button>
      <button
        className="btn-floating btn-small btn-flat waves-effect waves-light blue lighten-1"
        onClick={timerAction.pauseTimer}
      >
        <i className="material-icons">pause</i>
      </button>
    </>
  );
}
