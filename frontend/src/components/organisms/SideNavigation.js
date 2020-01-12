// External imports
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import M from 'materialize-css';
import axios from 'axios';

// Internal imports
import timerIcon from '../../assets/icon/timer_white_192x192.png';
import { Link, NavLink } from '../atoms/Link';
import { useAuth } from '../../utils/useAuth';

export function GroupList(props) {
  const { groups } = props;
  let groupList = [];
  if (groups) {
    groupList = groups.map((group, index) => (
      <li className="group-item" key={index}>
        <NavLink
          to={'/group/' + group._id}
          className={classNames('group-link sidenav-close truncate')}
        >
          <i className="material-icons">keyboard_arrow_right</i>
          {group.name}{' '}
          <span className="badge" data-badge-caption="">
            {group.userIDs.length}
          </span>
        </NavLink>
      </li>
    ));
  }

  return groupList;
}

export function SideNavigationBase(props) {
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
      console.log(res.data);
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
    M.Sidenav.init(sideNavElement, options);
    const instance = M.Sidenav.getInstance(sideNavElement);
    // instance.open();
    console.log(instance.isOpen);
  }

  function initNewGroupModal() {
    const createGroupModalElement = document.querySelector(
      '.create-group-modal',
    );
    const mainInputElem = document.querySelector('.main-input');
    const options = {
      onOpenStart: () => {
        mainInputElem.value = '';
      },
      onOpenEnd: () => {
        mainInputElem.focus();
      },
    };
    M.Modal.init(createGroupModalElement, options);
  }

  useEffect(() => {
    //initialize hamburger menu
    initSidebarMenu();
    initNewGroupModal();
  }, []);

  const sideNavContent = (
    <ul className={'sidenav-list'}>
      <li className={'logo blue'}>
        <div className="valign-wrapper">
          <img
            className={classNames('left', 'logo-icon')}
            src={timerIcon}
            alt="Team Pomodoro App"
            width="35"
          />
          <Link to="/timer" className="logo-text white-text blue">
            Pomodoro
          </Link>
        </div>
      </li>
      {user && (
        <li className="group-name">
          <a
            href="#createGroupModal"
            className={classNames(
              'sidenav-close',
              'modal-trigger',
              'waves-effect',
            )}
          >
            <i className="material-icons">group_add</i>{' '}
            <span>Create a new group</span>
          </a>
        </li>
      )}
      <li className="group-name">
        <NavLink to="/analytics" className={classNames('waves-effect')}>
          <i className="material-icons">insert_chart</i> <span>Analytics</span>
        </NavLink>
      </li>
      <li>
        <div className="divider"></div>
      </li>
      <li>
        <a href="" className="subheader">
          <i className="material-icons">group</i> My Groups
        </a>
      </li>
      {user && <GroupList groups={userGroups}></GroupList>}
    </ul>
  );

  return (
    <>
      <div className={'hide-on-med-and-down'}>
        <aside id="" className={'sidenav sidenav-fixed'}>
          {sideNavContent}
        </aside>
      </div>
      <div className={'.hide-on-large-only'}>
        <aside id="slide-out" className={'sidenav main-menu'}>
          {sideNavContent}
        </aside>
      </div>
    </>
  );
}

export const SideNavigation = withRouter(SideNavigationBase);
