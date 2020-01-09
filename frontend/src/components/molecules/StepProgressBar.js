import React from 'react';
import 'react-step-progress-bar/styles.css';
import { ProgressBar, Step } from 'react-step-progress-bar';
import classNames from 'classnames';

export function StepProgressBar(props) {
  const { indexInCycle } = props;
  //----------------------------------------------------------------------------
  // Manipulate with width of bar
  //----------------------------------------------------------------------------
  const numTimersInPomodoroCycle = 8;
  const oneStepWidth = 100 / (numTimersInPomodoroCycle - 1);

  // Bar width from 0 to 100
  let fill = 0;
  for (
    let timerIndex = numTimersInPomodoroCycle;
    timerIndex >= 0;
    timerIndex--
  ) {
    if (indexInCycle % timerIndex === 0) {
      fill = oneStepWidth * (timerIndex - 1);
      break;
    }
  }

  //----------------------------------------------------------------------------
  // Timer Index
  //----------------------------------------------------------------------------
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
