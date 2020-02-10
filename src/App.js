import React, {useState, useEffect} from 'react';
import {ZaddrContext} from "./contexts/ZaddrContext"
import {Link, BrowserRouter as Router} from "react-router-dom";
import './App.scss';
import ZaddrList from "./components/ZaddrList"
import axiosWithAuth from "./utils/AxiosWithAuth"

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
          <nav>navbar will go here <Link to="/edit" >Edit your information</Link> </nav>
          <ZaddrList />
          
        
        </div>
      </Router>
    </ZaddrContext.Provider>
  );
}

export default App;
