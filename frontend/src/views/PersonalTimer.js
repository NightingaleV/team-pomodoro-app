// External imports
import React, { Fragment } from 'react';
// Internal imports
import { TopNavigation, PomodoroTimer } from '../components/organisms';

export function PersonalTimer({ children }) {
  return (
    <Fragment>
      <PomodoroTimer></PomodoroTimer>
    </Fragment>
  );
}
