// External imports
import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
// Internal imports
import { NavLink } from '../atoms/Link';
import { useAuth } from '../../utils/useAuth';
import { useTimer } from '../providers/TimerProvider';

export function MobileMenuSidebarBase(props) {
  const { user, signout } = useAuth();
  const { timer, timerAction } = useTimer();

  return (
    <ul className="sidenav mobile-top-menu" id={'mobile-top-menu'}>
      <li>
        <NavLink to="/timer" className={classNames('sidenav-close')}>
          <i className="material-icons left">watch_later</i>Timer
        </NavLink>
      </li>
      {user ? (
        <>
          <li>
            <NavLink to="/settings" className={('truncate', 'sidenav-close')}>
              <i className="material-icons left">account_circle</i>{' '}
              {user && user.username}
            </NavLink>
          </li>
          <li>
            <a
              className={'sidenav-close'}
              icon={'exit_to_app'}
              onClick={e => {
                signout();
                props.history.push('/');
                e.preventDefault();
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
}

export const MobileMenuSidebar = withRouter(MobileMenuSidebarBase);
