import React, {useContext} from "react";
import {Link} from "react-router-dom"
import {UserContext} from "../contexts/UserContext"

import logo from "../icons/zecpageslogo.png"

export default function Navigation() {
    const {loggedIn, setLoggedIn} = useContext(UserContext);
    
    const logout = _ => {
        localStorage.removeItem("jwt")
        setLoggedIn(false)
    }

    return(
        <div className="main-nav-placeholder">
            <nav className="main-nav">
                
                    <Link className="zebra-icon" to="/">
                        <span className="emoji">🦓</span>
                        <img alt="zecpages logo" className="logo" src={logo} />
                    </Link>
                    
                <div>
                    <a href="https://faucet.zecpages.com">Get Testnet ZEC</a>
                    <Link to="/board">Board</Link>
                    <Link to="/about">About</Link>
                    {loggedIn 
                    ? <>
                    
                    <Link to="/edit">Edit Your Card</Link>
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