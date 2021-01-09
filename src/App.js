import React, { useState, useEffect } from 'react';
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import './App.scss';
import ReactGA from "react-ga"
import axios from "axios"
import {useLocalStorage} from "./hooks/useLocalStorage"
import {ZaddrContext} from "./contexts/ZaddrContext"
import {UserContext} from "./contexts/UserContext"

import Signup from "./components/Signup"
import Login from "./components/Login"
import ZaddrList from "./components/ZaddrList";
import Navigation from "./components/Navigation";
import EditUserInfo from "./components/EditUserInfo";
import About from "./components/About"
import ZaddrPage from "./components/ZaddrPage"
import Board from "./components/Board"
import BoardPost from "./components/BoardPost";


function App() {
  const [zaddrs, setZaddrs] = useState([]);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("jwt") ? true : false)
  const [ip, setIp] = useState("");
  const [copied, setCopied] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [darkMode, setDarkMode] = useLocalStorage("dark-mode", false)



  useEffect(_ => {
    axios.get("https://be.zecpages.com/users")
      .then(res => {
        setZaddrs(res.data.sort( (a, b) => b.id-a.id))
      })
      .catch(err => console.error(err));
  },[])


  // initialize services
  useEffect( _ => {

    ReactGA.initialize("UA-156199574-2");
    ReactGA.pageview("/");
    ReactGA.event({category: "App", action: "Loaded app"});
  }, [])
  useEffect( _ => {
    axios.get('https://www.cloudflare.com/cdn-cgi/trace')
      .then(res => setIp(res.data.split("\n")[2].replace("ip=","")))
      .catch(err => console.log(err))
  }, [])


  return (
    <UserContext.Provider value={{loggedIn, setLoggedIn, ip, darkMode, setDarkMode}}>
      <ZaddrContext.Provider value={{zaddrs, setZaddrs, copied, setCopied, loaded, setLoaded}}>
        <Router>
          <div className={darkMode ? "dark-mode App" : "App"}style={darkMode ? {color: "#ddd", background: "#333"} : {}}>
            <Navigation />
            <Switch>
              <Route exact path="/" render={() => <ZaddrList />} />
              <Route exact path="/signup" render={(props) => <Signup {...props} />} />
              <Route exact path="/login" render={(props) => <Login {...props} />} />
              <Route exact path="/edit" render={(props) => <EditUserInfo {...props} /> } />
              <Route exact path="/board" component={Board} />
              <Route path="/board/post/:id" component={BoardPost} />
              <Route path="/:username" render={props => <ZaddrPage copied={copied} setCopied={setCopied} {...props} /> } />
            </Switch>
          </div>
        </Router>
      </ZaddrContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
