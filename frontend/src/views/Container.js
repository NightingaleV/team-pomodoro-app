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
      <div className={'row content'}>
        <div className={'col l2 hide-on-small-only'}>
          {user && <SideNavigation />}
        </div>
        <div className={'col l10 m12 s12   center-align'}>
          <div className="container">{props.children}</div>
        </div>
      </div>
      <div className="modals-container">
        <CreateGroupModal />
      </div>
      <FooterNavigation></FooterNavigation>
    </>
  );

  const layoutWhenAnonymous = (
    <>
      <TopNavigation />
      <div className={'row content'}>
        <div className={'col l12 m12 s12   center-align'}>
          <div className="container">{props.children}</div>
        </div>
      </div>
      <div className="modals-container">
        <CreateGroupModal />
      </div>
      <FooterNavigation></FooterNavigation>
    </>
  );

  return user ? layoutWhenLogedIn : layoutWhenAnonymous;
}
