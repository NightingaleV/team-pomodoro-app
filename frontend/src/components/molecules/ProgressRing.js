// External imports
import React, { Fragment, useEffect, useState } from 'react';
// Internal imports
import { Button } from '../atoms';
import { useAuth } from '../../utils/useAuth';
import { TopNavigation } from '../organisms';
import { SignUpSuccess } from '../../templates';
import M from 'materialize-css';

export function ProgressRing(props) {
  const { radius, stroke, typeOfTimer } = props;

  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  let strokeDashoffset = circumference - (props.progress / 100) * circumference;

  // const [progressProperties, setProgressProperties] = useState({
  //   normalizedRadius: radius - stroke * 2,
  //   circumference: () => {
  //     normalizedRadius * 2 * Math.PI;
  //   },
  // });
  let color = 'blue';
  if (typeOfTimer === 1) color = '#ffa000';
  if (typeOfTimer === 2) color = '#43a047';
  if (typeOfTimer === 3) color = '#3949ab';

  return (
    <Fragment>
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#E8E8E8"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        ></circle>
        <circle
          stroke={color}
          fill="transparent"
          className={'pomodoroCircle'}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        ></circle>
      </svg>
    </Fragment>
  );
}
