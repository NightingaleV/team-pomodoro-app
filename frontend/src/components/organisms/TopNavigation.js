// External imports
import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import M from 'materialize-css';
// Internal imports
import { Link } from '../atoms/Link';
// Assets

export function TopNavigationBase() {
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
    <Fragment>
      <nav className={'mobile-top-menu'}>
        <div className="nav-wrapper">
          <Link to="/" className={classNames('brand-logo', 'center')}>
            TeamPomodori
          </Link>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link to="/login">Log In</Link>
            </li>
            <li>
              <Link to="/register">Sign Up</Link>
            </li>
            <li>
              <Link to="/timer">Timer</Link>
            </li>
            <li>
              <Link to="/MainGroup">MainGroup</Link>
            </li>
          </ul>
        </div>
      </nav>
      <ul className="sidenav mobile-menu" id="mobile-demo">
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
          <Link to="/MainGroup" className={classNames('sidenav-close')}>
            MainGroup
          </Link>
        </li>
      </ul>
    </Fragment>
  );
}

export const TopNavigation = withRouter(TopNavigationBase);
