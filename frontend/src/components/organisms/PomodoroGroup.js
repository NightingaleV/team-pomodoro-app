import React, { Fragment } from 'react';

function setGroupName(props) {
  const group = props;
  try {
    return <div className="groupName">{group._id.name}</div>;
  } catch (err) {
    /*console.log(err);*/
  }
  return;
}

// udelej z toho molekulu
function setUsers(props) {
  const group = props;
  /*console.log('members: ',group);*/
  try {
    const result = group._id.members.map(member => (
      <div className="col s6 m4 l3" key={member.email}>
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
              {/*member.timer.status*/}
            </p>
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
    <Fragment>
      <div className="group">
        <div className="groupName">{setGroupName(props.group)}</div>
        <div className="row">{setUsers(props.group)}</div>
      </div>
    </Fragment>
  );
}
