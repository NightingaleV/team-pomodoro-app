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

  const mobileLeftSidebar = (
    <ul className="sidenav mobile-top-menu" id={'mobile-top-menu'}>
      <li></li>
      <li>
        <NavLink to="/timer" className={classNames('sidenav-close')}>
          <i className="material-icons left">watch_later</i>Timer
        </NavLink>
      </li>
      {user ? (
        <>
          <li>
            <a className="truncate">
              <i className="material-icons left">account_circle</i>{' '}
              {user && user.email}
            </a>
          </li>
          <li>
            <a
              className={'sidenav-close'}
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
            <NavLink to="/login" className={'sidenav-close'}>
              <i className="material-icons left">exit_to_app</i>
              Log In
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className={'waves-effect waves-light btn amber sidenav-close'}
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
      <nav className={'top-menu'}>
        <div className="nav-wrapper">
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
                <span className="timer-countdown">22:15</span>
              </li>
            </ul>
          </div>
          <a href="#" data-target="mobile-top-menu" className="sidenav-trigger">
            <i className="material-icons">more_vert</i>
          </a>
          <ul className="hide-on-small-only">
            <li class="mini-controls">
              <span className="timer-countdown">22:15</span>
              <a class="btn-floating btn-small btn-flat waves-effect waves-light amber">
                <i className="material-icons">play_arrow</i>
              </a>
              <a class="btn-floating btn-small btn-flat waves-effect waves-light blue lighten-1">
                <i className="material-icons">pause</i>
              </a>
              <a class="btn-floating btn-small btn-flat waves-effect waves-light blue lighten-1">
                <i className="material-icons">stop</i>
              </a>
              <a class="btn-floating btn-small btn-flat waves-effect waves-light blue lighten-1">
                <i className="material-icons">loop</i>
              </a>
            </li>
          </ul>
          <ul className="right hide-on-med-and-down">
            <li>
              <NavLink to="/timer">
                <i className="material-icons left">watch_later</i>Timer
              </NavLink>
            </li>
            {user ? (
              <>
                <li className={'valign-wrapper'}>
                  <a className="white-text btn-flat account-name">
                    <i className="material-icons left">account_circle</i>{' '}
                    {user && user.email}
                  </a>
                </li>
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
                    <i className={classNames('material-icons left')}>
                      exit_to_app
                    </i>
                    Log Out
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login">
                    Log In
                    <i className={classNames('material-icons left')}>
                      exit_to_app
                    </i>
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
      </nav>
      {mobileLeftSidebar}
    </>
  );
}

export const TopNavigation = withRouter(TopNavigationBase);
