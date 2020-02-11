import React, {useState, useEffect} from 'react';
import {Route, BrowserRouter as Router} from "react-router-dom";
import './App.scss';

import {ZaddrContext} from "./contexts/ZaddrContext"
import {UserContext} from "./contexts/UserContext"

import Signup from "./components/Signup"
import Login from "./components/Login"
import ZaddrList from "./components/ZaddrList";
import Navigation from "./components/Navigation";
import EditUserInfo from "./components/EditUserInfo";

import axiosWithAuth from "./utils/AxiosWithAuth";


function App() {
  const [zaddrs, setZaddrs] = useState([]);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("jwt") ? true : false)




  return (
    <UserContext.Provider value={{loggedIn, setLoggedIn}}>
      <ZaddrContext.Provider value={{zaddrs, setZaddrs}}>
        <Router>
          <div className="App">
            <Navigation />
            <Route exact path="/" render={() => <ZaddrList />} />
            <Route exact path="/signup" render={(props) => <Signup {...props} />} />
            <Route exact path="/login" render={(props) => <Login {...props} />} />
            <Route path="/edit" render={(props) => <EditUserInfo {...props} /> } />
          </div>
          <p>This site is still under development! If you encounter issues while testing, please let me know on <a href="https://twitter.com/michaelharms70">Twitter</a> or <a href="https://github.com/michaelharms6010/fe-zeitpages">Github.</a></p>
        </Router>
      </ZaddrContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
