import React, { Fragment } from 'react';
import classNames from 'classnames';
import { Button } from '../atoms/Button';

function setGroupName(props) {
  const { group } = props;
  try {
    return (
      <div className="groupName">
        <h3>{group.name}</h3>
      </div>
    );
  } catch (err) {
    /*console.log(err);*/
  }
  return;
}

// udelej z toho molekulu
function setUsers(props) {
  const { group } = props;
  /*console.log('members: ',group);*/
  console.log('props', group);
  try {
    const result = group.userIDs.map((member, i) => (
      <div className="col s6 m4 l3" key={i}>
        <div className="card">
          <div className="wrapper">
            <div className="card-image waves-effect waves-block waves-light">
              <img
                className="circle activator"
                src="https://ssl.gstatic.com/images/branding/product/1x/avatar_square_blue_512dp.png"
              />
            </div>

            <div className="card-content flexbox">
              <span className="card-title activator grey-text text-darken-4">
                {member.email}
                <i className="material-icons right">more_vert</i>
              </span>
              <p className={''}>
                <span
                  className={classNames('new badge left', {
                    orange:
                      member.timerID.isRunning &
                      (member.timerID.settings.type === 1),
                    green:
                      member.timerID.isRunning &
                      (member.timerID.settings.type === 2),
                    indigo:
                      member.timerID.isRunning &
                      (member.timerID.settings.type === 3),
                    blue: !member.timerID.isRunning,
                  })}
                  data-badge-caption=""
                >
                  {member.timerID.isRunning
                    ? 'Active - ' + member.timerID.settings.name
                    : 'Inactive'}
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
    ));
    /* console.log('members: ',group.members);*/
    return result;
  } catch (err) {
    /* console.log(err);*/
  }
  return;
}

export function PomodoroGroup(props) {
  /*console.log('props:', props);*/

  return (
    // udelej nekdy z toho molekulu ...
    <>
      <div className="container group">
        <div className="groupName">{setGroupName(props.group)}</div>
        <div className="row">{setUsers(props.group)}</div>
      </div>
    </>
  );
}
