// External imports
import React from 'react';
import { withRouter } from 'react-router-dom';
import M from 'materialize-css';

export function FloatingButtonBase(props) {
  {
    const elems = document.querySelectorAll('.fixed-action-btn');
    const options = { toolbarEnabled: true };
    M.FloatingActionButton.init(elems, options);
  }

  return (
    <>
      <div class="fixed-action-btn toolbar direction-top hide-on-med-and-up">
        <a class="btn-floating btn-large blue">
          <i class="large material-icons">watch_later</i>
        </a>
        <ul>
          <li class="waves-effect waves-light">
            <a href="#!">
              <i class="material-icons">play_arrow</i>
            </a>
          </li>
          <li class="waves-effect waves-light">
            <a href="#!">
              <i class="material-icons">pause</i>
            </a>
          </li>
          <li class="waves-effect waves-light">
            <a href="#!">
              <i class="material-icons">stop</i>
            </a>
          </li>
          <li class="waves-effect waves-light">
            <a href="#!">
              <i class="material-icons">loop</i>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export const FloatingButton = withRouter(FloatingButtonBase);
