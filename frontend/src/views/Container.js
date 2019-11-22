// External imports
import React, { Fragment } from 'react';
// Internal imports
import {
  TopNavigation,
  SideNavigation,
  FooterNavigation,
  CreateGroupModal,
} from '../components/organisms';

export function Container(props) {
  return (
    <>
      <TopNavigation></TopNavigation>

      <div className={'row content'}>
        <div className={'col l2 hide-on-small-only'}>
          <SideNavigation></SideNavigation>
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
}
