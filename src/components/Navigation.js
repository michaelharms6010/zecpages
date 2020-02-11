import React, {useContext} from "react";
import {Link} from "react-router-dom"
import {UserContext} from "../contexts/UserContext"

export default function Navigation() {
    const {loggedIn, setLoggedIn} = useContext(UserContext);
    
    const logout = _ => {
        localStorage.removeItem("jwt")
        setLoggedIn(false)
    }

    return(
        <nav className="main-nav">
            <div>
                <Link to="/">Home</Link>
            </div>
            <div>
                {loggedIn 
                ? <>
                <Link to="/edit">Edit your information</Link>
                <Link onClick={logout}>Log Out</Link>
                </>
                : <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                </> }
            </div>
        </nav>
    )

}