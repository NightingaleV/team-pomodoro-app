import React, { Fragment, useState, useEffect } from 'react';
import { withRouter, Redirect, useLocation } from 'react-router-dom';
import axios from 'axios';
import { PomodoroGroup } from '../components/organisms';
import { useAuth } from '../utils/useAuth';
import M from 'materialize-css';

//TODO RESTRICT GROUP IF USER NOT A MEMBER

// function RefreshOnTime({ timePeriod }) {
//   setTimeout('location.reload(true);', timePeriod);
//   return null;
// }

export function GroupDetailBase(props) {
  const { user, token } = useAuth();
  const [group, setGroup] = useState({ name: '', userIDs: [] });
  let location = useLocation();
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
    fetchGroupByUrlId();
    const subscriptionToGroup = setInterval(() => fetchGroupByUrlId(), 5000);

    return () => {
      console.log('CleanUp: GroupDetail');
      clearInterval(subscriptionToGroup);
    };
  }, [location.pathname]);

  useEffect(() => {
    //initialize parallax
    let options = {};
    let parallax_elements = document.querySelectorAll('.parallax');
    M.Parallax.init(parallax_elements, options);
    //Or use auto init instead
    //M.AutoInit();
  }, []);

  async function fetchGroupByUrlId() {
    await axios
      .get('/api/group/' + getGroupIdentifier(), requestConfig)
      .then(res => {
        console.log('Fetched Group Data: ', res.data.group);
        setGroup(res.data.group);
      })
      .catch(err => {
        console.error(err);
      });
  }
  return (
    <>
      <PomodoroGroup group={group} />
    </>
  );
}

export const GroupDetail = withRouter(GroupDetailBase);
