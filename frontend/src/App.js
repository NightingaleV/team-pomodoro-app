// External imports
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// Internal imports
import './App.scss';
// Custom Hooks
import { ApiProvider } from './utils/useApi';
import { AuthProvider } from './utils/useAuth';
import { Routes } from './Routes';
import { Container } from './views/Container';

function AllProviders({ children }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}

function App() {
  return (
    <AuthProvider>
      <ApiProvider>
        <AllProviders>
          <Container>
            <Routes />
          </Container>
        </AllProviders>
      </ApiProvider>
    </AuthProvider>
  );
}

export default App;
