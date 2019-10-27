// External imports
import React, { Fragment } from 'react';
// Internal imports
import { Link } from '../components/atoms';
import { TopNavigation, PomodoroTimer } from '../components/organisms';

export function SignUpSuccess(props) {
  return (
    <Fragment>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card green darken-1">
            <div className="valign-wrapper">
              <div className="card-content white-text ">
                <i className="large material-icons left">verified_user</i>
                <span className="card-title">Registration Succeed</span>
                <p>
                  <span>
                    Your account has been successfully created. Please
                  </span>
                  <Link to="/login" className={'orange-text lighten-4'}>
                    continue to sign-in
                  </Link>
                </p>
              </div>
            </div>
            <div className="card-action right-align">
              <Link to="/login">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
