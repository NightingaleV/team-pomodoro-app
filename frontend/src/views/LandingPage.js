// External imports
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import M from 'materialize-css';
// Internal imports
import { TopNavigation } from '../components/organisms';

export function LandingPage() {
  let [message, setMessage] = useState(null);
  useEffect(() => {
    //initialize parallax
    let options = {};
    let parallax_elements = document.querySelectorAll('.parallax');
    M.Parallax.init(parallax_elements, options);
    //Or use auto init instead
    //M.AutoInit();

    // Check if Express is set
    fetch('/api/data/')
      .then(res => res.json())
      .then(res => setMessage(res.express_status));
  }, []);
  return (
    <div className={classNames('navigation')}>
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
                    href="#"
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
      </article>
      <footer className="page-footer light-blue">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">Company Bio</h5>
              <p className="grey-text text-lighten-4">
                We are a team of college students working on this project like
                it's our full time job.<br></br>
                <br></br>
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
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            Made by{' '}
            <a className="brown-text text-lighten-3" href="#">
              Materialize
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
