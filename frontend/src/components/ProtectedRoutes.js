import React, { Component, useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import axios from 'axios';

export function ProtectedRoute({ component: Component, ...rest }) {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  let isAuthenticated = false;
  const authenticate = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'x-auth-token': token,
      },
      withCredentials: true,
    };
    const res = await axios.get('/api/user/', config);
    if (res.data.user) {
      isAuthenticated = true;
    }
  };
  useEffect(() => {
    authenticate();
    console.log(isAuthenticated);
  }, []);

  function protectComponent(props) {}

  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated) {
          console.log('Valid');
          return <Component {...props} />;
        } else {
          console.log('InValid');
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

  // return (
  //   <Route
  //     {...rest}
  //     render={props => {
  //       if (isAuthenticated) {
  //         console.log('Valid');
  //         return <Component {...props} />;
  //       } else {
  //         console.log('InValid');
  //         return (
  //           <Redirect
  //             to={{
  //               pathname: '/login',
  //               state: {
  //                 from: props.location,
  //               },
  //             }}
  //           />
  //         );
  //       }
  //     }}
  //   />
  // );
}
