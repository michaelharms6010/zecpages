import React, {useState, useEffect} from 'react';
import {ZaddrContext} from "./contexts/ZaddrContext"
import {Route, Link, BrowserRouter as Router} from "react-router-dom";
import './App.scss';

import Signup from "./components/Signup"
import Login from "./components/Login"
import ZaddrList from "./components/ZaddrList";
import Navigation from "./components/Navigation";

import axiosWithAuth from "./utils/AxiosWithAuth";


function App() {
  const [zaddrs, setZaddrs] = useState([]);

  useEffect(_ => {
    axiosWithAuth().get("https://zeitpages-staging.herokuapp.com/users")
      .then(res => setZaddrs(res.data))
      .catch(err => console.error(err));
  },[])


  return (
    <ZaddrContext.Provider value={{zaddrs, setZaddrs}}>
      <Router>
        <div className="App">
          <Navigation />
          <Route exact path="/" render={() => <ZaddrList />} />
          <Route exact path="/signup" render={() => <Signup />} />
          <Route exact path="/login" render={() => <Login />} />
        
        </div>
      </Router>
    </ZaddrContext.Provider>
  );
}

export default App;
