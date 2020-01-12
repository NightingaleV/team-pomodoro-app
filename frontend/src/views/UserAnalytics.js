// External imports
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Internal imports
import { useAuth } from '../utils/useAuth';
import { formatTimeToStringText } from '../utils/pomodoroUtils';

export function UserAnalytics(props) {
  const { token, user } = useAuth();

  const [analytics, setAnalytics] = useState([]);

  const fetchAnalytics = async () => {
    try {
      const requestConfig = {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
        timeout: 5000,
      };
      const res = await axios.get('/api/timer/analytics', requestConfig);
      console.log(res.data);
      setAnalytics(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return (
    <>
      <div className="container statistics-container ">
        <div className="card-panel">
          <h3>Current stats</h3>
          <div className="statistics-content">
            <table className="highlight">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Week</th>
                  <th>Name of the Day</th>
                  <th>Pomodoro Time</th>
                </tr>
              </thead>
              <tbody>
                {analytics.map((day, index) => {
                  const date = new Date(
                    ''.concat(
                      day._id.day,
                      '/',
                      day._id.month,
                      '/',
                      day._id.year,
                    ),
                  );
                  return (
                    <tr>
                      <td>{date.toLocaleDateString()}</td>
                      <td>{day._id.week}</td>
                      <td>{dayNames[date.getDay()]}</td>
                      <td>{formatTimeToStringText(day.total)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
