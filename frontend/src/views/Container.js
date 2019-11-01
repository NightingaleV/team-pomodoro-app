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
    <Fragment>
      <TopNavigation></TopNavigation>
      <div className={'row content'}>
        <div className={'col hide-on-small-only s3'}>
          <SideNavigation></SideNavigation>
        </div>
        <div className={'col s12'}>{props.children}</div>
      </div>
      <FooterNavigation></FooterNavigation>
    </Fragment>
  );
}
