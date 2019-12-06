// External imports
import React, { Fragment, useEffect, useState } from 'react';
// Internal imports
import { formatTime } from '../../utils/pomodoroUtils';
import { useTimer } from '../providers/TimerProvider';

export function DynamicTitle(props) {
  const { timer, timerAction } = useTimer();
  useEffect(() => {
    const currentTimer = timer.settings.name;
    const docTitle = currentTimer.concat(
      ' | ',
      formatTime(timer.remTime),
      ' - Team Pomodoro',
    );
    document.title = docTitle;
  }, [timer.remTime]);

  return <Fragment></Fragment>;
}
