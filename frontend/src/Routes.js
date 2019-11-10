// External imports
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// Internal imports
import {
  LandingPage,
  PersonalTimer,
  SignIn,
  SignUp,
  RegistrationComplete,
  GroupDetail,
} from './views';
import { ProtectedRoute } from './components/ProtectedRoutes';

export function Routes() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/timer" />} />
      <Route exact path="/timer" component={PersonalTimer} />
      <Route path="/login" component={SignIn} />
      {/*<ProtectedRoute*/}
      {/*  exact*/}
      {/*  path="/protected"*/}
      {/*  component={RegistrationComplete}*/}
      {/*/>*/}
      <Route exact path="/register" component={SignUp} />
      <Route exact path="/register/success" component={RegistrationComplete} />
      <Route path="/group" component={GroupDetail} />
    </Switch>
  );
}
