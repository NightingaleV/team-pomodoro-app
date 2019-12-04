import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useReducer,
  useRef,
} from 'react';
import { convertMinToSec } from '../../utils/pomodoroUtils';
import { useAuth } from '../../utils/useAuth';
import { TimerReducer } from '../reducers';
import axios from 'axios';

const initialState = {
  timerID: '',
  remTime: convertMinToSec(25),
  isRunning: false,
  settings: { type: 1, name: 'Work', totTime: convertMinToSec(25) },
  progressBar: 100,
  indexInCycle: 3,
  isMounted: true,
};

export function TimerProvider({ children }) {
  const { token } = useAuth();
  //----------------------------------------------------------------------------
  // Component State
  //----------------------------------------------------------------------------
  // Timer Properties
  const [timerState, setTimerState] = useState(initialState);
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
const TimerContext = createContext(createContextValue({ timer: initialState }));
function createContextValue(props) {
  const { timer, setTimerState, timerReference } = props;
  return {
    timer,
    timerAction: TimerReducer({ timer, setTimerState, timerReference }),
  };
}
// function to provide Timer across Components
export function useTimer() {
  return useContext(TimerContext);
}
