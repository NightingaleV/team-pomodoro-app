// External imports
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// Internal imports
import './App.scss';
// Custom Hooks
import { AuthProvider } from './utils/useAuth';
import { TimerProvider } from './components/providers';
import { Routes } from './Routes';
import { Container } from './views/Container';

function AllProviders({ children }) {
  return (
    <AuthProvider>
      <TimerProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </TimerProvider>
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
