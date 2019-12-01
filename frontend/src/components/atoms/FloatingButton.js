// External imports
import React from 'react';
import { withRouter } from 'react-router-dom';
import M from 'materialize-css';

export function FloatingButtonBase(props) {
  {
    const elems = document.querySelectorAll('.fixed-action-btn');
    const options = { direction: 'bottom' };
    M.FloatingActionButton.init(elems, options);
  }

  return (
    <>
      <div class="fixed-action-btn">
        <a class="btn-floating btn-large red">
          <i class="large material-icons">mode_edit</i>
        </a>
        <ul>
          <li>
            <a class="btn-floating red">
              <i class="material-icons">insert_chart</i>
            </a>
          </li>
          <li>
            <a class="btn-floating yellow darken-1">
              <i class="material-icons">format_quote</i>
            </a>
          </li>
          <li>
            <a class="btn-floating green">
              <i class="material-icons">publish</i>
            </a>
          </li>
          <li>
            <a class="btn-floating blue">
              <i class="material-icons">attach_file</i>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export const FloatingButton = withRouter(FloatingButtonBase);
