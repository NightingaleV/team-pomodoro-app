// External imports
import React, { Fragment, useEffect, useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames';
// Internal imports
import { Button } from '../atoms/Button';
import { UserCard } from '../molecules/UserCard';
import { useAuth } from '../../utils/useAuth';
import { InviteUserModal, LeaveGroupModal } from '../molecules';
import M from 'materialize-css';

export function PomodoroGroupBase(props) {
  const { group } = props;
  const { user, token } = useAuth();

  let userIsAdmin = false;
  let addMemberModalTrigger = '';
  if (group) {
    group.adminIDs.map((admin, index) => {
      if (admin == user._id) userIsAdmin = true;
    });
  }

  if (userIsAdmin) {
    addMemberModalTrigger = (
      <>
        {user && (
          <>
            <Button
              icon={'person_add'}
              iconPosition={'left'}
              href={'#addMemberModal'}
              className={classNames(
                'hide-on-med-and-down',
                'modal-trigger',
                'group-action-button',
              )}
            >
              <span className="btn-title">Invite User</span>
            </Button>
            <Button
              icon={'person_add'}
              shape={'circular'}
              iconPosition={'left'}
              href={'#addMemberModal'}
              className={classNames(
                'hide-on-large-only',
                'modal-trigger',
                'group-action-button',
              )}
            />
          </>
        )}
      </>
    );
  }

  const leaveGroupModalTrigger = (
    <>
      {user && (
        <>
          <Button
            icon={'directions_run'}
            color={'red lighten-1'}
            iconPosition={'left'}
            href={'#leaveGroupModal'}
            className={classNames(
              'hide-on-med-and-down',
              'modal-trigger',
              'group-action-button',
            )}
          >
            <span className="btn-title">Leave group</span>
          </Button>
          <Button
            icon={'directions_run'}
            color={'red lighten-1'}
            shape={'circular'}
            iconPosition={'right'}
            href={'#leaveGroupModal'}
            className={classNames(
              'hide-on-large-only',
              'modal-trigger',
              'group-action-button',
            )}
          />
        </>
      )}
    </>
  );

  function initInviteUserModal() {
    const addMemberModalElement = document.querySelector('.add-member-modal');
    const mainInputElem = document.querySelector('.main-input');
    const options = {
      onOpenStart: () => {
        mainInputElem.value = '';
      },
      onOpenEnd: () => {
        mainInputElem.focus();
      },
    };
    var elem = M.Modal.init(addMemberModalElement, options);
  }
  function initLeaveGroupModal() {
    const addMemberModalElement = document.querySelector('.leave-group-modal');
    const options = {};
    var elem = M.Modal.init(addMemberModalElement, options);
  }

  useEffect(() => {
    initInviteUserModal();
    initLeaveGroupModal();
  }, []);

  return (
    <>
      <div className="group">
        <div className="row group-title-wrapper">
          <div className="group-title-bar">
            <div className="">
              <h3 className="group-title">{group.name}</h3>
            </div>
            <div className="">
              {addMemberModalTrigger}
              {leaveGroupModalTrigger}
            </div>
          </div>
        </div>
        <div className="row members">
          {group.userIDs.map((member, index) => {
            return (
              <div key={index} className="member col ">
                <UserCard member={member} />
              </div>
            );
          })}
        </div>
        <div className="group-modals">
          <InviteUserModal refetchGroup={props.refetchGroup} group={group} />
          <LeaveGroupModal group={group} />
        </div>
      </div>
    </>
  );
}

export const PomodoroGroup = withRouter(PomodoroGroupBase);
