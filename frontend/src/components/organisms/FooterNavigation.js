// External imports
import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
// Internal imports

// Assets
export function FooterNavigationBase(props) {
  return (
    <>
      <footer className="page-footer">
        <div className="footer-copyright">
          <div className="row">
            <div className="col s12">
              <span className="copyrights">© 2019 Pomodoro Team 2</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export const FooterNavigation = withRouter(FooterNavigationBase);
