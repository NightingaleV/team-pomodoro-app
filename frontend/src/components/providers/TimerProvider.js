import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useRef,
} from 'react';
import { convertMinToSec } from '../../utils/pomodoroUtils';
import { useAuth } from '../../utils/useAuth';
import { TimerReducer } from '../reducers';

const initialTimerState = {
  timerID: '',
  remTime: convertMinToSec(25),
  isRunning: false,
  settings: { type: 1, name: 'Work', totTime: convertMinToSec(25) },
  progressBar: 100,
  indexInCycle: 1,
  isMounted: true,
};

export function TimerProvider({ children }) {
  const { token } = useAuth();

  //----------------------------------------------------------------------------
  // Component State
  //----------------------------------------------------------------------------
  function setInitialState() {
    return initialTimerState;
  }
  // Timer Properties
  const [timerState, setTimerState] = useState(setInitialState());
  // Managing Running Timer
  let timerRef = useRef(null);
  let [timerRefState, setTimerRefState] = useState(null);

  //----------------------------------------------------------------------------
  // Set and provide context
  //----------------------------------------------------------------------------
  // Data to propagate across reducers and components
  const timerContextData = {
    timer: timerState,
    setTimerState: setTimerState,
    timerReference: { timerRef, timerRefState, setTimerRefState },
    token: token,
  };
  // Send data to context
  const contextValue = useMemo(() => {
    return createContextValue(timerContextData);
  }, [timerContextData]);

  return (
    <TimerContext.Provider value={contextValue}>
      {children}
    </TimerContext.Provider>
  );
}

//----------------------------------------------------------------------------
// CREATE THE CONTEXT
//----------------------------------------------------------------------------
// Initiate Timer Context
const TimerContext = createContext(createContextValue({ timer: {} }));
function createContextValue(timerContextData) {
  const { timer, setTimerState, timerReference } = timerContextData;
  return {
    timer,
    timerAction: TimerReducer(timerContextData),
  };
}
// function to provide Timer across Components
export function useTimer() {
  return useContext(TimerContext);
}
