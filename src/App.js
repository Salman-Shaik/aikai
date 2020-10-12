import React from "react";
import { isMobile } from "react-device-detect";
import { LandingPage } from "./Components/LandingPage";
import "./css/App.css";

const App = () => (
  <div className="App">
    {isMobile ? (
      <h4 className="mobile_notice">
        This website in not available on Mobile yet. Please Try Desktop Version.
      </h4>
    ) : (
      <LandingPage />
    )}
  </div>
);

export default App;
