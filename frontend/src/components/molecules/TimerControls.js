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
    <>
      <Button
        shape={'bigCircular'}
        actionButton={'dropdown'}
        className={'dropdown-trigger'}
        data-target="dropdown1"
      ></Button>
      <ul
        id="dropdown1"
        className="dropdown-content"
        style={{ minWidth: '165px' }}
      >
        <li>
          <a onClick={props.controlMethods.setWork}>
            <i className="material-icons">business_center</i>
            Work
          </a>
        </li>
        <li>
          <a onClick={props.controlMethods.setShortBreak}>
            <i className="material-icons">free_breakfast</i>Take a break
          </a>
        </li>
        <li>
          <a onClick={props.controlMethods.setLongBreak}>
            <i className="material-icons">weekend</i>Take a long break
          </a>
        </li>
      </ul>
    </>
  );
}

export function TimerControls(props) {
  let CTA = 'Call to Action';
  const { isRunning, typeOfTimer, children } = props;
  if (typeOfTimer === 1) CTA = '';
  if (typeOfTimer === 2) CTA = '';
  if (typeOfTimer === 3) CTA = '';

  const {
    startTimer,
    pauseTimer,
    nextTimer,
    restartTimer,
  } = props.controlHandlers;

  if (!isRunning) {
    return (
      <Fragment>
        <Button
          shape={'bigCircular'}
          actionButton={'play'}
          onClick={startTimer}
        >
          {CTA} {children}
        </Button>
        <DropdownTimerMenu controlMethods={props.dropdownControlHandlers} />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Button
          shape={'bigCircular'}
          color={'amber'}
          actionButton={'stop'}
          onClick={nextTimer}
        >
          {children}
        </Button>
        <Button
          shape={'bigCircular'}
          actionButton={'pause'}
          onClick={pauseTimer}
        >
          {children}
        </Button>
        <Button
          shape={'bigCircular'}
          actionButton={'restart'}
          onClick={restartTimer}
        >
          {children}
        </Button>
      </Fragment>
    );
  }
}
