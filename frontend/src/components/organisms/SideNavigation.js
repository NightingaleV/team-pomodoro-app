// External imports
import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import M from 'materialize-css';
import axios from 'axios';

// Internal imports
import { Link, NavLink } from '../atoms/Link';
import { useAuth } from '../../utils/useAuth';
import { GroupDetail } from '../../views/GroupDetail';
import { async } from 'rxjs/internal/scheduler/async';
import { useApi } from '../../utils/useApi';

export function GroupList(props) {
  const { groups } = props;
  let groupList = [];
  if (groups) {
    groupList = groups.map((group, index) => (
      <li className="group-item" key={index}>
        <NavLink
          to={'/group/' + group._id}
          className={classNames('group-link sidenav-close')}
        >
          <i className="material-icons">keyboard_arrow_right</i>{' '}
          <span className="group-name ">{group.name}</span>
        </NavLink>
      </li>
    ));
  }

  return groupList;
}

export function SideNavigationBase(props) {
  const api = useApi();
  const auth = useAuth();
  const { user, token } = useAuth();
  const [userGroups, setUserGroups] = useState([{ name: '', userIDs: [] }]);

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
      <aside id="slide-out" className={'sidenav sidenav-fixed main-menu'}>
        <ul>
          <li>
            <a className="subheader">
              <i className="material-icons">group</i> My Groups
            </a>
          </li>
          {user && <GroupList groups={userGroups}></GroupList>}
          <li>
            <div className="divider"></div>
          </li>
          <li>
            <a className="subheader">Manage Groups</a>
          </li>
          <li></li>
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
    </>
  );
}

export const SideNavigation = withRouter(SideNavigationBase);
