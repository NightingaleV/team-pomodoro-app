//External import
import React from 'react';
import axios from 'axios';
// Internal imports
import { Button } from '../atoms';
import { useAuth } from '../../utils/useAuth';
import M from 'materialize-css';

export function RemoveUserModal({ group, member, refetchGroup }) {
  const { token } = useAuth();

  // Component State
  //----------------------------------------------------------------------------

  // Component Control
  //----------------------------------------------------------------------------
  function closeModal() {
    const removeMemberModalElement = document.querySelector(
      '.remove-member-modal',
    );
    const elem = M.Modal.getInstance(removeMemberModalElement);
    elem.close();
  }

  // Form Control
  //----------------------------------------------------------------------------
  const sendRequest = async e => {
    e.preventDefault();
    const requestData = {
      groupID: group._id,
      memberID: member._id,
    };
    console.log(requestData);

    const config = {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(requestData);
    await axios
      .post('/api/group/remove', body, config)
      .then(res => {
        refetchGroup();
        closeModal();
      })
      .catch(err => {
        console.log('Error Statement');
        if (err.response.data) {
          console.log('Error Statement');
          console.log(err);
        }
      });
  };

  // Modal Content
  //----------------------------------------------------------------------------
  return (
    <>
      <div
        id={'removeMemberModal'}
        className="remove-member-modal modal center-align"
      >
        <div className="modal-content">
          <h4>Do you want to remove {member.email}?</h4>
          <p>
            Do you really want to remove {member.email} from {group.name}?
          </p>
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
            icon={'delete_sweep'}
            iconPosition={'left'}
            color={'red lighten-1'}
            type={'submit'}
            form={'add-member-form'}
            className={'mx-4'}
            onClick={sendRequest}
          >
            Remove
          </Button>
        </div>
      </div>
    </>
  );
}
