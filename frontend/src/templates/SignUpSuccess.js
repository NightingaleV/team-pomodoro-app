// External imports
import React, { Fragment } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
// Internal imports
import { Link } from '../components/atoms';
import { TopNavigation, PomodoroTimer } from '../components/organisms';
import { TopNavigationBase } from '../components/organisms/TopNavigation';

function SignUpSuccessBase(props) {
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
                    Your account has been successfully created. Please{' '}
                  </span>
                  <Link
                    to={
                      props.location.state
                        ? {
                            pathname: '/login',
                            state: {
                              email: props.location.state.email,
                            },
                          }
                        : '/login'
                    }
                    className={'orange-text lighten-4'}
                  >
                    continue to sign-in
                  </Link>
                </p>
              </div>
            </div>
            <div className="card-action right-align">
              <Link
                to={
                  props.location.state
                    ? {
                        pathname: '/login',
                        state: {
                          email: props.location.state.email,
                        },
                      }
                    : '/login'
                }
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export const SignUpSuccess = withRouter(SignUpSuccessBase);
