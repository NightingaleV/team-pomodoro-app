// Packages
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.scss";
// Components
import { Routes } from "./Routes";

function AllProviders({ children }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}

function App() {
  return (
    <AllProviders>
      <Routes />
    </AllProviders>
  );
}

export default App;
