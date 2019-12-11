// External imports
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// Internal imports
import './App.scss';
// Custom Hooks
import { ApiProvider } from './utils/useApi';
import { AuthProvider } from './utils/useAuth';
import { PomodoroProvider, TimerProvider } from './components/providers';
import { Routes } from './Routes';
import { Container } from './views/Container';

function AllProviders({ children }) {
  return (
    <AuthProvider>
      <ApiProvider>
        <TimerProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </TimerProvider>
      </ApiProvider>
    </AuthProvider>
  );
}

function App() {
  return (
    <AllProviders>
      <Container>
        <Routes />
      </Container>
    </AllProviders>
  );
}

export default App;
