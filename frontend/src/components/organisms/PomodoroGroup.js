// External imports
import React, { Fragment, useEffect, useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames';
// Internal imports
import { Button } from '../atoms/Button';
import { UserCard } from '../molecules/UserCard';
import { useAuth } from '../../utils/useAuth';

export function PomodoroGroupBase(props) {
  const { group } = props;
  return (
    <>
        <div className="group-title center-align">
          <h3>{group.name}</h3>
        </div>
        <div className="members">
          {group.userIDs.map((member, index) => {
            return (
              <div key={index} className="member">
                <UserCard member={member} />
              </div>
            );
          })}
        </div>
    </>
  );
}

export const PomodoroGroup = withRouter(PomodoroGroupBase);
