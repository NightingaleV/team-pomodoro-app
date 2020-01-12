// External imports
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// Internal imports
import {
  LandingPage,
  PersonalTimer,
  SignIn,
  SignUp,
  UserSettings,
  RegistrationComplete,
  GroupDetail,
  CreateGroupModal,
  Invitation,
  PublicPage,
  UserAnalytics,
} from './views';
import { ProtectedRoute } from './components/ProtectedRoutes';

export function Routes() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/timer" />} />
      <Route exact path="/timer" component={PersonalTimer} />
      <Route exact path="/analytics" component={UserAnalytics} />
      <Route path="/login" component={SignIn} />
      <Route exact path="/settings" component={UserSettings} />
      <Route exact path="/register" component={SignUp} />
      <Route exact path="/register/success" component={RegistrationComplete} />
      <Route path="/group/invitation" component={Invitation} />
      <Route path="/group" component={GroupDetail} />
      <Route pathh="/public" component={PublicPage} />
    </Switch>
  );
}
