// External imports
import React, { Fragment, useEffect, useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames';
// Internal imports
import { Button } from '../atoms/Button';
import { UserCard } from '../molecules/UserCard';
import { useAuth } from '../../utils/useAuth';
import { InviteUserModal } from '../molecules/InviteUserModal';
import M from 'materialize-css';

export function PomodoroGroupBase(props) {
  const { group } = props;
  const { user, token } = useAuth();

  const addMemberModalTrigger = (
    <>
      {user && (
        <>
          <Button
            icon={'person_add'}
            iconPosition={'right'}
            href={'#addMemberModal'}
            className={classNames('hide-on-med-and-down', 'modal-trigger')}
          >
            <span className="btn-title">Invite User</span>
          </Button>
          <Button
            icon={'person_add'}
            shape={'bigCircular'}
            iconPosition={'right'}
            href={'#addMemberModal'}
            className={classNames('hide-on-large-only', 'modal-trigger')}
          />
        </>
      )}
    </>
  );

  function initNewGroupModal() {
    const addMemberModalElement = document.querySelector('.add-member-modal');
    const options = {};
    var elem = M.Modal.init(addMemberModalElement, options);
  }

  useEffect(() => {
    initNewGroupModal();
  }, []);

  return (
    <>
      <div className="group">
        <div className="row group-title-wrapper">
          <div className="group-title-bar">
            <div className="">
              <h3 className="group-title">{group.name}</h3>
            </div>
            <div className="valign-wrapper ">{addMemberModalTrigger}</div>
          </div>
        </div>

        <div className="row">
          {group.userIDs.map((member, index) => {
            return (
              <div key={index}>
                <UserCard member={member} />
              </div>
            );
          })}
        </div>
        <div className="group-modals">
          <InviteUserModal refetchGroup={props.refetchGroup} group={group} />
        </div>
      </div>
    </>
  );
}

export const PomodoroGroup = withRouter(PomodoroGroupBase);
