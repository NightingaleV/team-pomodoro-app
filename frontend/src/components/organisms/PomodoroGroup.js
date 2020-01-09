// External imports
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
// Internal imports
import { UserCard } from '../molecules/UserCard';
import { useAuth } from '../../utils/useAuth';
import {
  InviteUserModal,
  LeaveGroupModal,
  RemoveUserModal,
  AcceptInvitationModal,
  AcceptInvitationModalTrigger,
} from '../molecules';
import M from 'materialize-css';
import { LeaveGroupModalTrigger } from '../molecules/LeaveGroupModal';
import { AddMemberModalTrigger } from '../molecules/InviteUserModal';

export function PomodoroGroupBase(props) {
  const { group } = props;
  const { user } = useAuth();

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

  // Is Signed User Guest?
  //----------------------------------------------------------------------------
  const [currentUserIsGuest, setCurrentUserIsGuest] = useState(true);
  useEffect(() => {
    if (group) {
      if (!group.guestIDs.includes(user._id)) {
        setCurrentUserIsGuest(false);
      }
    }
  }, [group]);

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

  function initAcceptInvitationModal() {
    const acceptInvitationModalElement = document.querySelector(
      '.accept-invitation-modal',
    );
    const options = {};
    var elem = M.Modal.init(acceptInvitationModalElement, options);
  }

  useEffect(() => {
    initInviteUserModal();
    initLeaveGroupModal();
    initRemoveMemberModal();
    initAcceptInvitationModal();
  }, []);

  //Callback from Remove User Button
  const [memberToRemove, setMemberToRemove] = useState({});
  function sendMemberToRemoveCallback(member) {
    setMemberToRemove(member);
  }

  return (
    <>
      <div className="group">
        <div className="row group-title-wrapper card-panel">
          <div className="group-title-bar">
            <h3 className="group-title truncate">{group.name}</h3>

            <div className="">
              {currentUserIsAdmin && <AddMemberModalTrigger />}
              <LeaveGroupModalTrigger />
              {currentUserIsGuest && <AcceptInvitationModalTrigger />}
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
                  currentUserIsGuest={currentUserIsGuest}
                  group={group}
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
          <AcceptInvitationModal
            refetchGroup={props.refetchGroup}
            group={group}
          />
        </div>
      </div>
    </>
  );
}

export const PomodoroGroup = withRouter(PomodoroGroupBase);
