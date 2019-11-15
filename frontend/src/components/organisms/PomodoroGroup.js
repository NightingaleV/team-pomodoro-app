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
      <div className="group">
        <div className="group-title">{group.name}</div>
        <div className="row">
          {group.userIDs.map((member, index) => {
            return <UserCard member={member} index={index}></UserCard>;
          })}
        </div>
      </div>
    </>
  );
}

export const PomodoroGroup = withRouter(PomodoroGroupBase);
