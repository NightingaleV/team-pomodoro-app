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
    <>
      <aside
        id="slide-out"
        className={
          'sidenav sidenav-fixed main-menu'
          // For fixed sidebar add 'sidenav-fixed'
        }
      >
        <ul>
          <li>
            <a className="subheader">Groups</a>
          </li>
          <li>
            <Link
              to="/MainGroup"
              className={classNames('sidenav-close')}
            >
              <i className="material-icons ">navigate_next</i> MainGroup
            </Link>
            <Link
              to="/MainGroup"
              className={classNames('sidenav-close')}
            >
              <i className="material-icons">navigate_next</i> Group 2
            </Link>
          </li>
          <li>
            <div className="divider"></div>
          </li>
          <li>
            <a className="subheader">Subheader</a>
          </li>
          <li>
            <a href="#!">
              <i className="material-icons">cloud</i>First Link With Icon
            </a>
          </li>
          <li>
            <a href="#!">
              <i className="material-icons">group</i> Groups
            </a>
          </li>
          <div className="divider"></div>
          <li>
            <a className="subheader">Subheader</a>
          </li>
          <li>
            <a className="waves-effect" href="#!">
              Third Link With Waves
            </a>
          </li>
        </ul>
      </aside>
      {/*<a href="#" data-target="slide-out" className="sidenav-trigger hide-on-large-only">*/}
      {/*  <i className="material-icons">more_vert</i>*/}
      {/*</a>*/}
    </>
  );
}

export const SideNavigation = withRouter(SideNavigationBase);
