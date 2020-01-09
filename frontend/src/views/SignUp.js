// External imports
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// Internal imports
import { TextInput, Button, ErrorBox } from '../components/atoms';
import { SignUpSuccess } from '../templates';

export function SignUp(props) {
  const history = useHistory();

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
    const { name, value } = event.target;
    switch (name) {
      case 'email':
        validErrors.email = '';
        break;
      case 'password':
        validErrors.password =
          (value.length < 6 ? 'Password must be 6 characters long!' : '') ||
          (formData.password2 && value !== formData.password2
            ? 'The passwords do not match.'
            : '');
        break;
      case 'password2':
        validErrors.password2 =
          value !== formData.password ? 'The passwords do not match.' : '';
        break;
      default:
        break;
    }
    setError(validErrors);
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
          }
        });
    }
  };

  return (
    <>
      <div className="singup-container card-panel">
        <h3>Sign up</h3>
        <div className={'singup-form'}>
          <form id={'registration-form'} onSubmit={onSubmit}>
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
            <>
              {errors.backend &&
                errors.backend.map(error => {
                  return <ErrorBox key={error.msg} errorMsg={error.msg} />;
                })}
            </>
            <Button type={'submit'} form={'registration-form'}>
              Sign Up
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
