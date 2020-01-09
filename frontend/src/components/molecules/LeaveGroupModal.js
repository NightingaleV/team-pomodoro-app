//External import
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// Internal imports
import { Button, ErrorBox } from '../atoms';
import { useAuth } from '../../utils/useAuth';
import M from 'materialize-css';

export function LeaveGroupModal({ group }) {
  const history = useHistory();
  const { token } = useAuth();

  // Component State
  //----------------------------------------------------------------------------
  const [errors, setError] = useState({ backend: '' });

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
          <>
            {errors.backend &&
              errors.backend.map(error => {
                return <ErrorBox key={error.msg} errorMsg={error.msg} />;
              })}
          </>
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
