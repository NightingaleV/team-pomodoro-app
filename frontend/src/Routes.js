// External imports
import React from 'react';
import { Route, Switch } from 'react-router-dom';
// Internal imports
import {
  LandingPage,
  PersonalTimer,
  SignIn,
  SignUp,
  RegistrationComplete,
} from './views';
import { ProtectedRoute } from './components/ProtectedRoutes';

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/login" component={SignIn} />
      <ProtectedRoute
        exact
        path="/protected"
        component={RegistrationComplete}
      />
      <Route exact path="/register" component={SignUp} />
      <Route exact path="/register/success" component={RegistrationComplete} />
      <Route path="/timer" exact component={PersonalTimer} />
    </Switch>
  );
}
