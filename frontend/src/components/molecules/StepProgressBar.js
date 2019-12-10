import React from 'react';
import 'react-step-progress-bar/styles.css';
import { ProgressBar, Step } from 'react-step-progress-bar';

export function StepProgressBar(props) {
  const { typeOfTimer, indexInCycle } = props;
  //----------------------------------------------------------------------------
  // Type Of Timer
  //----------------------------------------------------------------------------
  let fill = 0;
  if (typeOfTimer === 1) fill = 0;
  if (typeOfTimer === 2) fill = 15;
  if (typeOfTimer === 3) fill = 100;

  //----------------------------------------------------------------------------
  // Timer Index
  //----------------------------------------------------------------------------
  let timerIndex = 0;
  if (indexInCycle % 8 === 0) timerIndex = 8; // this is last timer in pomodoro
  if (indexInCycle % 7 === 0) timerIndex = 7; // this is 7. timer in cycle
  // etc

  return (
    <>
      <div className="step-progressbar">
        <ProgressBar percent={fill}>
          <Step>
            {({ accomplished, index }) => (
              <div
                className={`indexedStep ${
                  accomplished ? 'accomplished' : null
                }`}
              >
                {(index = '')}
              </div>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <div
                className={`indexedStep ${
                  accomplished ? 'accomplished' : null
                }`}
              >
                {(index = '5')}
              </div>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <div
                className={`indexedStep ${
                  accomplished ? 'accomplished' : null
                }`}
              >
                {(index = '')}
              </div>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <div
                className={`indexedStep ${
                  accomplished ? 'accomplished' : null
                }`}
              >
                {(index = '5')}
              </div>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <div
                className={`indexedStep ${
                  accomplished ? 'accomplished' : null
                }`}
              >
                {(index = '')}
              </div>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <div
                className={`indexedStep ${
                  accomplished ? 'accomplished' : null
                }`}
              >
                {(index = '5')}
              </div>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <div
                className={`indexedStep ${
                  accomplished ? 'accomplished' : null
                }`}
              >
                {(index = '')}
              </div>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <div
                className={`indexedStep ${
                  accomplished ? 'accomplished' : null
                }`}
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
