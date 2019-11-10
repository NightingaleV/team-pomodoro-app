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
      <div className="container">
        <div className="col s12">
          <PomodoroCycle />
        </div>
      </div>
    </Fragment>
  );
}
