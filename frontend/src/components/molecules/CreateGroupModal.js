//External import
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// Internal imports
import { TextInput, Button, ErrorBox } from '../atoms';
import { useAuth } from '../../utils/useAuth';
import M from 'materialize-css';

export function CreateGroupModal() {
  const history = useHistory();
  const { token } = useAuth();

  // Component State
  //----------------------------------------------------------------------------
  const [formData, setFormData] = useState({
    name: '',
  });
  const [errors, setError] = useState({});

  // Component Control
  //----------------------------------------------------------------------------
  function closeModalAfterSubmit() {
    const createGroupModalElement = document.querySelector(
      '.create-group-modal',
    );
    const elem = M.Modal.getInstance(createGroupModalElement);
    elem.close();
  }
  // Form Control
  //----------------------------------------------------------------------------
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    const newGroup = { name: formData.name };

    const config = {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(newGroup);

    await axios
      .post('/api/group/new', body, config)
      .then(res => {
        console.log('Valid Statement');
        console.log(res.data.group);
        if (res.data.group) {
          history.push({
            pathname: '/group/' + res.data.group._id,
          });
          closeModalAfterSubmit();
        }
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
        id="createGroupModal"
        className="create-group-modal modal center-align"
      >
        <div className="modal-content">
          <h4>Create a new group</h4>
          <div>
            <form id={'create-group-form'} onSubmit={onSubmit}>
              <TextInput
                className={'main-input'}
                id={'name'}
                name={'name'}
                type={'text'}
                value={formData.name}
                onChange={onChange}
                required
              >
                Name
              </TextInput>
              <>
                {errors.backend &&
                  errors.backend.map(error => {
                    return <ErrorBox key={error.msg} errorMsg={error.msg} />;
                  })}
              </>
              <Button type={'submit'} form={'create-group-form'}>
                Create
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
