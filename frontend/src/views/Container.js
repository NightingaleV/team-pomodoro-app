// External imports
import React from 'react';
// Internal imports
import {
  TopNavigation,
  SideNavigation,
  FooterNavigation,
  CreateGroupModal,
} from '../components/organisms';
import { useAuth } from '../utils/useAuth';
import { FloatingButton } from '../components/atoms';

export function Container(props) {
  const { user } = useAuth();
  const layoutWhenLogedIn = (
    <>
      <header className={'header'}>
        <TopNavigation />
        {user && <SideNavigation />}
      </header>
      <main className={'content'}>
        <div className="">{props.children}</div>
        <FloatingButton />
      </main>
      <div className="modals-container">
        <CreateGroupModal />
      </div>
      <FooterNavigation />
    </>
  );

  const layoutWhenAnonymous = (
    <>
      <TopNavigation />
      <div className={'row content sidebar-fix'}>
        <div className={'col l12 m12 s12 center-align'}>
          <div className="container">{props.children}</div>
          <FloatingButton />
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
