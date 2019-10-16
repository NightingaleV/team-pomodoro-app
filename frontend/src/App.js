import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  let [message, setMessage] = useState(null);
  useEffect(() => {
    // let elem1 = document.querySelector('.carousel');
    // M.AutoInit();
    // let options = {
    //     duration:500,
    //     dist:0
    // }
    // let instance = M.Carousel.init(elem1,options);

    // Check if Express is set
    fetch("/api/data/")
      .then(res => res.json())
      .then(res => setMessage(res.express_status));
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h1>Express is {message ? message : "not working"}</h1>
        </a>
      </header>
    </div>
  );
}

export default App;
