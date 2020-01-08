// External imports
import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import axios from 'axios';
// Internal imports
import { TopNavigation } from '../components/organisms';
import { TextInput, Button, ErrorBox } from '../components/atoms';
import { SignUpSuccess } from '../templates';
import { useAuth } from '../utils/useAuth';
import { useApi } from '../utils/useApi';
import { useTimer } from '../components/providers/TimerProvider';

export function UserAnalytics(props) {
  const history = useHistory();
  const { timer, timerAction } = useTimer();
  const auth = useAuth();
  const api = useApi();

  const registeredEmail = props.location.state && props.location.state.email;

  //Form Fields
  const [formData, setFormData] = useState({
    email: registeredEmail || '',
    password: '',
  });

  //Form Errors
  const [errors, setError] = useState({
    backend: [],
  });

  //On changing text inside inputs
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //On pushing the main button
  const onSubmit = async e => {
    e.preventDefault();

    const userToLogin = {
      email: formData.email,
      password: formData.password,
    };
    const body = JSON.stringify(userToLogin);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000,
    };
    await axios
      .post('api/user/login', body, config)
      .then(res => {
        const { token, user } = res.data;
        // localStorage.setItem('jwt-token', token);
        console.log(user);
        timerAction.pauseTimer();
        auth.signin({ token, user });
        history.replace('/');
      })
      .catch(err => {
        console.log('Error Statement');
        console.log(err);

        //If TimeOut
        if (err.code === 'ECONNABORTED') {
          setError({
            ...errors,
            backend: [{ msg: 'Lost connection, try it later.' }],
          });
          console.log(errors);
        } else {
          if (err.response.data) {
            setError({ ...errors, backend: err.response.data.errors });
            console.log(err.response.data.errors);
            // err.response.data.errors.map(error => {
            //   console.log(error);
            // });
          }
        }
      });
  };

  return (
    <>
      <div className="container statistics-container">
        <h3>Analytics</h3>
        <div className="statistics-content">
          <table className="highlight">
            <thead>
              <tr>
                <th>Day</th>
                <th>Name of the Day</th>
                <th>Pomodoro Time</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Alvin</td>
                <td>Eclair</td>
                <td>$0.87</td>
              </tr>
              <tr>
                <td>Alan</td>
                <td>Jellybean</td>
                <td>$3.76</td>
              </tr>
              <tr>
                <td>Jonathan</td>
                <td>Lollipop</td>
                <td>$7.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
