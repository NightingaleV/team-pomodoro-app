// External imports
import React, { Fragment } from 'react';
// Internal imports
import { Button } from '../atoms';

export function TimerControls(props) {
  let CTA = 'Call to Action';
  const { isRunning, handleClick, type, children } = props;
  if (type === 1) CTA = 'Begin work';
  if (type === 2) CTA = 'Take a break';
  if (type === 3) CTA = 'Take a long break';
  if (isRunning) {
    return (
      <Fragment>
        <Button shape={'bigBtn'} actionButton={'stop'} onClick={handleClick}>
          Finish {children}
        </Button>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Button shape={'bigBtn'} actionButton={'play'} onClick={handleClick}>
          {CTA} {children}
        </Button>
      </Fragment>
    );
  }
}
