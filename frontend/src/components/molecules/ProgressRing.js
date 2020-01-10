// External imports
import React, { Fragment, useEffect, useState } from 'react';
// Internal imports
import { Button } from '../atoms';
import { useAuth } from '../../utils/useAuth';
import { TopNavigation } from '../organisms';
import { SignUpSuccess } from '../../templates';
import M from 'materialize-css';
import { useTimer } from '../providers/TimerProvider';

export function ProgressRing(props) {
  const { timer, timerAction } = useTimer();
  // const { radius, stroke } = props;

  // Height & Width
  const RADIUS = 150;
  // Thickness
  const STROKE = 13;
  //----------------------------------------------------------------------------
  // Calculated Properties
  //----------------------------------------------------------------------------
  const normalizedRadius = RADIUS - STROKE * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  let strokeDashoffset =
    circumference - (timer.progressBar / 100) * circumference;

  //----------------------------------------------------------------------------
  // Set Color of Ring
  //----------------------------------------------------------------------------
  const typeOfTimer = timer.settings.type;
  let color = 'blue';
  if (typeOfTimer === 1) color = '#ffca28';
  if (typeOfTimer === 2) color = '#66bb6a';
  if (typeOfTimer === 3) color = '#5c6bc0';

  return (
    <>
      <svg height={RADIUS * 2} width={RADIUS * 2}>
        <circle
          stroke="#E8E8E8"
          fill="transparent"
          strokeWidth={STROKE}
          r={normalizedRadius}
          cx={RADIUS}
          cy={RADIUS}
        ></circle>
        <circle
          stroke={color}
          fill="transparent"
          className={'pomodoroCircle'}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeWidth={STROKE}
          r={normalizedRadius}
          cx={RADIUS}
          cy={RADIUS}
        ></circle>
      </svg>
    </>
  );
}
