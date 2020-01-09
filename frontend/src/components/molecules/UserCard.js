//External imports
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import M from 'materialize-css';
//Internal imports
import { Button } from '../atoms/Button';
import { updateProgressBar } from '../../utils/pomodoroUtils';
import profileImage from '../../assets/images/profile-pic-placeholder.png';

export function UserCard(props) {
  const statusObject = {
    offline: { label: 'OFFLINE', color: 'grey' },
    idle: { label: 'IDLE', color: 'brown lighten-2' },
    pomodoro: {
      label: 'POMODORO',
      color: 'amber stripes animated reverse slower',
    },
    sBreak: {
      label: 'SHORT BREAK',
      color: 'green stripes animated reverse slower',
    },
    lBreak: {
      label: 'LONG BREAK',
      color: 'indigo stripes animated reverse slower',
    },
  };
  const { member } = props;
  let timerIsRunning,
    timerType,
    timerRemTime,
    timerUpdated,
    timeDifference,
    timerTotTime = null;

  if (member.timerID) {
    timerIsRunning = member.timerID.isRunning;
    timerType = member.timerID.settings.type;
    timerRemTime = member.timerID.remTime;
    timerTotTime = member.timerID.settings.totTime;
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
  if (!timerType) status = 'offline';

  let styles;
  styles = {
    width: timerType
      ? ''.concat(updateProgressBar(timerRemTime, timerTotTime), '%')
      : '100%',
  };

  // Email Tooltip
  function initEmailTooltip() {
    const userNameElement = document.querySelectorAll('.user-name');
    const options = { position: 'top' };
    M.Tooltip.init(userNameElement, options);
  }

  useEffect(() => {
    initEmailTooltip();
  }, []);

  const [memberIsGuest, setMemberIsGuest] = useState(true);
  useEffect(() => {
    if (props.group) {
      if (!props.group.guestIDs.includes(member._id)) {
        setMemberIsGuest(false);
      }
    }
  }, [props.group]);

  return (
    <div className="card hoverable">
      <div className="card-image waves-effect waves-block waves-light">
        <img
          className="activator"
          src={member.avatar || profileImage}
          alt={member.username}
        />
      </div>
      <div className="divider"></div>
      <div className="card-content">
        <div className="card-title activator grey-text text-darken-4">
          <p className="user-name truncate" data-tooltip={member.email}>
            {member.username}
          </p>
          <span className="more-icon">
            <i className="material-icons right">more_vert</i>
          </span>
        </div>
        {!props.currentUserIsGuest && !memberIsGuest && (
          <div className="member-info center-align">
            <div className="progress">
              <div
                className={classNames(
                  'progress-bar progress-bar',
                  statusObject[status].color,
                )}
                style={styles}
              >
                <p className="progress-percent">{statusObject[status].label}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="card-reveal center-align">
        <span className="card-title grey-text text-darken-4 truncate">
          <i className="material-icons right">close</i>
          Member
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
