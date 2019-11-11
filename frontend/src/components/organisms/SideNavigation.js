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
import { useApi } from '../../utils/useApi';
// Assets

function setGroups(userGroups) {
  try {
    /*console.log('props',userGroups)*/
    const result = userGroups.map(group => (
      <div key={group._id}>
        <li>
          <Link
            to={'/group/' + group._id}
            className={classNames('sidenav-close')}
          >
            <i className="material-icons">group</i> {group.name}
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

export function SideNavigationBase(props) {
  const api = useApi();
  const auth = useAuth();
  const { user, token } = useAuth();
  const [userGroups, setUserGroups] = useState({ name: [] });

  const fetchUserGroups = async () => {
    try {
      const requestConfig = {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
        timeout: 5000,
      };
      const res = await axios.get('/api/group/mine', requestConfig);

      setUserGroups(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserGroups();
    }
    console.log('Vyfetchovane User Groups', userGroups);
  }, [props.history.location]);

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
            <a className="subheader">My Groups</a>
          </li>

          <li></li>
          {setGroups(userGroups)}
          {/*<GroupMembers groups={userGroups} />*/}
          <li>
            <div className="divider"></div>
          </li>
          <li>
            <a className="subheader">Manage Groups</a>
          </li>
          <li></li>
          {/*<div className="divider"></div>*/}
          <li>
            <a className="subheader">Actions</a>
          </li>
          <li>
            <a href="#!">
              <i className="material-icons">group_add</i>
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
