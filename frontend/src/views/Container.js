// External imports
import React, { Fragment } from 'react';
// Internal imports
import {
  TopNavigation,
  SideNavigation,
  FooterNavigation,
} from '../components/organisms';

export function Container(props) {
  return (
    <>
      <TopNavigation></TopNavigation>
      <div className={'row content'}>
        <div className={'col l2 hide-on-small-only'}>
          <SideNavigation></SideNavigation>
        </div>
        <div className={'col s12 m12 l10 center-align'}>{props.children}</div>
      </div>
      <FooterNavigation></FooterNavigation>
    </>
  );
}
