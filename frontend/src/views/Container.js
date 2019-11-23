// External imports
import React, { Fragment } from 'react';
// Internal imports
import {
  TopNavigation,
  SideNavigation,
  FooterNavigation,
  CreateGroupModal,
} from '../components/organisms';
import { useAuth } from '../utils/useAuth';

export function Container(props) {
  const { user, token } = useAuth();
  const layoutWhenLogedIn = (
    <>
      <TopNavigation />
      <div className={'row container'}>
        <div>
          {user && <SideNavigation />}
        </div>
        <div className={'col s12'}>
          <div>{props.children}</div>
        </div>
      </div>
      <div className="modals-container">
        <CreateGroupModal />
      </div>
      <FooterNavigation />
    </>
  );

  const layoutWhenAnonymous = (
    <>
      <TopNavigation />
      <div className={'row container'}>
        <div className={'col s12'}>
          <div>{props.children}</div>
        </div>
      </div>
      <div className="modals-container">
        <CreateGroupModal />
      </div>
      <FooterNavigation />
    </>
  );

  return user ? layoutWhenLogedIn : layoutWhenAnonymous;
}
