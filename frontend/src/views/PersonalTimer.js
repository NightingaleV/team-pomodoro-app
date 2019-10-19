import React, { Fragment } from "react";
import { TopNavigation, PomodoroTimer } from "../components/organisms";

export function PersonalTimer({ children }) {
  return (
    <Fragment>
      <TopNavigation></TopNavigation>

      <div className="container">
        <div className="col s12">
          <div style={{ textAlign: "center" }}>
            <h1>Your personal Timer</h1>
          </div>
        </div>
        <div className="col s12">
          <PomodoroTimer></PomodoroTimer>
        </div>
      </div>
    </Fragment>
  );
}
