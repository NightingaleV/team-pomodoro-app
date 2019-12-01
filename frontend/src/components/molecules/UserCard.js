import React, { Fragment, useState, useEffect } from 'react';
import classNames from 'classnames';
import { RemoveUserModal } from './RemoveUserModal';
import axios from 'axios';
import { useAuth } from '../../utils/useAuth';
import { useLocation } from 'react-router-dom';
import M from 'materialize-css';
import { Button } from '../atoms/Button';

import profileImage from '../../assets/images/profile-pic-placeholder.png';
import timerIcon from '../../assets/icon/timer_white_192x192.png';

export function UserCard(props) {
  const statusObject = {
    offline: { label: 'OFFLINE', color: 'grey' },
    idle: { label: 'IDLE', color: 'brown lighten-2' },
    pomodoro: { label: 'POMODORO', color: 'amber' },
    sBreak: { label: 'SHORT BREAK', color: 'green' },
    lBreak: { label: 'LONG BREAK', color: 'indigo' },
  };
  const { member } = props;
  let timerIsRunning = null;
  let timerType = null;
  let timerName = null;
  let timerRemTime = null;
  let timerUpdated = null;
  // In minutes
  let timeDifference = null;

  const { user, token } = useAuth();
  const [group, setGroup] = useState({ name: '', userIDs: [] });
  const [error, setError] = useState('');
  let location = useLocation();
  const [modalId, setModalId] = useState('');

  if (member.timerID) {
    timerIsRunning = member.timerID.isRunning;
    timerType = member.timerID.settings.type;
    timerName = member.timerID.settings.name;
    timerRemTime = member.timerID.remTime;
    timerUpdated = new Date(member.timerID.updatedAt);
    // In minutes
    timeDifference = (Date.now() - timerUpdated) / (1000 * 60);
  }

  let status = '';
  if (timerIsRunning && timerType === 1) status = 'pomodoro';
  if (timerIsRunning && timerType === 2) status = 'sBreak';
  if (timerIsRunning && timerType === 3) status = 'lBreak';
  if (!timerIsRunning) status = 'idle';
  if (!timerIsRunning && timeDifference > 30) status = 'offline';

  let styles = {
    width: '85%',
  };

  useEffect(() => {
    fetchGroupByUrlId();
  }, []);

  function getGroupIdentifier(props) {
    const url = location.pathname;
    const urlList = url.split('/');
    const groupID = urlList[urlList.length - 1];
    return groupID;
  }

  const requestConfig = {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
  };

  async function fetchGroupByUrlId() {
    try {
      await axios
        .get('/api/group/' + getGroupIdentifier(), requestConfig)
        .then(res => {
          // console.log('Fetched Group Data: ', res.data.group);
          setGroup(res.data.group);
        })
        .catch(err => {
          if (err.response.status == 403 || err.response.status == 401) {
            console.log('You are prohibited to view the group');
            setError('You are prohibited to view the group');
          }
          console.error(err);
        });
    } catch {}
  }

  const onClick = async e => {
    // console.log('Member: ' + member.email);
    // fetchGroupByUrlId();
    console.log(member);
  };

  return (
    <div className="card hoverable">
      <div className="card-image waves-effect waves-block waves-light">
        <img className="activator" src={profileImage} alt="Profile Picture" />
      </div>
      <div className="divider"></div>
      <div className="card-content">
        {/* <a className="btn-floating small halfway-fab waves-effect waves-light grey lighten-1 notification">
          <i className="material-icons">notifications_none</i>
        </a> */}
        <div className="card-title activator grey-text text-darken-4">
          <p className="user-name truncate">{member.email}</p>
          <span className="more-icon">
            <i className="material-icons right">more_vert</i>
          </span>
        </div>
        <div className="member-info center-align">
          <div className="progress">
            <div
              className={classNames('progress-bar', statusObject[status].color)}
              style={styles}
            >
              <p className="progress-percent">{statusObject[status].label}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="card-reveal center-align">
        <span className="card-title grey-text text-darken-4 truncate">
          <i className="material-icons right">close</i>
          User
        </span>
        <p className={'truncate'}>{member.email}</p>
        {props.currentUserIsAdmin && (
          <Button
            className={'modal-trigger'}
            href={'#removeMemberModal'}
            color={'red lighten-1 '}
            onClick={() => {
              props.sendMemberToRemove(member);
            }}
          >
            <i className="material-icons left">delete</i>Remove
          </Button>
        )}
      </div>
      <div className="group-modals"></div>
    </div>
  );
}
