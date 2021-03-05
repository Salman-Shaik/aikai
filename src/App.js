import React from "react";
import { isMobile } from "react-device-detect";
import { LandingPage } from "./Components/LandingPage";
import "./css/App.css";
import {MobileHomepage} from "./Components/MobileHomepage";

const App = () => (
  <div className="App">
    {isMobile ? (
      <MobileHomepage/>
    ) : (
      <LandingPage />
    )}
  </div>
);

export default App;
