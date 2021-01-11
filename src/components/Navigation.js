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
                
                    <Link className="zebra-icon" to="/">
                        <span className="emoji">🦓</span>
                        <img alt="zecpages logo" className="logo" src={logo} />
                        

                    </Link>
                    
                    
                    <input type="checkbox" className="dark-mode-toggle" checked={darkMode} value={darkMode} onChange={ _ => setDarkMode(!darkMode)} />
                <div>
                    <Link to="/board">Board</Link>
                    <a id="faucet-link" target="_blank" rel="noopener norefferrer" href="https://faucet.zecpages.com">Testnet Faucet</a>
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