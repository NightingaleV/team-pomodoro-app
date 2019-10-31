// External imports
import React, { Fragment, useEffect } from 'react';
// Internal imports
import { Button } from '../atoms';
import { useAuth } from '../../utils/useAuth';
import { TopNavigation } from '../organisms';
import { SignUpSuccess } from '../../templates';
import M from 'materialize-css';

export function DropdownTimerMenu(props) {
  const { user } = useAuth();
  function initDropdownMenu() {
    const dropdownMenuElement = document.querySelectorAll('.dropdown-trigger');
    const options = { constrainWidth: false };
    M.Dropdown.init(dropdownMenuElement, options);
    // dropdown.open();
  }

  useEffect(() => {
    initDropdownMenu();
  }, []);

  return (
    <Fragment>
      <Button
        shape={'bigBtn'}
        actionButton={'dropdown'}
        className={'dropdown-trigger btn teal'}
        data-target="dropdown1"
      ></Button>
      <ul
        id="dropdown1"
        className="dropdown-content"
        style={{ minWidth: '165px' }}
      >
        <li>
          <a onClick={props.controlMethods.setWork}>Work</a>
        </li>
        <li>
          <a onClick={props.controlMethods.setShortBreak}>Take a break</a>
        </li>
        <li>
          <a onClick={props.controlMethods.setLongBreak}>Take a long break</a>
        </li>
      </ul>
    </Fragment>
  );
}

export function TimerControls(props) {
  let CTA = 'Call to Action';
  const { isRunning, type, children } = props;
  if (type === 1) CTA = '';
  if (type === 2) CTA = '';
  if (type === 3) CTA = '';

  const {
    startTimer,
    pauseTimer,
    nextTimer,
    restartTimer,
  } = props.controlHandlers;

  if (!isRunning) {
    return (
      <Fragment>
        <Button shape={'bigBtn'} actionButton={'play'} onClick={startTimer}>
          {CTA} {children}
        </Button>
        <DropdownTimerMenu controlMethods={props.dropdownControlHandlers} />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Button shape={'bigBtn'} actionButton={'stop'} onClick={nextTimer}>
          {children}
        </Button>
        <Button shape={'bigBtn'} actionButton={'pause'} onClick={pauseTimer}>
          {children}
        </Button>
        <Button
          shape={'bigBtn'}
          actionButton={'restart'}
          onClick={restartTimer}
        >
          {children}
        </Button>
      </Fragment>
    );
  }
}
