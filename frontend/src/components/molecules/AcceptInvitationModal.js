//External import
import React, { useState } from 'react';
import axios from 'axios';
// Internal imports
import { Button, ErrorBox } from '../atoms';
import { useAuth } from '../../utils/useAuth';
import M from 'materialize-css';
import classNames from 'classnames';

export function AcceptInvitationModal({ group, refetchGroup }) {
  const { token } = useAuth();

  // Component State
  //----------------------------------------------------------------------------
  const [errors] = useState({ backend: '' });

  // Component Control
  //----------------------------------------------------------------------------
  function closeModal() {
    const addMemberModalElement = document.querySelector(
      '.accept-invitation-modal',
    );
    const elem = M.Modal.getInstance(addMemberModalElement);
    elem.close();
  }

  // Form Control
  //----------------------------------------------------------------------------
  const acceptInvitation = async e => {
    e.preventDefault();
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
      .post('/api/group/acceptInvitation', body, config)
      .then(res => {
        //Show a new user in group
        refetchGroup();
        closeModal();
      })
      .catch(err => {});
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
          <h4>Accepting invitation into {group.name}</h4>
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
              icon={'check'}
              iconPosition={'left'}
              color={'red lighten-1'}
              type={'submit'}
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

export function AcceptInvitationModalTrigger(props) {
  const { user } = useAuth();
  return (
    <>
      {user && (
        <>
          <Button
            icon={'check'}
            iconPosition={'left'}
            href={'#acceptInvitationModal'}
            className={classNames(
              'hide-on-med-and-down',
              'modal-trigger',
              'group-action-button',
            )}
          >
            <span className="btn-title">Accept invitation</span>
          </Button>
          <Button
            icon={'person_add'}
            shape={'circular'}
            iconPosition={'left'}
            href={'#acceptInvitationModal'}
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
