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
    <div>
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
    </div>
  );
}
