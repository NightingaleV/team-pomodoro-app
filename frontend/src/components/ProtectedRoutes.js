import React, { Component, useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../utils/useAuth';

export function ProtectedRoute({ component: Component, ...rest }) {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, signout } = useAuth();

  function protectComponent(props) {}

  return (
    <Route
      {...rest}
      render={props => {
        if (user) {
          console.log('Valid User');
          return <Component {...props} />;
        } else {
          console.log('InValid User');
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {},
              }}
            />
          );
        }
      }}
    />
  );
}
