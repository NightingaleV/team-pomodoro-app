import React from "react";
import { Route, Switch } from "react-router-dom";
import { LandingPage } from "./views/LandingPage";
import { PersonalTimer } from "./views/PersonalTimer";

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={LandingPage} />
      {/*<Route path="/login" component={null} />*/}
      {/*<Route path="/register" component={null} />*/}
      <Route path="/timer" exact component={PersonalTimer} />
    </Switch>
  );
}
