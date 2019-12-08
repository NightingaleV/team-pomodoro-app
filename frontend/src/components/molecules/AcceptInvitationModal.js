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

// export function AcceptInvitationModal({ group, refetchGroup }) {
export function AcceptInvitationModal(props) {
  const history = useHistory();
  let location = useLocation();
  const api = useApi();
  const { user, token } = useAuth();

  // Component State
  //----------------------------------------------------------------------------
  const [errors, setError] = useState({ backend: '' });

  // Component Control
  //----------------------------------------------------------------------------
  function closeModal() {
    const addMemberModalElement = document.querySelector('.accept-invitation-modal');
    const elem = M.Modal.getInstance(addMemberModalElement);
    elem.close();
  }

  // Form Control
  //----------------------------------------------------------------------------
  const acceptInvitation = async e => {
    const requestData = {
      groupID: props.group._id,
    };

    const config = {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(requestData);
    await axios
      .post('/api/group/acceptInvitation', body, config)
      .then(res => {
        // history.push('/group/' + props.group._id);
        console.log('Valid Statement');
        console.log(res.data);
        //Show a new user in group
        closeModal();
        props.refetchGroup();
        
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
        id="acceptInvitationModal"
        className="accept-invitation-modal modal center-align"
      >
        <div className="modal-content">
          <h4>Accepting invitation into {props.group.name}</h4>
          <p>Do you really want to become a member of this group?</p>
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
              Cancel
            </Button>
            <Button
            //   icon={'directions_run'}
              icon={'check'}
              iconPosition={'left'}
              color={'red lighten-1'}
              type={'button'}
              className={'mx-4'}
              onClick={acceptInvitation}
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
