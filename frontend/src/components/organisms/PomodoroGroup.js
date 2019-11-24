// External imports
import React, { Fragment, useEffect, useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames';
// Internal imports
import { Button } from '../atoms/Button';
import { UserCard } from '../molecules/UserCard';
import { useAuth } from '../../utils/useAuth';
import {
  InviteUserModal,
  LeaveGroupModal,
  RemoveUserModal,
} from '../molecules';
import M from 'materialize-css';

export function PomodoroGroupBase(props) {
  const { group } = props;
  const { user, token } = useAuth();

  // Is Signed User Admin?
  //----------------------------------------------------------------------------
  const [currentUserIsAdmin, setCurrentUserIsAdmin] = useState(false);
  useEffect(() => {
    if (group) {
      if (group.adminIDs.includes(user._id)) {
        setCurrentUserIsAdmin(true);
      }
    }
  }, [group]);

  // Modal Buttons
  //----------------------------------------------------------------------------
  let addMemberModalTrigger = '';
  if (currentUserIsAdmin) {
    addMemberModalTrigger = (
      <>
        {user && (
          <>
            <Button
              icon={'person_add'}
              iconPosition={'right'}
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
              iconPosition={'right'}
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
            icon={'delete_sweep'}
            color={'red'}
            iconPosition={'right'}
            href={'#leaveGroupModal'}
            className={classNames(
              'hide-on-med-and-down',
              'modal-trigger',
              'group-action-button',
            )}
          >
            <span className="btn-title">Leave</span>
          </Button>
          <Button
            icon={'delete_sweep'}
            color={'red'}
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

  // Modals Control
  //----------------------------------------------------------------------------
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
  function initRemoveMemberModal() {
    const removeMemberModalElement = document.querySelector(
      '.remove-member-modal',
    );
    const options = {};
    var elem = M.Modal.init(removeMemberModalElement, options);
  }

  useEffect(() => {
    initInviteUserModal();
    initLeaveGroupModal();
    initRemoveMemberModal();
  }, []);

  //Callback from Remove User Button
  const [memberToRemove, setMemberToRemove] = useState({});
  function sendMemberToRemoveCallback(member) {
    setMemberToRemove(member);
  }

  return (
    <>
      <div className="group">
        <div className="row group-title-wrapper">
          <div className="group-title-bar">
            <div className="valign-wrapper">
              <h3 className="group-title truncate">{group.name}</h3>
            </div>
            <div className="valign-wrapper ">
              {addMemberModalTrigger}
              {leaveGroupModalTrigger}
            </div>
          </div>
        </div>
        <div className="row members">
          {group.userIDs.map((member, index) => {
            return (
              <div key={index} className="member col">
                <UserCard
                  member={member}
                  sendMemberToRemove={sendMemberToRemoveCallback}
                  currentUserIsAdmin={currentUserIsAdmin}
                />
              </div>
            );
          })}
        </div>
        <div className="group-modals">
          <InviteUserModal refetchGroup={props.refetchGroup} group={group} />
          <LeaveGroupModal group={group} />
          <RemoveUserModal
            refetchGroup={props.refetchGroup}
            group={group}
            member={memberToRemove}
          />
        </div>
      </div>
    </>
  );
}

export const PomodoroGroup = withRouter(PomodoroGroupBase);
