//External import
import React, { Fragment, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
// Internal imports
import { TextInput, Button, ErrorBox } from '../atoms';
import { SignUpSuccess } from '../../templates';
import { useAuth } from '../../utils/useAuth';
import { useApi } from '../../utils/useApi';
import M from 'materialize-css';

export function LeaveGroupModal({ group }) {
  const history = useHistory();
  let location = useLocation();
  const api = useApi();
  const { user, token } = useAuth();

  // Component State
  //----------------------------------------------------------------------------
  const [errors, setError] = useState({});

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
        closeModal();
      })
      .catch(err => {
        console.log('Error Statement');
        if (err.response.data) {
          setError({ ...errors, backend: err.response.data.errors });
          console.log(err.response.data.errors);
        }
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
              icon={'delete_sweep'}
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
