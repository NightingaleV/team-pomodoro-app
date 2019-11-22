import React, { Fragment } from 'react';
import classNames from 'classnames';

export function UserCard(props) {
  const statusObject = {
    offline: { label: 'Offline', color: 'grey' },
    idle: { label: 'Idle', color: 'brown lighten-2' },
    pomodoro: { label: 'Pomodoro', color: 'amber' },
    sBreak: { label: 'Short Break', color: 'green' },
    lBreak: { label: 'Long Break', color: 'green' },
  };
  const { member } = props;
  let timerIsRunning = null;
  let timerType = null;
  let timerName = null;
  let timerRemTime = null;
  let timerUpdated = null;
  // In minutes
  let timeDifference = null;

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

  return (
    <div className="col s6 m4 l3">
      <div className="card">
        <div className="wrapper">
          <div className="card-image waves-effect waves-block waves-light">
            <img
              className="activator"
              src="https://www.cloudraxak.com/wp-content/uploads/2017/03/profile-pic-placeholder.png"
            />
          </div>

          <div className="card-content flexbox">
            <span className="card-title activator grey-text text-darken-4">
              {member.email}
              <i className="material-icons right">more_vert</i>
            </span>
            <p className={''}>
              <span
                className={classNames(
                  'new badge left',
                  statusObject[status].color,
                )}
                data-badge-caption=""
              >
                {statusObject[status].label}
              </span>
            </p>
          </div>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            <i className="material-icons right">close</i>
            {member.email}
          </span>
          <p>User Info.</p>
          <a className="waves-effect waves-light btn-small red">
            <i className="material-icons left">remove_circle</i>Remove from
            Group
          </a>
        </div>
      </div>
    </div>
  );
}
