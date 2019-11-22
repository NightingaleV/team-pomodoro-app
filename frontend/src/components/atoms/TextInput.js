import React, { Fragment } from 'react';
import classNames from 'classnames';

export function TextInput(props) {
  let isError = false;
  if (props.error) {
    isError = true;
  }
  return (
    <Fragment>
      <div className="input-field">
        {props.icon && <i className="material-icons prefix">{props.icon}</i>}
        <input
          id={props.id}
          name={props.name}
          type={props.type}
          value={props.value}
          autoFocus={props.autofocus}
          placeholder={props.placeholder}
          className={classNames(
            {
              valid: props.value.length < 1 ? false : !isError,
              invalid: isError,
            },
            props.className,
          )}
          onChange={props.onChange}
        />
        <label htmlFor={props.id}>{props.children}</label>
        <span
          className={classNames({ 'helper-text': isError })}
          data-error={props.error}
        ></span>
      </div>
    </Fragment>
  );
}
