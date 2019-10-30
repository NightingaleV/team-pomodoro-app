// External imports
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// Internal imports
import './App.scss';
// Custom Hooks
import { ApiProvider } from './utils/useApi';
import { AuthProvider } from './utils/useAuth';
import { Routes } from './Routes';

function AllProviders({ children }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}

function App() {
  return (
    <AuthProvider>
      <ApiProvider>
        <AllProviders>
          <Routes />
        </AllProviders>
      </ApiProvider>
    </AuthProvider>
  );
}

export default App;
