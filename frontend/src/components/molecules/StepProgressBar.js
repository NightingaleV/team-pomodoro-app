import React from 'react';
import 'react-step-progress-bar/styles.css';
import { ProgressBar, Step } from 'react-step-progress-bar';
import classNames from 'classnames';

export function StepProgressBar(props) {
  const { typeOfTimer, indexInCycle } = props;
  //----------------------------------------------------------------------------
  // Type Of Timer
  //----------------------------------------------------------------------------
  const numTimersInPomodoroCycle = 8;
  const oneStepWidth = 100 / (numTimersInPomodoroCycle - 1);

  let fill = 0;
  // if (typeOfTimer === 1) fill = 0;
  // if (typeOfTimer === 2) fill = 50;
  // if (typeOfTimer === 3) fill = 100;

  for (
    let timerIndex = numTimersInPomodoroCycle;
    timerIndex >= 0;
    timerIndex--
  ) {
    console.log(timerIndex);
    if (indexInCycle % timerIndex === 0) {
      console.log('Timer index is', timerIndex);
      fill = oneStepWidth * (timerIndex - 1);
      break;
    }
  }

  //----------------------------------------------------------------------------
  // Timer Index
  //----------------------------------------------------------------------------
  let timerIndex = 0;
  if (indexInCycle % 8 === 0) timerIndex = 8; // this is last timer in pomodoro
  if (indexInCycle % 7 === 0) timerIndex = 7; // this is 7. timer in cycle
  // Set classes for Coloring the rings
  const colorPomodoroClass = '';
  const colorSBreakClass = 'green lighten-1';
  const colorLBreakClass = 'indigo lighten-1';

  return (
    <>
      <div className="step-progressbar">
        <ProgressBar percent={fill}>
          <Step>
            {({ accomplished, index }) => (
              <div
                className={classNames('indexedStep', {
                  accomplished: accomplished,
                  [`${colorPomodoroClass}`]: accomplished,
                })}
              >
                {(index = '')}
              </div>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <div
                className={classNames('indexedStep', {
                  accomplished: accomplished,
                  [`${colorSBreakClass}`]: accomplished,
                })}
              >
                {(index = '5')}
              </div>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <div
                className={classNames('indexedStep', {
                  accomplished: accomplished,
                  [`${colorPomodoroClass}`]: accomplished,
                })}
              >
                {(index = '')}
              </div>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <div
                className={classNames('indexedStep', {
                  accomplished: accomplished,
                  [`${colorSBreakClass}`]: accomplished,
                })}
              >
                {(index = '5')}
              </div>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <div
                className={classNames('indexedStep', {
                  accomplished: accomplished,
                  [`${colorPomodoroClass}`]: accomplished,
                })}
              >
                {(index = '')}
              </div>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <div
                className={classNames('indexedStep', {
                  accomplished: accomplished,
                  [`${colorSBreakClass}`]: accomplished,
                })}
              >
                {(index = '5')}
              </div>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <div
                className={classNames('indexedStep', {
                  accomplished: accomplished,
                  [`${colorPomodoroClass}`]: accomplished,
                })}
              >
                {(index = '')}
              </div>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <div
                className={classNames('indexedStep', {
                  accomplished: accomplished,
                  [`${colorLBreakClass}`]: accomplished,
                })}
              >
                {(index = '15')}
              </div>
            )}
          </Step>
        </ProgressBar>
      </div>
    </>
  );
}
