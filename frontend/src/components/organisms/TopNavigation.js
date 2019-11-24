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
import { Button } from '../atoms';
import timerIcon from '../../assets/icon/timer_white_192x192.png';
// Assets

export function TopNavigationBase(props) {
  const { user, signout } = useAuth();
  function initBurgerMenu() {
    const sideNavElement = document.querySelectorAll('.mobile-top-menu');
    const options = { edge: 'right' };
    M.Sidenav.init(sideNavElement, options);
  }
  useEffect(() => {
    //initialize hamburger menu
    initBurgerMenu();
  }, []);

  return (
    <>
      <nav className={'top-menu'}>
        <div className="nav-wrapper">
          <a
            href="#"
            data-target="slide-out"
            className="sidenav-trigger left show-on-medium-and-down"
          >
            <i className="material-icons">menu</i>
          </a>

          <div className={'left valign-wrapper logo hide-on-large-only'}>
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
          <ul className="right hide-on-med-and-down">
            <li>
              <NavLink to="/timer">
                <i className="material-icons left">watch_later</i>Timer
              </NavLink>
            </li>
            {user ? (
              <>
                <li>
                  <a className="white-text btn-flat">
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
                  <NavLink to="/login">Log In<i className={classNames('material-icons left')}>
                    exit_to_app
                  </i></NavLink>
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
      <ul className="sidenav mobile-top-menu" id={'mobile-top-menu'}>
        <li>
          <Link to="/login" className={classNames('sidenav-close')}>
            Log In
          </Link>
        </li>
        <li>
          <Link to="/register" className={classNames('sidenav-close')}>
            Sign Up
          </Link>
        </li>
        <li>
          <Link to="/timer" className={classNames('sidenav-close')}>
            Timer
          </Link>
        </li>
        <li>
          {/*<Link to="/group" className={classNames('sidenav-close')}>*/}
          {/*  Group*/}
          <Link
            to="/group/5dc8f9b99c6fd62304063fbb"
            className={classNames('sidenav-close')}
          >
            Test Group
          </Link>
        </li>
      </ul>
    </>
  );
}

export const TopNavigation = withRouter(TopNavigationBase);
