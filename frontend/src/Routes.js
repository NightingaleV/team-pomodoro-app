import React from "react";
import { Route, Switch } from "react-router-dom";
import { LandingPage } from "./views/LandingPage";

export function Routes() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={null} />
      <Route path="/register" component={null} />
      <Route path="/timer" component={null} />
    </Switch>
  );
}
