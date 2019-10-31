import React, { Fragment } from 'react';

// udelej z toho molekulu
function setUsers(props) {
  const members = props;
  const result = members.map(member => (
    <div className="member">
      <div>
        <img
          className="iconImg"
          src="https://www.pinclipart.com/picdir/big/200-2008697_account-customer-login-man-user-icon-login-icon.png"
          alt="user_template_icon"
        />
      </div>
      <div className="memberName">
        Name:
        {' ' + member.email}
      </div>
      <div className="memberTimer">
        Status:
        {' ' + member.timer.status}
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
        {setUsers(group.members)}
      </div>
    </Fragment>
  );
}
