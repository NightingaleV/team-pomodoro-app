import React, { Fragment, useEffect, useState } from "react";
import { Link } from "../atoms/Link";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
// Assets
import M from "materialize-css";

const initBurgerMenu = () => {
  const sideNavElement = document.querySelectorAll(".sidenav");
  const options = {};
  M.Sidenav.init(sideNavElement, options);
};

export function TopNavigationBase() {
  useEffect(() => {
    //initialize parallax
    initBurgerMenu();
  }, []);

  return (
    <Fragment>
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className={classNames("brand-logo", "center")}>
            TeamPomodori
          </Link>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link to="/login">Log In</Link>
            </li>
            <li>
              <Link to="/register">Sign Up</Link>
            </li>
            <li>
              <Link to="/timer">Timer</Link>
            </li>
          </ul>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-demo">
        <li>
          <Link to="/login">Log In</Link>
        </li>
        <li>
          <Link to="/register">Sign Up</Link>
        </li>
        <li>
          <Link to="/timer">Timer</Link>
        </li>
      </ul>
      <initBurgerMenu />
    </Fragment>
  );
}

export const TopNavigation = withRouter(TopNavigationBase);
