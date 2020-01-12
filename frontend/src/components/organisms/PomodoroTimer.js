// External imports
import React from 'react';
import { withRouter } from 'react-router-dom';
// Internal imports
import { Preloader } from '../atoms';
import { TimerControls, ProgressRing, StepProgressBar } from '../molecules';
import { formatTime } from '../../utils/pomodoroUtils';
import { useTimer } from '../providers/TimerProvider';

export function PomodoroTimerBase(props) {
  const { timer } = useTimer();

  const PersonalTimerHtml = (
    <div className="container">
      <div className="timer-container card-panel">
        <div className="timer-progress">
          <StepProgressBar
            typeOfTimer={timer.settings.type}
            indexInCycle={timer.indexInCycle}
          />
        </div>
        <div className="timer-circle">
          <ProgressRing />
        </div>
        <div className="timer-controls">
          <TimerControls />
        </div>
      </div>
    </div>
  );

  return <Preloader isLoading={false}>{PersonalTimerHtml}</Preloader>;
}

export const PomodoroTimer = withRouter(PomodoroTimerBase);
