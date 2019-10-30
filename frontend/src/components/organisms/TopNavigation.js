// External imports
import React, { Fragment, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import classNames from 'classnames';
import M from 'materialize-css';
// Internal imports
import { Link, NavLink } from '../atoms/Link';
import { useAuth } from '../../utils/useAuth';
import { useApi } from '../../utils/useApi';
import { Button } from '../atoms';
// Assets

export function TopNavigationBase(props) {
  const { user, signout } = useAuth();
  function initBurgerMenu() {
    const sideNavElement = document.querySelectorAll('.sidenav');
    const options = {};
    M.Sidenav.init(sideNavElement, options);
  }
  useEffect(() => {
    //initialize hamburger menu
    initBurgerMenu();
  }, []);

  return (
    <Fragment>
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className={classNames('brand-logo', 'left')}>
            TeamPomodori
          </Link>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <NavLink to="/timer">Timer</NavLink>
            </li>
            <li>
              <NavLink to="/protected">Protected Route</NavLink>
            </li>
            {user ? (
              <Fragment>
                <li>
                  <a className="white-text btn-flat">
                    <i className="material-icons left">account_circle</i>{' '}
                    {user && user.email}
                  </a>
                </li>
                <li>
                  <a
                    className={'blue lighten-1'}
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
                    Sign Out
                  </a>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li>
                  <NavLink to="/login">Log In</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Sign Up</NavLink>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-demo">
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
      </ul>
    </Fragment>
  );
}

export const TopNavigation = withRouter(TopNavigationBase);
