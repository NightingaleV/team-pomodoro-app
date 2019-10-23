// External imports
import React from 'react';
import { Route, Switch } from 'react-router-dom';
// Internal imports
import { LandingPage } from './views/LandingPage';
import { PersonalTimer } from './views/PersonalTimer';
import { SignUp } from './views/SignUp';

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={LandingPage} />
      {/*<Route path="/login" component={null} />*/}
      <Route path="/register" component={SignUp} />
      <Route path="/timer" exact component={PersonalTimer} />
    </Switch>
  );
}
