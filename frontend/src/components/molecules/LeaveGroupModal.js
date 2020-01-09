//External import
import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// Internal imports
import { Button } from '../atoms';
import { useAuth } from '../../utils/useAuth';
import M from 'materialize-css';
import classNames from 'classnames';

export function LeaveGroupModal({ group }) {
  const history = useHistory();
  const { token } = useAuth();

  // Component State
  //----------------------------------------------------------------------------

  // Component Control
  //----------------------------------------------------------------------------
  function closeModal() {
    const addMemberModalElement = document.querySelector('.leave-group-modal');
    const elem = M.Modal.getInstance(addMemberModalElement);
    elem.close();
  }

  // Form Control
  //----------------------------------------------------------------------------
  const leaveGroup = async e => {
    const requestData = {
      groupID: group._id,
    };

    const config = {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(requestData);
    await axios
      .post('/api/group/leave', body, config)
      .then(res => {
        history.push('/');
      })
      .catch(err => {
        console.log('Error Statement');
        console.log(err);
      });
  };

  // Modal Content
  //----------------------------------------------------------------------------
  return (
    <>
      <div
        id="leaveGroupModal"
        className="leave-group-modal modal center-align"
      >
        <div className="modal-content">
          <h4>Leaving {group.name}</h4>
          <p>Do you really want to leave this group?</p>
          <div>
            <Button
              icon={'undo'}
              iconPosition={'left'}
              color={'blue lighten-1'}
              type={'button'}
              className={'mx-4'}
              onClick={closeModal}
            >
              Stay
            </Button>
            <Button
              icon={'directions_run'}
              iconPosition={'left'}
              color={'red lighten-1'}
              type={'button'}
              className={'mx-4'}
              onClick={leaveGroup}
            >
              Leave
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export function LeaveGroupModalTrigger(props) {
  const { user } = useAuth();
  return (
    <>
      {user && (
        <>
          <Button
            icon={'directions_run'}
            color={'red lighten-1'}
            iconPosition={'left'}
            href={'#leaveGroupModal'}
            className={classNames(
              'hide-on-med-and-down',
              'modal-trigger',
              'group-action-button',
            )}
          >
            <span className="btn-title">Leave</span>
          </Button>
          <Button
            icon={'directions_run'}
            color={'red lighten-1'}
            shape={'circular'}
            iconPosition={'right'}
            href={'#leaveGroupModal'}
            className={classNames(
              'hide-on-large-only',
              'modal-trigger',
              'group-action-button',
            )}
          />
        </>
      )}
    </>
  );
}
