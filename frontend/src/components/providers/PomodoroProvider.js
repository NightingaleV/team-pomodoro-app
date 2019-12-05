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
import { PomodoroReducer } from '../reducers';
import axios from 'axios';

// DEFAULTS
//----------------------------------------------------------------------------
const POMODORO_SETTINGS = {
  pomodoro: { type: 1, name: 'Work', totTime: convertMinToSec(25) },
  shortBreak: { type: 2, name: 'Short Break', totTime: convertMinToSec(5) },
  longBreak: { type: 3, name: 'Long Break', totTime: convertMinToSec(15) },
};

export function PomodoroProvider({ children }) {
  const { token } = useAuth();
  //----------------------------------------------------------------------------
  // Component State
  //----------------------------------------------------------------------------
  function initState() {
    return [POMODORO_SETTINGS.pomodoro];
  }

  let [pomodoroState, setPomodoroState] = useState(initState());

  //----------------------------------------------------------------------------
  // Set and provide context
  //----------------------------------------------------------------------------
  // Data to propagate across reducers and components
  const pomodoroContextData = {
    pomodoroState: pomodoroState,
    setPomodoroState: setPomodoroState,
  };
  // Send data to context
  const contextValue = useMemo(() => {
    return createContextValue(pomodoroContextData);
  }, [pomodoroContextData]);

  return (
    <PomodoroContext.Provider value={contextValue}>
      {children}
    </PomodoroContext.Provider>
  );
}

//------------------------------------------------------------------------------
// CREATE THE CONTEXT
//------------------------------------------------------------------------------
// Initiate Timer Context
const PomodoroContext = createContext(
  createContextValue({ pomodoroState: [] }),
);
function createContextValue(props) {
  const { pomodoroState, setPomodoroState } = props;
  return {
    pomodoroState,
    pomodoroAction: PomodoroReducer({ pomodoroState, setPomodoroState }),
  };
}
// function to provide Timer across Components
export function usePomodoro() {
  return useContext(PomodoroContext);
}
