import React, { Fragment, useState, useEffect } from 'react';
import {
  TopNavigation,
  PomodoroGroup,
  SideNavigation,
} from '../components/organisms';
import axios from 'axios';



export function GroupDetail() {
  const [group, setGroup] =  useState({ name: '', members: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            groupName: 'Testovací skupina',
          },
        };

        const res = await axios.get('api/group/', config);
        /*console.log('Result:', res.data);*/
        setGroup(res.data);
      } catch (err) {
        /*console.log(err);*/
      }
    }

    fetchData();
  }, []);

  /*console.log('Group:', group.group);*/

  return (
    <Fragment>
      <TopNavigation />

      <div className="container">
        <div className="row">
          <div className="col s1 l3">
            <SideNavigation />
          </div>
             <div className="col s9">
               <PomodoroGroup group={group.group}/>
            </div>
        </div>
      </div>
    </Fragment>
  );
}
