import React, {useContext} from "react";
import {Link} from "react-router-dom"
import {UserContext} from "../contexts/UserContext"

import logo from "../icons/zecpageslogo.png"

export default function Navigation() {
    const {loggedIn, setLoggedIn, darkMode, setDarkMode} = useContext(UserContext);
    
    const logout = _ => {
        localStorage.removeItem("jwt")
        setLoggedIn(false)
    }

    return(
        <div className="main-nav-placeholder">
            <nav className="main-nav">
                
                    <Link className="zebra-icon" to="/directory">
                        <span aria-label='Zebra' role='img' className="emoji">🦓</span>
                        <img alt="zecpages logo" className="logo" src={logo} />
                        

                    </Link>
                    
                    
                <div className="main-nav-inner">
                    <input type="checkbox" className="dark-mode-toggle" checked={darkMode} value={darkMode} onChange={ _ => setDarkMode(!darkMode)} />
                    <Link to="/board">Board</Link>
                    <Link to="/directory">Zaddrs</Link>
                    <Link className="about-link" to="/about">About</Link>
                    {loggedIn 
                    ? <>
                    
                    <Link to="/edit">Edit Card</Link>
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