// External imports
import React, { Fragment } from 'react';
// Internal imports
import {
  TopNavigation,
  PomodoroTimer,
  PomodoroCycle,
} from '../components/organisms';

export function PersonalTimer({ children }) {
  return (
    <Fragment>
      <TopNavigation></TopNavigation>

      <div className="container">
        <div className="col s12">
          <PomodoroCycle></PomodoroCycle>
        </div>
      </div>
    </Fragment>
  );
}
