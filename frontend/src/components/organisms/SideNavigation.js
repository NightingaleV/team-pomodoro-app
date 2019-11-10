// External imports
import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import M from 'materialize-css';
import axios from 'axios';

// Internal imports
import { Link } from '../atoms/Link';
import { useAuth } from '../../utils/useAuth';
import { GroupDetail } from '../../views/GroupDetail';
import { async } from 'rxjs/internal/scheduler/async';
// Assets

function setGroups(props) {
  try {
    const userGroups = props.userGroups[0].userGroups;
    /*console.log('props',userGroups)*/
    const result = userGroups.map(group => (
      <div key={group._id}>
        <li>

        <Link
          to={"/group/" + group.name}
          className={classNames('sidenav-close', 'blue-text')}
          
        >
        <i className="material-icons black-text"
        >group</i>{' '}
        {group.name}
        </Link>
      </li>
    </div>
    ));

    return result;
  } catch (err) {
    /* console.log(err)*/
  }
  return;
}

export function SideNavigationBase() {
  const { user } = useAuth();
  const [userGroups, setUserGroups] = useState({ name: [] });

  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            email: user && user.email,
          },
        };

        const res = await axios.get('../api/user/userGroups', config);
        /*console.log('Result:', res.data);*/
        setUserGroups(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserGroups();
  }, []);



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
          'sidenav sidenav-fixed main-menu blue-text'
          // For fixed sidebar add 'sidenav-fixed'
        }
      >
          <ul>
          <span
            className={'subheade'}
            style={{ marginLeft: '30px', fontSize: '18pt' }}
          >
            Groups
          </span>

          {setGroups(userGroups)}

          <li>
            <div className="divider"></div>
          </li>
          <li>
            <a className="subheader blue-text">Manage</a>
          </li>
          <li>
            <a href="#!" className={'blue-text'}>
              <i className="material-icons black-text">add</i>
              New group
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
