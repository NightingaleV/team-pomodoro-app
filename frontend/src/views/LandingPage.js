import React, { useEffect, useState } from "react";
import classNames from "classnames";

import { TopNavigation } from "../components/organisms";
import M from "materialize-css";

export function LandingPage() {
  let [message, setMessage] = useState(null);
  useEffect(() => {
    //initialize parallax
    let options = {};
    let parallax_elements = document.querySelectorAll(".parallax");
    M.Parallax.init(parallax_elements, options);
    //Or use auto init instead
    //M.AutoInit();

    // Check if Express is set
    fetch("/api/data/")
      .then(res => res.json())
      .then(res => setMessage(res.express_status));
  }, []);
  return (
    <div className={classNames("navigation")}>
      <TopNavigation />
      <article>
        <section>
          <div id="index-banner" className="parallax-container">
            <div className="section no-pad-bot">
              <div className="container white-text">
                <h1 className="header center light">Materialize CSS</h1>
                <div className="row center">
                  <h5 className="header col s12 light">
                    A modern responsive front-end framework based on Material
                    Design
                  </h5>
                </div>
                <div className="row center">
                  <a
                    href="http://materializecss.com/getting-started.html"
                    id="download-button"
                    className="btn-large waves-effect waves-light lighten-1"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
            <div className="parallax">
              <img
                src="https://picsum.photos/id/594/2509/1673"
                alt="Unsplashed background img 1"
              />
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="section">
              <div className="row">
                <div className="col s12 m4">
                  <div className="icon-block">
                    <h2 className="center brown-text">
                      <i className="material-icons">flash_on</i>
                    </h2>
                    <h5 className="center">Speeds up development</h5>

                    <p className="light">
                      We did most of the heavy lifting for you to provide a
                      default stylings that incorporate our custom components.
                      Additionally, we refined animations and transitions to
                      provide a smoother experience for developers.
                    </p>
                  </div>
                </div>

                <div className="col s12 m4">
                  <div className="icon-block">
                    <h2 className="center brown-text">
                      <i className="material-icons">group</i>
                    </h2>
                    <h5 className="center">User Experience Focused</h5>

                    <p className="light">
                      By utilizing elements and principles of Material Design,
                      we were able to create a framework that incorporates
                      components and animations that provide more feedback to
                      users. Additionally, a single underlying responsive system
                      across all platforms allow for a more unified user
                      experience.
                    </p>
                  </div>
                </div>

                <div className="col s12 m4">
                  <div className="icon-block">
                    <h2 className="center brown-text">
                      <i className="material-icons">settings</i>
                    </h2>
                    <h5 className="center">Easy to work with</h5>

                    <p className="light">
                      We have provided detailed documentation as well as
                      specific code examples to help new users get started. We
                      are also always open to feedback and can answer any
                      questions a user may have about Materialize.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="parallax-container">
            <div className="section no-pad-bot">
              <div className="container white-text">
                <h1 className="header center light">
                  Express.js is {message ? message : "not working"}
                </h1>
              </div>
            </div>
            <div className="parallax">
              <img
                src="https://picsum.photos/id/379/2000/1328"
                alt="Unsplashed background img 2"
              />
            </div>
          </div>
        </section>
      </article>
      <footer className="page-footer light-blue">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">Company Bio</h5>
              <p className="grey-text text-lighten-4">
                We are a team of college students working on this project like
                it's our full time job. Any amount would help support and
                continue development on this project and is greatly appreciated.
              </p>
            </div>
            <div className="col l3 s12">
              <h5 className="white-text">Settings</h5>
              <ul>
                <li>
                  <a className="white-text" href="#!">
                    Link 1
                  </a>
                </li>
                <li>
                  <a className="white-text" href="#!">
                    Link 2
                  </a>
                </li>
                <li>
                  <a className="white-text" href="#!">
                    Link 3
                  </a>
                </li>
                <li>
                  <a className="white-text" href="#!">
                    Link 4
                  </a>
                </li>
              </ul>
            </div>
            <div className="col l3 s12">
              <h5 className="white-text">Connect</h5>
              <ul>
                <li>
                  <a className="white-text" href="#!">
                    Link 1
                  </a>
                </li>
                <li>
                  <a className="white-text" href="#!">
                    Link 2
                  </a>
                </li>
                <li>
                  <a className="white-text" href="#!">
                    Link 3
                  </a>
                </li>
                <li>
                  <a className="white-text" href="#!">
                    Link 4
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            Made by{" "}
            <a
              className="brown-text text-lighten-3"
              href="http://materializecss.com"
            >
              Materialize
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
