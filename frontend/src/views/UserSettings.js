// External imports
import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import axios from 'axios';
// Internal imports
import { TopNavigation } from '../components/organisms';
import { TextInput, Button, ErrorBox, SuccessBox } from '../components/atoms';
import { SignUpSuccess } from '../templates';
import { useAuth } from '../utils/useAuth';
import { useApi } from '../utils/useApi';
import { useTimer } from '../components/providers/TimerProvider';

export function UserSettings(props) {
  const history = useHistory();
  const { user, token, signin } = useAuth();

  //Form Fields
  const [formData, setFormData] = useState({
    username: '',
  });

  //Form Errors
  const [errors, setError] = useState({
    backend: '',
  });
  const [success, setSuccess] = useState(false);

  //On changing text inside inputs
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //On pushing the main button
  const onSubmit = async e => {
    e.preventDefault();
    if (formData.username.length < 1) {
      setError({ backend: { msg: 'Username needs to be longer than this.' } });
    } else {
      const settingsToChange = {
        username: formData.username,
      };
      const body = JSON.stringify(settingsToChange);
      const config = {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
        timeout: 5000,
      };
      console.log(token);
      await axios
        .post('api/user/settings', body, config)
        .then(res => {
          if (!res.data.error) {
            const { user } = res.data;
            console.log(user);
            // history.replace('/');
            signin({ token, user });
            setSuccess(true);
          } else setError({ backend: { msg: res.data.error } });
        })
        .catch(err => {
          console.log('Error Statement');
          console.log(err);

          //If TimeOut
        });
    }
  };

  return (
    <>
      <div className="container center-align">
        <h3>Profile Settings</h3>
        <div className="login-form">
          <>{success && <SuccessBox msg="You setting has been changed" />}</>
          <form id={'settings-form'} onSubmit={onSubmit}>
            <TextInput
              id={'username'}
              name={'username'}
              type={'text'}
              value={formData.username}
              onChange={onChange}
              className={'validate'}
              required
              autofocus={'autofocus'}
            >
              Display Name
            </TextInput>
            <>{errors.backend && <ErrorBox errorMsg={errors.backend.msg} />}</>
            <Button type="submit" form={'settings-form'}>
              Save
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
