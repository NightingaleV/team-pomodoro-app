// External imports
import React, { Fragment } from 'react';
// Internal imports
import { TopNavigation, PomodoroTimer } from '../components/organisms';
import { TextInput, Button } from '../components/atoms';

export function SignUp() {
  return (
    <Fragment>
      <TopNavigation></TopNavigation>
      <div className="container">
        <div className="row blue lighten-5">
          <div className="col s12 center-align">
            <h3>Create an account</h3>
          </div>
          <form className="col s6 offset-s3">
            <div className="row">
              <TextInput id={'email_address'} type={'email'} name={'email'}>
                Email
              </TextInput>
              <TextInput id={'password'} name={'password'} type={'password'}>
                Password
              </TextInput>
              <TextInput id={'password2'} name={'password2'} type={'password'}>
                Confirm Password
              </TextInput>
              <div className={'center-align'}>
                <Button>Register</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
