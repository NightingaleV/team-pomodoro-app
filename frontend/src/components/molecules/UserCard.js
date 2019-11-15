import React, { Fragment } from 'react';
import classNames from 'classnames';

export function UserCard(props) {
  const { member, index } = props;

  return (
    <Fragment>
      <div className="col s6 m4 l3" key={index}>
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
    </Fragment>
  );
}
