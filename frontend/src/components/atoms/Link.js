import React from 'react';
import classNames from 'classnames';
import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom';

export function Link({ children, className, noUnderline, ...rest }) {
  return (
    <RouterLink className={classNames('link', className)} {...rest}>
      {children}
    </RouterLink>
  );
}

export function NavLink({ children, className, classActive, ...rest }) {
  return (
    <RouterNavLink
      className={classNames('link', className)}
      activeClassName={classNames('blue darken-1', classActive)}
      {...rest}
    >
      {children}
    </RouterNavLink>
  );
}
