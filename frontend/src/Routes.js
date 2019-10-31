// External imports
import React from 'react';
import { Route, Switch } from 'react-router-dom';
// Internal imports
import {
  LandingPage,
  PersonalTimer,
  SignUp,
  RegistrationComplete,
  GroupDetail,
  MainGroup,
} from './views';

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={LandingPage} />
      {/*<Route path="/login" component={null} />*/}
      <Route path="/register/success" component={RegistrationComplete} />
      <Route path="/register" component={SignUp} />
      <Route path="/timer" exact component={PersonalTimer} />
      <Route path="/group" component={GroupDetail} />
      <Route path="/MainGroup" component={MainGroup} />
    </Switch>
  );
}
