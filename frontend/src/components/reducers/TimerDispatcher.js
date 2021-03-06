//----------------------------------------------------------------------------
// Timer State Control functions
//----------------------------------------------------------------------------
import axios from 'axios';

let axiosInstance = axios.create({
  baseURL: 'http://frontend.team02.vse.handson.pro',
});

export function TimerDispatcher(token) {
  const requestConfig = {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
    timeout: 5000,
  };

  async function fetchTimerData() {
    if (token) {
      const timerDataRes = await axiosInstance
        .get('/api/timer', requestConfig)
        .catch(err => {});
      if (timerDataRes) {
        return timerDataRes.data;
      } else {
        return null;
      }
    }
  }

  async function sendNewTimerData(state) {
    if (token) {
      const newTimer = {
        remTime: state.remTime,
        settings: state.settings,
        isRunning: state.isRunning,
        indexInCycle: state.indexInCycle,
      };
      const body = JSON.stringify(newTimer);

      const newTimerCreated = await axiosInstance.post(
        '/api/timer/save',
        body,
        requestConfig,
      );
      if (newTimerCreated) {
        return newTimerCreated.data;
      }
    }
  }

  // Update current timer
  async function updateTimerData(state) {
    if (token) {
      if (state.timerID) {
        const timerToUpdate = {
          timerID: state.timerID,
          remTime: state.remTime,
          settings: state.settings,
          isRunning: state.isRunning,
          indexInCycle: state.indexInCycle,
        };
        const body = JSON.stringify(timerToUpdate);
        await axiosInstance
          .post('api/timer/update', body, requestConfig)
          .then(res => {});
      }
    }
  }

  async function saveTimerLog(state) {
    if (token) {
      const timerLength = Math.abs(state.remTime - state.settings.totTime);
      const timerLogItem = {
        type: state.settings.type,
        length: timerLength,
        indexInCycle: state.indexInCycle,
      };
      const body = JSON.stringify(timerLogItem);

      const newTimerLogSaved = await axiosInstance.post(
        '/api/timer/saveLog',
        body,
        requestConfig,
      );
      if (newTimerLogSaved) {
        console.log(newTimerLogSaved);
      }
    }
  }

  return { fetchTimerData, sendNewTimerData, updateTimerData, saveTimerLog };
}
