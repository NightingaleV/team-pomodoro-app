// External imports
import React, { Fragment, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import axios from 'axios';
// Internal imports
import { TopNavigation } from '../components/organisms';
import { TextInput, Button, ErrorBox } from '../components/atoms';
import { SignUpSuccess } from '../templates';
import { useAuth } from '../utils/useAuth';
import { useApi } from '../utils/useApi';

export function SignUp(props) {
  const history = useHistory();
  const api = useApi();

  //Form Fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  //Form Errors
  const [errors, setError] = useState({
    email: '',
    password: '',
    password2: '',
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

    if (errors.email || errors.password || errors.password2) {
      console.log('Not Valid');
      console.log(errors);
    } else {
      console.log('Valid');
      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify(newUser);
      await axios
        .post('api/user/register', body, config)
        .then(res => {
          console.log('Valid Statement');
          console.log(res.data.user);
          if (res.data.user) {
            history.push({
              pathname: '/register/success',
              state: { email: res.data.user },
            });
          }
        })
        .catch(err => {
          console.log('Error Statement');
          if (err.response.data) {
            setError({ ...errors, backend: err.response.data.errors });
            console.log(err.response.data.errors);
            if (err.response.data.errors) {
              err.response.data.errors.map(error => {
                console.log(error);
              });
            }
          }
        });
    }
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
              id={'registration-form'}
              className={classNames('col l4 offset-l4 s6 offset-s3')}
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
                <TextInput
                  id={'password2'}
                  name={'password2'}
                  type={'password'}
                  value={formData.password2}
                  onChange={onChange}
                  required=""
                  aria-required="true"
                  error={errors.password2 || undefined}
                >
                  Confirm Password
                </TextInput>
                <Fragment>
                  {errors.backend &&
                    errors.backend.map(error => {
                      return <ErrorBox key={error.msg} errorMsg={error.msg} />;
                    })}
                </Fragment>
                <div className={classNames('center-align', 'col s12')}>
                  <Button type={'submit'} form={'registration-form'}>
                    Register
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
  const { user } = useAuth();
  return (
    <Fragment>
      <TopNavigation></TopNavigation>
      <div className="container">
        <SignUpSuccess />
      </div>
    </Fragment>
  );
}
