// External imports
import React, { Fragment, useEffect, useState } from 'react';
// Internal imports
import { formatTime } from '../../utils/pomodoroUtils';
import { useTimer } from '../providers/TimerProvider';
import favPomodoro from '../../assets/favicon/favicon-pomodoro.ico';
import favShortBreak from '../../assets/favicon/favicon-short_brake.ico';
import favLongBreak from '../../assets/favicon/favicon-long_break.ico';

export function DynamicFavicon(props) {
  const { timer, timerAction } = useTimer();
  useEffect(() => {
    const currentTimer = timer.settings.type;
    const favicon = document.getElementById('favicon');
    if (timer.settings.type === 1) favicon.href = favPomodoro;
    if (timer.settings.type === 2) favicon.href = favShortBreak;
    if (timer.settings.type === 3) favicon.href = favLongBreak;
  }, [timer.settings]);

  return <Fragment></Fragment>;
}