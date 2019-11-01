// External imports
import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
// Internal imports

// Assets
export function FooterNavigationBase(props) {
  return (
    <Fragment>
      <footer className="page-footer light-blue">
        <div className="footer-copyright">
          <div className="container">Made by Team 2</div>
        </div>
      </footer>
    </Fragment>
  );
}

export const FooterNavigation = withRouter(FooterNavigationBase);
