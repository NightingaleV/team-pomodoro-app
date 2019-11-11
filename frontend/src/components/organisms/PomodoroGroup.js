import React, { Fragment } from 'react';
import classNames from 'classnames';

function setGroupName(props) {
  const { group } = props;
  try {
    return (
      <div className="groupName">
        <h1>{group.name}</h1>
      </div>
    );
  } catch (err) {
    /*console.log(err);*/
  }
  return;
}

// // udelej z toho molekulu
// function setUsers(props) {
//   const group = props;
//   /*console.log('members: ',group);*/
//   try {
//     const result = group._id.members.map(member => (
//       <div className="col s6 m4 l3" key={member.email}>
//         <div className="card">
//           <div className="card-image">
//             <img
//               src="https://www.pinclipart.com/picdir/big/200-2008697_account-customer-login-man-user-icon-login-icon.png"
//               alt="user_template_icon"
//             />
//           </div>
//           <div className="card-content">
//             <span className="card-title">
//               <div className="truncate">{member.email}</div>
//             </span>
//             <p className="">
//               Status:
//               {/*member.timer.status*/}
//             </p>
//           </div>
//         </div>
//       </div>
//     ));
//     /* console.log('members: ',group.members);*/
//     return result;
//   } catch (err) {
//     /* console.log(err);*/
//   }
//   return;
// }
// udelej z toho molekulu
function setUsers(props) {
  const { group } = props;
  /*console.log('members: ',group);*/
  console.log('props', group);
  try {
    const result = group.userIDs.map((member, i) => (
      <div className="col s6 m4 l4" key={i}>
        <div className="card">
          <div className="wrapper">
            <div className="card-image waves-effect waves-block waves-light">
              <img
                className="activator"
                src="https://www.cloudraxak.com/wp-content/uploads/2017/03/profile-pic-placeholder.png"
              />
            </div>

            <div className="card-content">
              <span className="card-title activator grey-text text-darken-4">
                {member.email}
                <i className="material-icons right">more_vert</i>
              </span>
              <p className={''}>
                Status:{' '}
                <span
                  className={classNames('new badge', {
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
              Card Title<i className="material-icons right">close</i>
            </span>
            <a className="btn-floating halfway-fab waves-effect waves-light red">
              <i className="material-icons">add</i>
            </a>
            <p>
              Here is some more information about this product that is only
              revealed once clicked on.
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
    <>
      <div className="container group">
        <div className="groupName">{setGroupName(props.group)}</div>
        <div className="row">{setUsers(props.group)}</div>
      </div>
    </>
  );
}
