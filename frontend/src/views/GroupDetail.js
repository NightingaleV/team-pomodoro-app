import React, { Fragment, useState, useEffect } from 'react';
import {
  PomodoroGroup,
} from '../components/organisms';
import axios from 'axios';

function setGroupName(props) {
  try {
    const groupName = props.location.pathname;
    var str = groupName;
    str = str.split('/');

    console.log('str', str);

    return str[2];
  } catch (err) {
    console.log(err);
  }

  return 'Testovací skupina';
}

export function GroupDetail(props) {
  const [group, setGroup] = useState({ name: '', members: [] });

 /*console.log('props:', props);*/

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            groupName: setGroupName(props) /*'Testovací skupina'*/,
          },
        };

        const res = await axios.get('../api/group/', config);
        console.log('Result:', res.data);
        setGroup(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  /*console.log('Group:', group.group);*/

  return (
    <>
            <PomodoroGroup group={group}> </PomodoroGroup>
    </>
  );
}
