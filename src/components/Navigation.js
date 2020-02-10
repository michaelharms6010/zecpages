import React, {useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom"

export default function Navigation() {

    return(
        <nav className="main-nav">
            <Link to="/login">Login</Link>
            <Link to="/signup">Post your Zaddr</Link>
        </nav>
    )

}