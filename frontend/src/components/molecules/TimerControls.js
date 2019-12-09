// External imports
import React, { Fragment, useEffect } from 'react';
import M from 'materialize-css';
// Internal imports
import { Button } from '../atoms';
import { useAuth } from '../../utils/useAuth';
import { TopNavigation } from '../organisms';
import { SignUpSuccess } from '../../templates';
import { useTimer } from '../providers/TimerProvider';

export function DropdownTimerMenu(props) {
  const { timerAction } = useTimer();
  const { user } = useAuth();
  function initDropdownMenu() {
    const dropdownMenuElement = document.querySelectorAll('.dropdown-trigger');
    const options = { constrainWidth: false };
    M.Dropdown.init(dropdownMenuElement, options);
  }

  useEffect(() => {
    initDropdownMenu();
  }, []);

  return (
    <>
      <Button
        shape={'bigCircular'}
        actionButton={'dropdown'}
        className={'dropdown-trigger'}
        data-target="dropdown1"
      />
      <ul
        id="dropdown1"
        className="dropdown-content"
        style={{ minWidth: '165px' }}
      >
        <li>
          <a onClick={timerAction.setWork}>
            <i className="material-icons">business_center</i>
            Work
          </a>
        </li>
        <li>
          <a onClick={timerAction.setShortBreak}>
            <i className="material-icons">free_breakfast</i>Take a break
          </a>
        </li>
        <li>
          <a onClick={timerAction.setLongBreak}>
            <i className="material-icons">weekend</i>Take a long break
          </a>
        </li>
      </ul>
    </>
  );
}

export function TimerControls(props) {
  const { timer, timerAction } = useTimer();
  let CTA = '';
  const { children } = props;

  if (!timer.isRunning) {
    return (
      <>
        <Button
          shape={'bigCircular'}
          actionButton={'play'}
          onClick={timerAction.startTimer}
          id="pulse"
        >
          {CTA} {children}
        </Button>
        <DropdownTimerMenu />
      </>
    );
  } else {
    return (
      <>
        <Button
          shape={'bigCircular'}
          color={'amber'}
          actionButton={'stop'}
          onClick={timerAction.nextTimer}
        >
          {children}
        </Button>
        <Button
          shape={'bigCircular'}
          actionButton={'pause'}
          onClick={timerAction.pauseTimer}
        >
          {children}
        </Button>
        <Button
          shape={'bigCircular'}
          actionButton={'restart'}
          onClick={timerAction.restartTimer}
        >
          {children}
        </Button>
      </>
    );
  }
}
