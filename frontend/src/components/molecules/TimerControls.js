// External imports
import React, { Fragment } from 'react';
// Internal imports
import { Button } from '../atoms';

export function TimerControls(props) {
  let CTA = 'Call to Action';
  const { isRunning, handleClick, type, children } = props;
  if (type === 1) CTA = '';
  if (type === 2) CTA = '';
  if (type === 3) CTA = '';
  if (isRunning) {
    return (
      <Fragment>
        <Button shape={'bigBtn'} actionButton={'stop'} onClick={handleClick}>
          {children}
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
