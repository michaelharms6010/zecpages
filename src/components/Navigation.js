import React, {useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom"

export default function Navigation() {

    return(
        <nav className="main-nav">
            <div>
                <Link to="/">Home</Link>
            </div>
            <div>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
            </div>
        </nav>
    )

}