// External imports
import React, { useEffect, useRef, useState, useMemo, a } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';
// Internal imports
import { Preloader } from '../atoms';
import { TimerControls, ProgressRing } from '../molecules';
import { convertMinToSec, formatTime } from '../../utils/pomodoroUtils';
import { useTimer } from '../providers/TimerProvider';
import { useApi } from '../../utils/useApi';
import { useAuth } from '../../utils/useAuth';
import { usePromise } from '../../utils/usePromise';
import { TopNavigationBase } from './TopNavigation';

export function PomodoroTimerBase(props) {
  const { timer, timerAction } = useTimer();
  const api = useApi();
  const auth = useAuth();
  const { user, token } = useAuth();
  // Reference for interval
  let timerRef = useRef();

  // Props
  const {
    currentSettings,
    pomodoroCycles,
    initNextTimerInRow,
    reinitiateCurrentTimer,
    dropdownControlHandlers,
  } = props;

  // Component State
  //----------------------------------------------------------------------------
  // const [timerState, setTimerState] = useState({
  //   timerID: '',
  //   remTime: convertMinToSec(25),
  //   isRunning: false,
  //   settings: { type: 1, name: 'Work', totTime: convertMinToSec(25) },
  //   progressBar: 100,
  //   indexInCycle: 3,
  // });
  //
  // const timerContext = useMemo(() => ({ timerState, setTimerState }), [
  //   timerState,
  //   setTimerState,
  // ]);
  //
  // // let [timer, setTimer] = useState(null);
  //
  // // Request Functions
  // //----------------------------------------------------------------------------
  // // Get Last Timer
  // async function fetchTimerData() {
  //   const config = {
  //     headers: {
  //       'x-auth-token': token,
  //     },
  //     timeout: 5000,
  //   };
  //   await axios
  //     .get('api/timer', config)
  //     .then(res => {
  //       if (res.data) {
  //         const { remTime, isRunning, settings, _id, indexInCycle } = res.data;
  //
  //         setTimerState(prevState => {
  //           return {
  //             ...prevState,
  //             timerID: _id,
  //             remTime: remTime,
  //             settings: settings,
  //             isRunning: isRunning,
  //             indexInCycle: indexInCycle,
  //           };
  //         });
  //         if (isRunning) {
  //           startTimer();
  //         }
  //       }
  //       // If there is no timer
  //       else {
  //         sendNewTimerData(timerState);
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
  // // Update current timer
  // async function updateTimerData(state) {
  //   if (state.timerID) {
  //     const requestConfig = {
  //       headers: {
  //         'x-auth-token': token,
  //         'Content-Type': 'application/json',
  //       },
  //       timeout: 5000,
  //     };
  //     const timerToUpdate = {
  //       timerID: state.timerID,
  //       remTime: state.remTime,
  //       settings: state.settings,
  //       isRunning: state.isRunning,
  //       indexInCycle: state.indexInCycle,
  //     };
  //     const body = JSON.stringify(timerToUpdate);
  //     await axios.post('api/timer/update', body, requestConfig).then(res => {
  //       console.log('From DB', res.data);
  //     });
  //   }
  // }
  //
  // async function sendNewTimerData(state) {
  //   if (!state.timerID) {
  //     const requestConfig = {
  //       headers: {
  //         'x-auth-token': token,
  //         'Content-Type': 'application/json',
  //       },
  //       timeout: 5000,
  //     };
  //     const newTimer = {
  //       remTime: state.remTime,
  //       settings: state.settings,
  //       isRunning: state.isRunning,
  //       indexInCycle: state.indexInCycle,
  //     };
  //     const body = JSON.stringify(newTimer);
  //     await axios.post('api/timer/save', body, requestConfig).then(res => {
  //       const { _id } = res.data.timer;
  //
  //       setTimerState(prevState => {
  //         return {
  //           ...prevState,
  //           timerID: _id,
  //         };
  //       });
  //     });
  //   }
  // }
  //
  // // Component Lifecycle
  // //----------------------------------------------------------------------------
  // const [timerLoadingState, dispatchTimerLoading] = usePromise({
  //   isLoading: false,
  // });
  // const [isMounted, setIsMounted] = useState(false);
  // useEffect(() => {
  //   setIsMounted(true);
  //   if (user) {
  //     dispatchTimerLoading(fetchTimerData);
  //   }
  //
  //   if (!timerState.isRunning & !timerState.timerID) {
  //     initNextTimerInRow();
  //   }
  //   return function cleanup() {
  //     // cleanup after going to another site
  //     console.log('CleanUp: PersonalTimer');
  //     setIsMounted(false);
  //     pauseTimer();
  //   };
  // }, []);
  //
  // useEffect(() => {
  //   if (isMounted) {
  //     console.log('Updating Timer');
  //     updateTimerData(timerState);
  //   }
  // }, [timerState.isRunning]);
  //
  // useEffect(() => {
  //   if (currentSettings) {
  //     setTimerSettings(currentSettings);
  //     setRemTime(currentSettings.totTime);
  //   }
  // }, [currentSettings]);
  //
  // useEffect(() => {
  //   if (isMounted) {
  //     updateTimerData(timerState);
  //   }
  // }, [timerState.settings]);
  //
  // useEffect(() => {
  //   if (isMounted) {
  //     updateTimer(null);
  //   }
  //   // cleanup after going to another site
  //   return function cleanup() {
  //     // cleanup after going to another site
  //     console.log('CleanUp: PersonalTimer');
  //     pauseTimer();
  //   };
  // }, [props.history.location]);
  //
  // useEffect(() => {
  //   if (isMounted) {
  //     updateProgressBar();
  //     // Post Timer to db every 10 sec
  //     const sendEveryNumOfSec = 5;
  //     if (
  //       timerState.isRunning &
  //       (timerState.remTime % sendEveryNumOfSec === 0)
  //     ) {
  //       updateTimerData(timerState);
  //     }
  //   }
  // }, [timerState.remTime]);
  //
  // useEffect(() => {}, [timerState]);
  //
  // // Tick - Run every second
  // function tick() {
  //   subtractSeconds();
  // }
  //
  // // SETTERS State Updating Function
  // //----------------------------------------------------------------------------
  // function subtractSeconds() {
  //   setTimerState(prevState => {
  //     return {
  //       ...prevState,
  //       remTime: prevState.remTime - 1,
  //     };
  //   });
  // }
  //
  // // Calculate Progress for Circle
  // function updateProgressBar() {
  //   //Round to 2 digits
  //   let progressBar =
  //     Math.round((timerState.remTime / timerState.settings.totTime) * 10000) /
  //     100;
  //
  //   setTimerState(prevState => {
  //     return {
  //       ...prevState,
  //       progressBar: progressBar,
  //     };
  //   });
  // }
  // // wrap for timer state
  // function updateTimer(value) {
  //   timerRef.current = value;
  //   setTimer(timerRef.current);
  // }
  //
  // function setTimerRunning(isRunning = false) {
  //   setTimerState(prevState => {
  //     return {
  //       ...prevState,
  //       isRunning: isRunning,
  //     };
  //   });
  // }
  //
  // function setTimerSettings(newSettings) {
  //   setTimerState(prevState => {
  //     return {
  //       ...prevState,
  //       settings: newSettings,
  //     };
  //   });
  // }
  //
  // function setRemTime(numOfSec) {
  //   setTimerState(prevState => {
  //     return {
  //       ...prevState,
  //       remTime: numOfSec,
  //     };
  //   });
  // }
  // // TIMER CONTROLS
  // //----------------------------------------------------------------------------
  // function startTimer() {
  //   updateTimer(
  //     setInterval(() => {
  //       tick();
  //     }, 1000),
  //   );
  //   setTimerRunning(true);
  // }
  //
  // function pauseTimer() {
  //   if (timer) {
  //     updateTimer(clearInterval(timer));
  //     if (isMounted) {
  //       setTimerRunning(false);
  //     }
  //   }
  // }
  //
  // function nextTimer() {
  //   pauseTimer();
  //   initNextTimerInRow();
  // }
  //
  // function restartTimer() {
  //   pauseTimer();
  //   reinitiateCurrentTimer();
  // }

  const PersonalTimerHtml = (
    <div style={{ textAlign: 'center' }}>
      <div>
        <h3>
          <span>You are doing </span>
          {(currentSettings && currentSettings.name) || 'Nothing'}
        </h3>
      </div>
      <div className="circle-container">
        <ProgressRing />
        <div className="circle-countdown" style={{ fontSize: '65px' }}>
          <span>{formatTime(timer.remTime)}</span>
        </div>
        <div className="circle-controls flexbox">
          <TimerControls />
        </div>
      </div>
    </div>
  );

  return <Preloader isLoading={false}>{PersonalTimerHtml}</Preloader>;
}

export const PomodoroTimer = withRouter(PomodoroTimerBase);
