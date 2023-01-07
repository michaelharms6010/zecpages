import React, { useState, useEffect } from 'react';
import {Switch, Route, BrowserRouter as Router, Redirect} from "react-router-dom";
import './App.scss';
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
import SubBoard from "./components/SubBoard"
import BoardPost from "./components/BoardPost";
import Drawing from "./components/Drawing";
import Leaderboard from "./components/Leaderboard"
import UserBoard from "./components/UserBoard"
import PollCard from "./components/PollCard"
import Publish from "./components/Publish"
import Search from "./components/Search"
import BoardInfo from "./components/BoardInfo"
import HalvingCountdown from "./components/HalvingCountdown"
import HalvingCountdownWidget from "./components/widgets/HalvingCountdown"


function App() {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const referrer = params.get('referrer');
  console.log(referrer)

  const TEST_POLL_POST = {
    id: 999999999,
    amount: 1000000,
    txid: "fewj;ahgfs;amfn"
  }


  if (referrer) {
      localStorage.setItem("referrer", referrer)
  }
  const [pinnedCost, setPinnedCost] = useState(10000000)
  const [amount, setAmount] = useState(0.001)
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("jwt") ? true : false)
  const [ip, setIp] = useState("");
  const [copied, setCopied] = useState(0);
  const [loaded, setLoaded] = useState(true);
  const [darkMode, setDarkMode] = useLocalStorage("dark-mode", false)

  // initialize services

  useEffect( _ => {
    axios.get('https://www.cloudflare.com/cdn-cgi/trace')
      .then(res => setIp((res.data.split("\n")[2] || "").replace("ip=","")))
      .catch(err => console.log(err))
  }, [])


  return (
    <UserContext.Provider value={{pinnedCost, setPinnedCost, amount, setAmount, loggedIn, setLoggedIn, ip, darkMode, setDarkMode}}>
      <ZaddrContext.Provider value={{ copied, setCopied, loaded, setLoaded}}>
        <Router>
          <Switch>
          <Route exact path="/widgets/halvingcountdown" render={(props) => <HalvingCountdownWidget {...props} role="widget" />} />
          <div className={darkMode ? "dark-mode App" : "App"}style={darkMode ? {color: "#eee", background: "#111"} : {}}>
            <Navigation />
            <Switch>
              <Redirect exact from="/" to="/z/all" />
              <Route exact path="/poll" render={() => <PollCard post={TEST_POLL_POST} />} />
              <Route exact path="/directory" render={() => <ZaddrList />} />
              <Route exact path="/boardinfo" render={() => <BoardInfo />} />
              <Route exact path="/search" render={(props) => <Search {...props} />} />
              <Route exact path="/signup" render={(props) => <Signup {...props} />} />
              <Route exact path="/login" render={(props) => <Login {...props} />} />
              <Route exact path="/edit" render={(props) => <EditUserInfo {...props} /> } />
              <Route exact path="/board" component={Board} />
              <Route exact path="/tools/halvingcountdown" component={HalvingCountdown} />
              <Route exact path="/publish" component={Publish} />
              <Route exact path="/about" component={About} />
              <Route exact path="/leaderboard" component={Leaderboard} />
              <Route exact path="/bitcoin" render={_ => window.location.href = "/bitcoin.pdf" } />
              <Route exact path="/z" render={_ => <Redirect to="/z/all" />} />
              <Route exact path="/z/all" render={props => <Board {...props} />} />
              <Route path="/z/all/:page" render={props => <Board {...props} />} />
              <Route path="/board/z/:boardname" render={props => <SubBoard {...props} />} />
              <Route path="/board/post/:id" component={BoardPost} />
              <Route path="/z/post/:id" component={BoardPost} />
              <Route path="/feed/:username" component={UserBoard} />
              <Route path="/board/:page" render={props => <Board {...props} />} />

              <Route path="/zaddr/:zaddr" render={props => <ZaddrPage zaddr={true} copied={copied} setCopied={setCopied} {...props} /> } />
              <Route path="/z/:boardname" render={props => <SubBoard {...props} />} />
              <Route path="/:username" render={props => <ZaddrPage copied={copied} setCopied={setCopied} {...props} /> } />
            </Switch>
          </div>
          </Switch>
        </Router>
      </ZaddrContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
