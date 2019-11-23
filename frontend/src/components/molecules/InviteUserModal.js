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

export function InviteUserModal(props) {
  const history = useHistory();
  let location = useLocation();
  const api = useApi();
  const { user, token } = useAuth();

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
          <h4>Add a user to the Group</h4>
          <div>
            <form id={'add-member-form'} onSubmit={onSubmit}>
              <TextInput
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
                Add member
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
