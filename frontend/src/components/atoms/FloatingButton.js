// External imports
import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import M from 'materialize-css';
import { useTimer } from '../providers/TimerProvider';

export function FloatingButtonBase(props) {
  const { timer, timerAction } = useTimer();

  function initFloatingButton() {
    const elems = document.querySelectorAll('.fixed-action-btn');
    const options = { toolbarEnabled: true };
    M.FloatingActionButton.init(elems, options, true);
  }

  useEffect(() => {
    initFloatingButton();
  }, []);

  const playControls = (
    <>
      <li className="waves-effect waves-light">
        <a onClick={timerAction.startTimer}>
          <i className="material-icons">play_arrow</i>
        </a>
      </li>
    </>
  );
  const stopControls = (
    <Fragment>
      <li className="waves-effect waves-light">
        <a onClick={timerAction.pauseTimer}>
          <i className="material-icons">pause</i>
        </a>
      </li>
      <li className="waves-effect waves-light">
        <a onClick={timerAction.nextTimer}>
          <i className="material-icons">stop</i>
        </a>
      </li>
    </Fragment>
  );

  return (
    <>
      <div className="fixed-action-btn toolbar direction-top hide-on-med-and-up fixed">
        <a className="btn-floating btn-large blue lighten-1">
          <i className="large material-icons">watch_later</i>
        </a>
        <ul>
          {timer.isRunning ? stopControls : playControls}

          <li className="waves-effect waves-light">
            <a onClick={timerAction.restartTimer}>
              <i className="material-icons">history</i>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export const FloatingButton = withRouter(FloatingButtonBase);
