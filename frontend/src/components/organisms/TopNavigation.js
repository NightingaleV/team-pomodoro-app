// External imports
import React, { useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import classNames from 'classnames';
import M from 'materialize-css';
// Internal imports
import { GroupDetail } from '../../views/GroupDetail';
import { Link, NavLink } from '../atoms/Link';
import { useAuth } from '../../utils/useAuth';
import { useApi } from '../../utils/useApi';
import { useTimer } from '../providers/TimerProvider';
import { Button } from '../atoms';
import timerIcon from '../../assets/icon/timer_white_192x192.png';
import { formatTime } from '../../utils/pomodoroUtils';
import { DynamicTitle } from '../molecules/DynamicTitle';
import { DynamicFavicon } from '../molecules/DynamicFavicon';
// Assets

export function TopNavigationBase(props) {
  const { user, signout } = useAuth();
  const { timer, timerAction } = useTimer();
  function initBurgerMenu() {
    const sideNavElement = document.querySelectorAll('.mobile-top-menu');
    const options = { edge: 'right' };
    M.Sidenav.init(sideNavElement, options);
  }
  useEffect(() => {
    //initialize hamburger menu
    initBurgerMenu();
    timerAction.initTimer();
  }, []);

  useEffect(() => {
    // TIMER SUBSCRIPTION
    // let subscriptionToTimer;
    // if (!timer.isRunning) {
    //   subscriptionToTimer = setInterval(() => timerAction.initTimer(), 5000);
    // }
    // return () => {
    //   console.log('CleanUp: subscriptionToTimer');
    //   clearInterval(subscriptionToTimer);
    // };
  }, [timer.isRunning]);

  //----------------------------------------------------------------------------
  // Dynamic Title
  //----------------------------------------------------------------------------

  const topNavigationLeftSide = (
    <>
      <a
        href="#"
        data-target="slide-out"
        className="sidenav-trigger left show-on-medium-and-down"
      >
        <i className="material-icons">menu</i>
      </a>
      <div
        className={classNames('left valign-wrapper logo ', {
          'hide-on-large-only': user != null,
        })}
      >
        <img
          className={classNames('logo-icon')}
          src={timerIcon}
          alt="Team Pomodoro App"
          width="35"
        />
        <Link to="/timer" className="logo-text white-text">
          Pomodoro
        </Link>
      </div>
      <a href="#" data-target="mobile-top-menu" className="sidenav-trigger">
        <i className="material-icons">more_vert</i>
      </a>
    </>
  );

  const timerControls = (
    <>
      <li>
        <Button
          color={'amber'}
          actionButton={'play'}
          onClick={timerAction.startTimer}
          className={'btn-small'}
        ></Button>
        <Button
          color={'blue accent-1'}
          actionButton={'pause'}
          onClick={timerAction.pauseTimer}
          className={'btn-small'}
        ></Button>
        <Button
          color={'blue accent-1'}
          actionButton={'stop'}
          onClick={timerAction.nextTimer}
          className={'btn-small'}
        ></Button>
      </li>
      <li>
        <NavLink to="/timer" className={' blue lighten-1 mx-4'}>
          {formatTime(timer.remTime)}
        </NavLink>
      </li>
    </>
  );

  const navigationBar = (
    <div className="nav-wrapper">
      {topNavigationLeftSide}
      <ul className="right hide-on-med-and-down">
        {timerControls}
        {user ? (
          <>
            {/*<li>*/}
            {/*  <a className="white-text btn-flat">*/}
            {/*    <i className="material-icons left">account_circle</i>{' '}*/}
            {/*    {user && user.email}*/}
            {/*  </a>*/}
            {/*</li>*/}
            <li>
              <a
                className={'blue-grey'}
                icon={'exit_to_app'}
                onClick={e => {
                  signout();
                  props.history.push('/');
                  e.preventDefault();
                  console.log('click');
                }}
              >
                <i className={classNames('material-icons left')}>exit_to_app</i>
                Log Out
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">
                Log In
                <i className={classNames('material-icons left')}>exit_to_app</i>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={'waves-effect waves-light btn amber'}
              >
                Sign Up
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );

  const mobileRightSidebar = (
    <ul className="sidenav mobile-top-menu" id={'mobile-top-menu'}>
      <li>
        <Link to="/timer" className={classNames('sidenav-close')}>
          <i className="material-icons left">watch_later</i>Timer
        </Link>
      </li>
      {user ? (
        <>
          <li>
            <a className="">
              <i className="material-icons left">account_circle</i>{' '}
              {user && user.email}
            </a>
          </li>
          <li>
            <a
              className={''}
              icon={'exit_to_app'}
              onClick={e => {
                signout();
                props.history.push('/');
                e.preventDefault();
                console.log('click');
              }}
            >
              <i className={classNames('material-icons left')}>exit_to_app</i>
              Sign Out
            </a>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/login">Log In</NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className={'waves-effect waves-light btn amber'}
            >
              Sign Up
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );

  return (
    <>
      <DynamicTitle />
      <DynamicFavicon />
      <nav className={'top-menu'}>{navigationBar}</nav>
      {mobileRightSidebar}
    </>
  );
}

export const TopNavigation = withRouter(TopNavigationBase);
