//----------------------------------------------------------------------------
// Timer State Control functions
//----------------------------------------------------------------------------

import axios from 'axios';

export function TimerDispatcher(token) {
  const requestConfig = {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
    timeout: 5000,
  };

  async function fetchTimerData() {
    const timerDataRes = await axios
      .get('api/timer', requestConfig)
      .catch(err => {
        console.log(err);
      });
    if (timerDataRes) {
      return timerDataRes.data;
    } else {
      // sendNewTimerData(timerState);
      return null;
    }
  }

  async function sendNewTimerData(state) {
    if (!state.timerID) {
      const newTimer = {
        remTime: state.remTime,
        settings: state.settings,
        isRunning: state.isRunning,
        indexInCycle: state.indexInCycle,
      };
      const body = JSON.stringify(newTimer);
      await axios.post('api/timer/save', body, requestConfig).then(res => {
        return res.data.timer;
      });
    }
  }

  // Update current timer
  async function updateTimerData(state) {
    if (state.timerID) {
      const timerToUpdate = {
        timerID: state.timerID,
        remTime: state.remTime,
        settings: state.settings,
        isRunning: state.isRunning,
        indexInCycle: state.indexInCycle,
      };
      const body = JSON.stringify(timerToUpdate);
      await axios.post('api/timer/update', body, requestConfig).then(res => {
        console.log('From DB', res.data);
      });
    }
  }
  return { fetchTimerData, sendNewTimerData, updateTimerData };
}
