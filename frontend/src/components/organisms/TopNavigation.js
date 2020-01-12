// External imports
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import M from 'materialize-css';
// Internal imports
import { Link, NavLink } from '../atoms/Link';
import { useAuth } from '../../utils/useAuth';
import { useTimer } from '../providers/TimerProvider';
import timerIcon from '../../assets/icon/timer_white_192x192.png';
import { formatTime } from '../../utils/pomodoroUtils';
import { DynamicTitle } from '../molecules/DynamicTitle';
import { DynamicFavicon } from '../molecules/DynamicFavicon';
import { MobileMenuSidebar } from './MobileMenuSidebar';
import { PlayControl, StopControl } from '../molecules';
// Assets

export function TopNavigationBase(props) {
  const { user, signout, token } = useAuth();
  const { timer, timerAction } = useTimer();
  function initBurgerMenu() {
    const sideNavElement = document.querySelectorAll('.mobile-top-menu');
    const options = { edge: 'right' };
    M.Sidenav.init(sideNavElement, options);
  }
  function initEmailTooltip() {
    const accountNameElement = document.querySelectorAll('.account-name');
    const options = { position: 'top' };
    M.Tooltip.init(accountNameElement, options);
  }

  useEffect(() => {
    //initialize hamburger menu
    initBurgerMenu();
    initEmailTooltip();
    timerAction.initTimer();
  }, []);

  //after logout - reset timer
  useEffect(() => {
    if (!token) {
      timerAction.setWork();
    }
  }, [token]);

  const TopNavigationLeftContent = (
    <>
      <a
        href="#"
        data-target="slide-out"
        className={classNames('sidenav-trigger left', {
          'hide-on-med-and-down': user == null,
        })}
      >
        <i className="material-icons">menu</i>
      </a>
      <div
        className={classNames('left valign-wrapper', {
          'hide-on-large-only': user != null,
        })}
      >
        <img
          className={classNames('logo-icon', {
            'margin-fix': user == null,
          })}
          src={timerIcon}
          alt="Team Pomodoro App"
          width="35"
        />

        <Link to="/timer" className="logo-text white-text">
          Pomodoro
        </Link>
        <ul className="hide-on-med-and-up">
          {' '}
          <li className="mini-controls">
            <div className="timer-panel">
              <div className="timer-countdown valign-wrapper">
                <span className="time">{formatTime(timer.remTime)}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <a href="#" data-target="mobile-top-menu" className="sidenav-trigger">
        <i className="material-icons">more_vert</i>
      </a>
      <ul className="hide-on-small-only">
        <li className="mini-controls">
          <div className="timer-panel">
            <div className="timer-countdown valign-wrapper">
              <span className="time">{formatTime(timer.remTime)}</span>
            </div>
            <div className="timer-buttons">
              {timer.isRunning ? <StopControl /> : <PlayControl />}
              <button
                className="btn-floating btn-small btn-flat waves-effect waves-light blue lighten-1"
                onClick={timerAction.restartTimer}
              >
                <i className="material-icons">history</i>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </>
  );

  const TopNavigationRightContent = (
    <>
      <ul className="right hide-on-med-and-down">
        <li>
          <NavLink to="/timer">
            <i className="material-icons left">watch_later</i>Timer
          </NavLink>
        </li>
        {user ? (
          <>
            <li className={'valign-wrapper'}>
              <NavLink to={'/public/' + user._id}>
                <i className="material-icons left">share</i>
                {/* <p className="user-name truncate">Public page</p> */}
                Share
              </NavLink>
            </li>
            <li className={'valign-wrapper'}>
              <NavLink
                to="/settings"
                className={'white-text btn-flat account-name'}
                data-position="bottom"
                data-tooltip={user.email}
              >
                <img
                  src={user.avatar}
                  alt=""
                  className="circle responsive-img"
                  width="40"
                />
                {user && user.username}
              </NavLink>
            </li>
            <li>
              <a
                className={'blue-grey'}
                icon={'exit_to_app'}
                onClick={e => {
                  e.preventDefault();
                  // Turn off timer before logout
                  timerAction.pauseTimer();
                  timerAction.setTimerID('');
                  signout();
                  props.history.push('/');
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
    </>
  );

  return (
    <>
      <nav className={'top-menu'}>
        <DynamicTitle />
        <DynamicFavicon />
        <div className="nav-wrapper">
          {TopNavigationLeftContent}
          {TopNavigationRightContent}
        </div>
      </nav>
      <MobileMenuSidebar />
    </>
  );
}

export const TopNavigation = withRouter(TopNavigationBase);
