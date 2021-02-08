import React, {useContext} from "react";
import {Link} from "react-router-dom"
import {UserContext} from "../contexts/UserContext"

import logo from "../icons/zecpageslogo.png"
import whitestripes from "../icons/negative-space-logo.png"

export default function Navigation() {
    const {loggedIn, setLoggedIn, darkMode, setDarkMode} = useContext(UserContext);
    
    const logout = _ => {
        localStorage.removeItem("jwt")
        setLoggedIn(false)
    }

    return(
        <div className="main-nav-placeholder">
            <nav className="main-nav">
                
                    <Link className="zebra-icon" to="/board">
                        <img src={whitestripes} className="negative-space-zebra"/>
                        <img alt="zecpages logo" className="logo" src={logo} />
                        

                    </Link>
                    
                    
                <div className="main-nav-inner">
                    <input type="checkbox" className="dark-mode-toggle" checked={darkMode} value={darkMode} onChange={ _ => setDarkMode(!darkMode)} />
                    <Link to="/z/all/1">Board</Link>
                    <Link to="/directory">Users</Link>
                    <Link className="about-link" to="/about">About</Link>
                    <a className="api-link" href="https://github.com/michaelharms6010/be-zeitpages/" rel="noopener noreferrer" target="_blank">API</a>
                    {loggedIn 
                    ? <>
                    
                    <Link to="/edit">Profile</Link>
                    <Link onClick={logout}>Log Out</Link>
                    </>
                    : <>
                    <Link to="/signup">Sign Up</Link>
                    <Link to="/login">Login</Link>
                    </> }
                </div>
            </nav>
        </div>
    )

}