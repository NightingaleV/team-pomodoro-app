// External imports
import React, { Fragment, useEffect, useState, useRef } from 'react';
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

export function PublicPageBase(props) {
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

  const [publicUser, setPublicUser] = useState({
    email: '',
    name: '',
    avatar: '',
    timerID: helpTimer,
  });

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

  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();
    setCopySuccess('Copied!');
  }

  return (
    <>
      <div className="group">
        <Preloader isLoading={userLoadingState.isLoading}>
          <div className="row group-title-wrapper">
            <div className="group-title-bar card-panel">
              <h3>Public Page</h3>
              <div className="copy-container">
                <div class="file-field input-field clipboard">
                  <button
                    class="btn waves-effect waves-light amber"
                    onClick={copyToClipboard}
                  >
                    <span>Copy</span>
                  </button>
                  <div className="copy-alert">{copySuccess}</div>
                  <div class="file-path-wrapper">
                    <textarea class="materialize-textarea" ref={textAreaRef}>
                      {window.location.href}
                    </textarea>
                  </div>
                </div>
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
