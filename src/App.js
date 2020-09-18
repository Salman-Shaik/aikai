import React from 'react';
import {Homepage} from "./Components/Homepage";
import {isMobile} from 'react-device-detect'
import './css/App.css';

function App() {
  return (
    <div className="App">
        {isMobile ? <h4 className="mobile_notice">This website in not available on Mobile yet. Please Try Desktop Version.</h4> : <Homepage />}
    </div>
  );
}

export default App;
