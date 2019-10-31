// External imports
import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import M from 'materialize-css';
// Internal imports
import { Link } from '../atoms/Link';
// Assets

export function SideNavigationBase() {
  function initSidebarMenu() {
    const sideNavElement = document.querySelector('.main-menu');
    const options = {};
    var elem = M.Sidenav.init(sideNavElement, options);
    var instance = M.Sidenav.getInstance(sideNavElement);
    // instance.open();
    console.log(instance.isOpen);
  }
  useEffect(() => {
    //initialize hamburger menu
    initSidebarMenu();
  }, []);

  return (
    <Fragment>
      <aside
        id="slide-out"
        className={
          'sidenav main-menu blue white-text sidenav-fixed'
          // For fixed sidebar add 'sidenav-fixed'
        }
      >
        <h5 className={'link white-text brand-logo center'}>SideBar</h5>
        <ul>
          <span
            className={'link white-text'}
            style={{ marginLeft: '30px', fontSize: '18pt' }}
          >
            Groups
          </span>
          <li>
            <Link
              to="/MainGroup"
              className={classNames('sidenav-close', 'white-text')}
            >
              <i className="material-icons white-text">navigate_next</i>{' '}
              MainGroup
            </Link>
            <Link
              to="/MainGroup"
              className={classNames('sidenav-close', 'white-text')}
            >
              <i className="material-icons white-text">navigate_next</i> Group 2
            </Link>
          </li>
          <li>
            <div className="divider white-text"></div>
          </li>
          <li>
            <a className="subheader white-text">Subheader</a>
          </li>
          <li>
            <a href="#!" className={'white-text'}>
              <i className="material-icons white-text">cloud</i>First Link With
              Icon
            </a>
          </li>
          <li>
            <a href="#!" className={'white-text'}>
              <i className="material-icons white-text">group</i> Groups
            </a>
          </li>
          <li>
            <a className="subheader white-text">Subheader</a>
          </li>
          <li>
            <a className="waves-effect white-text" href="#!">
              Third Link With Waves
            </a>
          </li>
        </ul>
      </aside>
      <a href="#" data-target="slide-out" className="sidenav-trigger">
        <i className="material-icons">menu</i>
      </a>
    </Fragment>
  );
}

export const SideNavigation = withRouter(SideNavigationBase);
