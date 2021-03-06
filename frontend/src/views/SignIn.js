// External imports
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// Internal imports
import { TextInput, Button, ErrorBox } from '../components/atoms';
import { useAuth } from '../utils/useAuth';
import { useTimer } from '../components/providers/TimerProvider';

export function SignIn(props) {
  const history = useHistory();
  const { timerAction } = useTimer();
  const auth = useAuth();

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
        timerAction.pauseTimer();
        auth.signin({ token, user });
        history.replace('/');
      })
      .catch(err => {
        //If TimeOut
        if (err.code === 'ECONNABORTED') {
          setError({
            ...errors,
            backend: [{ msg: 'Lost connection, try it later.' }],
          });
        } else {
          if (err.response.data) {
            setError({ ...errors, backend: err.response.data.errors });
          }
        }
      });
  };

  return (
    <>
      <div className="login-container card-panel white">
        <h3>Log in</h3>
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
            <Button type="submit" form={'authentication-form'}>
              Log In
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
