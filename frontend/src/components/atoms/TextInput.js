import React, { Fragment } from 'react';
import classNames from 'classnames';

export function TextInput(props) {
  return (
    <Fragment>
      <div className="input-field">
        <i className="material-icons prefix">{props.icon}</i>
        <input
          id={props.id}
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
          className={classNames('validate', props.className)}
        />
        <label htmlFor={props.id}>{props.children}</label>
      </div>
    </Fragment>
  );
}
