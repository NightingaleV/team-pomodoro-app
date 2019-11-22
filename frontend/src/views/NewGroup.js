//External import
import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// Internal imports
import { TextInput, Button, ErrorBox } from '../components/atoms';
import { SignUpSuccess } from '../templates';
import { useAuth } from '../utils/useAuth';
import { useApi } from '../utils/useApi';

export function NewGroup() {
  const history = useHistory();
  const api = useApi();
  const { user, token } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
  });

  const [errors, setError] = useState({});

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

  return (
    <>
      <div className={'create-group-container'}>
        <h3>Create new group</h3>
        <div>
          <form id={'create-group-form'} onSubmit={onSubmit}>
            <TextInput
              id={'name'}
              name={'name'}
              type={'text'}
              value={formData.name}
              onChange={onChange}
              required
            >
              Group name
            </TextInput>
            <>
              {errors.backend &&
                errors.backend.map(error => {
                  return <ErrorBox key={error.msg} errorMsg={error.msg} />;
                })}
            </>
            <Button type={'submit'} form={'create-group-form'}>
              Create group
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}