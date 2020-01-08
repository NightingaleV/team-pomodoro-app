// External imports
import React, { Fragment, useEffect, useState } from 'react';
import { withRouter, Redirect, useLocation } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames';
// Internal imports
// import { Button } from '../atoms/Button';
import { UserCard } from '../components/molecules/UserCard';
import { useAuth } from '../utils/useAuth';
import M from 'materialize-css';
import { convertMinToSec } from '../utils/pomodoroUtils';
import { Preloader, ErrorBox, Button, Link } from '../components/atoms';
import { usePromise } from '../utils/usePromise';

export function PublicPageBase(props){
  const { user, token } = useAuth();

  const helpTimer = {
    timerID: '',
    remTime: convertMinToSec(25),
    isRunning: false,
    settings: { type: 1, name: 'Work', totTime: convertMinToSec(25) },
    progressBar: 100,
    indexInCycle: 1,
    isMounted: true,
  };

  const [publicUser, setPublicUser] = useState({ email: '', name: '', avatar: '', timerID: helpTimer });

  const [error, setError] = useState('');
  let location = useLocation();  

  const [userLoadingState, dispatchUserLoading] = usePromise({
    isLoading: false,
  });

  const requestConfig = {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
    timeout: 5000,
  };

  function getUserIdentifier(props) {
    const url = location.pathname;
    const urlList = url.split('/');
    const userID = urlList[urlList.length - 1];
    return userID;
  }

  useEffect(() => {
    setError('');
    // fetchUserByUrlId();
    dispatchUserLoading(fetchUserByUrlId);
    let subscriptionToUser = null;
    // if (user) {
      subscriptionToUser = setInterval(() => {
        fetchUserByUrlId();
      }, 5000);
    // }

    return () => {
      console.log('CleanUp: PublicPage');
      clearInterval(subscriptionToUser);
    };
  }, [location.pathname]);

  async function fetchUserByUrlId() {
    try {
      await axios
        .get('/api/user/get/' + getUserIdentifier(), requestConfig)
        .then(res => {
          // console.log('Fetched Group Data: ', res.data.group);
          setPublicUser(res.data.user);
          console.log('User', res.data.user);
        })
        .catch(err => {
          setError(err);
          console.error(err);
        });
    } catch {}
  }  

  return (
    <>
      <div className="group">
      <Preloader isLoading={userLoadingState.isLoading}>
        <div className="row group-title-wrapper">
          <div className="group-title-bar">
            <div className="">              
                    {/* <h3 className="group-title">{publicUser.email}</h3> */}                    
                    {/* <p>{window.location.href}</p> */}
                    <span>Public page link: </span>
                    <a href={window.location.href}>{window.location.href}</a>
              </div>
            </div>
        </div>
        <div className="row members">         
            <div className="member col">
                <UserCard member={publicUser} />
            </div>
        </div>        
        </Preloader>
      </div>
    </>
  );
}

export const PublicPage = withRouter(PublicPageBase);