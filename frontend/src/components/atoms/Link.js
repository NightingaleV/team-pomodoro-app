import React from "react";
import classNames from "classnames";
import { Link as RouterLink } from "react-router-dom";

export function Link({ children, className, noUnderline, ...rest }) {
  return (
    <RouterLink className={classNames("link", className)} {...rest}>
      {children}
    </RouterLink>
  );
}
