// External imports
import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';
import axios from 'axios';

// Internal imports
import { TopNavigation } from '../components/organisms';

export function GroupDetail() {
  const [group, setGroup] = useState({ name: '', members: [] });

  useEffect(() => {
    async function fetchData() {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            groupName: 'Testovací skupina',
          },
        };

        const res = await axios.get('api/group/detail', config);
        console.log('Result:', res.data);
        setGroup(res.data.filterGroup[0]);
      } catch (err) {
        console.log('Error Statement');
      }
    }

    fetchData();
  }, []);

  console.log('Group:', group);

  return (
    <Fragment>
      <div className="blue lighten-5">
        <div className="container">
          <div className="row">
            <div className="col s12 center-align">
              <h3>
                Group:
                {group.name}
              </h3>

              <div>
                {group.members.map((member, index) => (
                  <div key={index}>
                    <p>
                      Name: {member.email} Status: {member.timer.status}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
