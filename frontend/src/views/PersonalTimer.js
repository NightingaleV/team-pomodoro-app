// External imports
import React, { Fragment } from 'react';
// Internal imports
import { TopNavigation, PomodoroTimer } from '../components/organisms';

export function PersonalTimer({ children }) {
  return (
    <Fragment>
      <TopNavigation></TopNavigation>

      <div className="container">
        <div className="col s12">
          <PomodoroTimer></PomodoroTimer>
        </div>
      </div>
    </Fragment>
  );
}
