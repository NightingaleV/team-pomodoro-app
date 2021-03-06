import React, { useState, useEffect } from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import axios from 'axios';
import { PomodoroGroup } from '../components/organisms';
import { useAuth } from '../utils/useAuth';
import { Preloader, ErrorBox } from '../components/atoms';
import { usePromise } from '../utils/usePromise';

export function GroupDetailBase(props) {
  const { user, token } = useAuth();
  const [group, setGroup] = useState({ name: '', userIDs: [] });
  const [error, setError] = useState('');
  let location = useLocation();

  const [groupLoadingState, dispatchGroupLoading] = usePromise({
    isLoading: false,
  });

  const requestConfig = {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
    timeout: 5000,
  };
  function getGroupIdentifier(props) {
    const url = location.pathname;
    const urlList = url.split('/');
    const groupName = urlList[urlList.length - 1];
    return groupName;
  }

  useEffect(() => {
    setError('');
    dispatchGroupLoading(fetchGroupByUrlId);
    let subscriptionToGroup = null;
    if (user) {
      subscriptionToGroup = setInterval(() => {
        fetchGroupByUrlId();
      }, 5000);
    }

    return () => {
      clearInterval(subscriptionToGroup);
    };
  }, [location.pathname, dispatchGroupLoading, user]);

  useEffect(() => {}, []);

  async function fetchGroupByUrlId() {
    try {
      await axios
        .get('/api/group/' + getGroupIdentifier(), requestConfig)
        .then(res => {
          setGroup(res.data.group);
        })
        .catch(err => {
          if (err.response.status === 403 || err.response.status === 401) {
            setError('You are prohibited to view the group');
          }
        });
    } catch {}
  }

  return (
    <>
      <div className="group-container">
        <Preloader isLoading={groupLoadingState.isLoading}>
          {error && <ErrorBox errorMsg={error}></ErrorBox>}
          {!error && (
            <>
              <PomodoroGroup group={group} refetchGroup={fetchGroupByUrlId} />
            </>
          )}
        </Preloader>
      </div>
    </>
  );
}

export const GroupDetail = withRouter(GroupDetailBase);
