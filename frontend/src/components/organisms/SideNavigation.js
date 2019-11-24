// External imports
import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import M from 'materialize-css';
import axios from 'axios';

// Internal imports
import timerIcon from '../../assets/icon/timer_white_192x192.png';
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
    var elem = M.Modal.init(createGroupModalElement, options);
  }

  useEffect(() => {
    //initialize hamburger menu
    initSidebarMenu();
    initNewGroupModal();
  }, []);

  const sideNavContent = (
    <ul className={'sidenav-list'}>
      <li className={'logo blue '}>
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
        <li>
          <a
            href="#createGroupModal"
            className={classNames('sidenav-close', 'modal-trigger')}
          >
            <i className="material-icons">group_add</i>{' '}
            <span className="group-name ">Create new group</span>
          </a>
        </li>
      )}
      <li>
        <div className="divider"></div>
      </li>
      <li>
        <a className="subheader">
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
