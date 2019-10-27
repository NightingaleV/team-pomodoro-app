import React, { Fragment } from 'react';
import classNames from 'classnames';

// https://material-ui.com/components/snackbars/

export function ErrorBox(props) {
  const [open, setOpen] = React.useState(true);

  const handleClose = event => {
    setOpen(false);
  };
  return (
    <Fragment>
      <div className={classNames('row', { hide: !open })} id="alert_box">
        <div className="col s12 m12">
          <div className="card red darken-1 white-text white-text row valign-wrapper">
            <div className="col s12 m10">
              <div className="card-content valign-wrapper">
                <div className="icon-left valign-wrapper col s2">
                  <i className="material-icons">error</i>
                </div>
                <div className="col s12">{props.errorMsg}</div>
              </div>
            </div>
            <div className="col m2">
              <button
                className={'btn-flat white-text'}
                onClick={handleClose}
                type={'button'}
              >
                <i className="material-icons">close</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
