// External imports
import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import axios from 'axios';
// Internal imports
import { TopNavigation } from '../components/organisms';
import { TextInput, Button, ErrorBox } from '../components/atoms';
import { SignUpSuccess } from '../templates';
import { useAuth } from '../utils/useAuth';
import { useApi } from '../utils/useApi';

export function SignIn(props) {
  const history = useHistory();
  const auth = useAuth();
  const api = useApi();

  const registeredEmail = props.location.state && props.location.state.email;

  //Form Fields
  const [formData, setFormData] = useState({
    email: registeredEmail || '',
    password: '',
  });

  //Form Errors
  const [errors, setError] = useState({
    backend: [],
  });

  //On changing text inside inputs
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //On pushing the main button
  const onSubmit = async e => {
    e.preventDefault();

    const userToLogin = {
      email: formData.email,
      password: formData.password,
    };
    const body = JSON.stringify(userToLogin);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000,
    };
    await axios
      .post('api/user/login', body, config)
      .then(res => {
        const { token, user } = res.data;
        // localStorage.setItem('jwt-token', token);
        console.log(user);
        auth.signin({ token, user });
        history.replace('/');
      })
      .catch(err => {
        console.log('Not Able to Load DB');
        console.log('Error Statement');
        console.log(err);

        //If TimeOut
        if (err.code === 'ECONNABORTED') {
          setError({ ...errors, backend: [{ msg: 'Timer Out' }] });
          console.log(errors);
        } else {
          if (err.response.data) {
            setError({ ...errors, backend: err.response.data.errors });
            console.log(err.response.data.errors);
            // err.response.data.errors.map(error => {
            //   console.log(error);
            // });
          }
        }
      });
  };

  return (
    <>
      <div className="login-container">
        <h3>Sign in to Pomodoro</h3>
        <div className="login-form">
          <form id={'authentication-form'} onSubmit={onSubmit}>
            <TextInput
              id={'email-address'}
              name={'email'}
              type={'email'}
              value={formData.email}
              onChange={onChange}
              className={'validate'}
              required
              autofocus={'autofocus'}
            >
              Email
            </TextInput>
            <TextInput
              id={'password'}
              name={'password'}
              type={'password'}
              value={formData.password}
              onChange={onChange}
              error={errors.password || ''}
              required
            >
              Password
            </TextInput>
            <>
              {errors.backend &&
                errors.backend.map((error, index) => {
                  return <ErrorBox key={index} errorMsg={error.msg} />;
                })}
            </>
            <Button type={'submit'} form={'authentication-form'}>
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
export function RegistrationComplete() {
  return (
    <>
      <SignUpSuccess />
    </>
  );
}
