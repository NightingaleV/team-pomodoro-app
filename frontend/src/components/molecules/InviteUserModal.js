//External import
import React, { Fragment, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
// Internal imports
import { TextInput, Button, ErrorBox } from '../atoms';
import { useAuth } from '../../utils/useAuth';
import M from 'materialize-css';
import classNames from 'classnames';

export function InviteUserModal(props) {
  const history = useHistory();
  const { token } = useAuth();

  // Component State
  //----------------------------------------------------------------------------
  const [formData, setFormData] = useState({
    email: '',
    groupID: props.group._id || '',
  });
  const [errors, setError] = useState({});

  // Component Control
  //----------------------------------------------------------------------------
  function closeModalAfterSubmit() {
    const addMemberModalElement = document.querySelector('.add-member-modal');
    const elem = M.Modal.getInstance(addMemberModalElement);
    elem.close();
  }

  // Form Control
  //----------------------------------------------------------------------------
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    const formDataRequest = {
      email: formData.email,
      groupID: formData.groupID,
    };
    console.log(formDataRequest);

    const config = {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(formDataRequest);
    await axios
      .post('/api/group/addmember', body, config)
      .then(res => {
        console.log('Valid Statement');
        closeModalAfterSubmit();
        console.log(res.data);
        //Show a new user in group
        props.refetchGroup();
        history.push({
          pathname: '/group/' + props.group._id,
        });
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
      <div id="addMemberModal" className="add-member-modal modal center-align">
        <div className="modal-content">
          <h4>Add a new member</h4>
          <div>
            <form id={'add-member-form'} onSubmit={onSubmit}>
              <TextInput
                className="main-input"
                id={'email'}
                name={'email'}
                type={'email'}
                value={formData.email}
                onChange={onChange}
                required
              >
                Email
              </TextInput>
              <>
                {errors.backend &&
                  errors.backend.map((error, index) => {
                    return <ErrorBox key={index} errorMsg={error.msg} />;
                  })}
              </>
              <Button type={'submit'} form={'add-member-form'}>
                Add
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export function AddMemberModalTrigger(props) {
  const { user } = useAuth();
  return (
    <>
      {user && (
        <>
          <Button
            icon={'person_add'}
            iconPosition={'left'}
            href={'#addMemberModal'}
            className={classNames(
              'hide-on-med-and-down',
              'modal-trigger',
              'group-action-button',
            )}
          >
            <span className="btn-title">Invite</span>
          </Button>
          <Button
            icon={'person_add'}
            shape={'circular'}
            iconPosition={'left'}
            href={'#addMemberModal'}
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
