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

  //Form Fields
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  //Form Errors
  const [errors, setError] = useState({
    email: '',
    password: '',
    backend: [],
  });

  const validate = event => {
    let validErrors = errors;
    let valid = true;
    const { name, value } = event.target;
    switch (name) {
      case 'email':
        validErrors.email = '';
        valid = false;
        break;
      case 'password':
        validErrors.password =
          (value.length < 6 ? 'Password must be 6 characters long!' : '') ||
          (formData.password2 && value !== formData.password2
            ? 'The passwords do not match.'
            : '');
        valid = false;
        break;
      case 'password2':
        validErrors.password2 =
          value !== formData.password ? 'The passwords do not match.' : '';
        break;
        valid = false;
      default:
        break;
    }
    setError(validErrors);
    // console.log(validErrors);
  };
  //On changing text inside inputs
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    validate(e);
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
    };
    await axios
      .post('api/user/login', body, config)
      .then(res => {
        const { token, user } = res.data;
        // localStorage.setItem('jwt-token', token);
        console.log(user);
        auth.signin({ token, user });
        history.replace('/timer');
      })
      .catch(err => {
        console.log('Error Statement');
        console.error(err.response.data);
        setError({ ...errors, backend: err.response.data.errors });
        console.log(errors);
        err.response.data.errors.map(error => {
          console.log(error);
        });
      });
  };

  return (
    <Fragment>
      <TopNavigation />
      <div className="blue lighten-5">
        <div className="container">
          <div className="row">
            <div className="col s12 center-align">
              <h3>Create an account</h3>
            </div>
            <form
              id={'authentication-form'}
              className={classNames('col s6 offset-s3')}
              onSubmit={onSubmit}
            >
              <div className="row">
                <TextInput
                  id={'email-address'}
                  name={'email'}
                  type={'email'}
                  value={formData.email}
                  onChange={onChange}
                  className={'validate'}
                  required
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
                <Fragment>
                  {errors.backend.map(error => {
                    return <ErrorBox key={error.msg} errorMsg={error.msg} />;
                  })}
                </Fragment>
                <div className={classNames('center-align', 'col s12')}>
                  <Button type={'submit'} form={'authentication-form'}>
                    Login
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export function RegistrationComplete() {
  return (
    <Fragment>
      <TopNavigation></TopNavigation>
      <div className="container">
        <SignUpSuccess />
      </div>
    </Fragment>
  );
}
