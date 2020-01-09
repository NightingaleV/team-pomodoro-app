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
    <div className="pomodoro-container">
      <div className="card-panel">
        <div className="circle-container">
          <StepProgressBar
            typeOfTimer={timer.settings.type}
            indexInCycle={timer.indexInCycle}
          />
          <ProgressRing />
          <div className="circle-countdown" style={{ fontSize: '65px' }}>
            <span>{formatTime(timer.remTime)}</span>
          </div>
          <div className="circle-controls flexbox">
            <TimerControls />
          </div>
        </div>
      </div>
    </div>
  );

  return <Preloader isLoading={false}>{PersonalTimerHtml}</Preloader>;
}

export const PomodoroTimer = withRouter(PomodoroTimerBase);
