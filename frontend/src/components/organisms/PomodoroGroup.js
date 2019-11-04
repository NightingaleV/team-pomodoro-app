import React, { Fragment } from 'react';

// udelej z toho molekulu
function setUsers(props) {
  const members = props;
  const result = members.map(member => (
    <div className="col s6 m4 l3">
      <div className="card">
        <div className="card-image">
          <img
            src="https://www.pinclipart.com/picdir/big/200-2008697_account-customer-login-man-user-icon-login-icon.png"
            alt="user_template_icon"
          />
        </div>
        <div className="card-content">
          <span className="card-title">
            <div className="truncate">{member.email}</div>
          </span>
          <p className="">
            Status:
            {' ' + member.timer.status}
          </p>
        </div>
      </div>
    </div>
  ));
  return result;
}

export function PomodoroGroup(props) {
  const { group } = props;

  return (
    // udelej nekdy z toho molekulu ...
    <Fragment>
      <div className="group">
        <div className="groupName">{group.name}</div>
        <div className="row">{setUsers(group.members)}</div>
      </div>
    </Fragment>
  );
}
