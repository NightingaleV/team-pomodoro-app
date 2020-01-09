//External imports
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
// Internal imports
import { TextInput, Button, ErrorBox } from '../components/atoms';
import { useAuth } from '../utils/useAuth';

export function Invitation() {
  const { token } = useAuth();
  let location = useLocation();
  const [message, setMessage] = useState('');
  const [group, setGroup] = useState({ name: '', userIDs: [] });
  const [authError, setAuthError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
  });

  const [error, setError] = useState('');

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const requestConfig = {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
  };

  useEffect(() => {
    fetchGroupByUrlId();
  }, []);

  function getGroupIdentifier(props) {
    const url = location.pathname;
    const urlList = url.split('/');
    const groupID = urlList[urlList.length - 1];
    return groupID;
  }

  async function fetchGroupByUrlId() {
    try {
      await axios
        .get('/api/group/' + getGroupIdentifier(), requestConfig)
        .then(res => {
          console.log('Fetched Group Data: ', res.data.group);
          setGroup(res.data.group);
        })
        .catch(err => {
          if (err.response.status == 403 || err.response.status == 401) {
            console.log('You are prohibited to invite users into the group');
            setAuthError('You are prohibited to invite users into the group');
          }
          console.error(err);
        });
    } catch {}
  }

  async function addMember() {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const invitation = { groupID: getGroupIdentifier(), email: formData.email };

    const body = JSON.stringify(invitation);

    await axios
      .post('/api/group/addMember', body, config)
      .then(res => {
        console.log('Valid statement');
        console.log(res.data.group);
        if (res.data.group) {
          setMessage(
            'User ' +
              invitation.email +
              ' has been invited to group ' +
              res.data.group.name,
          );
        }
      })
      .catch(err => {
        if (err.response.status == 404) {
          console.log('Unable to find user ' + formData.email);
          setError('Unable to find user ' + formData.email);
        } else if (err.response.status == 403) {
          console.log(
            'User ' + formData.email + ' is already a member of this group',
          );
          setError(
            'User ' + formData.email + ' is already a member of this group',
          );
        }
      });
  }

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    setMessage('');

    addMember();
  };

  return (
    <>
      {authError && <ErrorBox errorMsg={authError}></ErrorBox>}

      {!authError && (
        <div className={'singup-container'}>
          <h3>Invite user into group: {group.name}</h3>
          <p>{message}</p>
          <form id="user-invitation" onSubmit={onSubmit}>
            <TextInput
              id={'email'}
              name={'email'}
              type={'email'}
              value={formData.email}
              onChange={onChange}
              error={error || ''}
              required
            >
              Email
            </TextInput>
            <Button type={'submit'} form={'user-invitation'}>
              Invite
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
