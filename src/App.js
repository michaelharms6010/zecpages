import React, {useState, useEffect} from 'react';
import {ZaddrContext} from "./contexts/ZaddrContext"
import {Link, BrowserRouter as Router} from "react-router-dom";
import './App.css';

function App() {
  const [zaddrs, setZaddrs] = useState([]);
  return (
    <ZaddrContext.Provider value={{zaddrs, setZaddrs}}>
      <Router>
        <div className="App">
          <nav>navbar will go here <Link to="/edit" >Edit your information</Link> </nav>
          <ZaddrList />
          
        
        </div>
      </Router>
    </ZaddrContext.Provider>
  );
}

export default App;
