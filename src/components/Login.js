import React, {useState, useContext, useEffect} from "react";
import axios from "axios";
import {UserContext} from "../contexts/UserContext";

export default function Login({history}) {
    const {loggedIn, setLoggedIn} = useContext(UserContext);
    const [formInfo, setFormInfo] = useState({username: "", password: ""});
    const [error, setError] = useState("");

    useEffect(_ => {
        if (loggedIn) {
            history.push("/")
        }
    })

    const handleChange = e => {
        setFormInfo({...formInfo, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.post("https://be.zecpages.com/auth/login", formInfo)
            .then(res => {
                localStorage.setItem("jwt", res.data.token);
                setLoggedIn(true);
                history.push("/edit")
            })
            .catch(err => {
                if (err) {
                    setError("Invalid Credentials.")
                    
                }
            })
    }
    
    return (
    <div className="auth-form">
        <h2>Log in to make edits</h2>
        <form onSubmit={handleSubmit}>
            <label>Username   
            <input
            name="username"
            type="text"
            value={formInfo.username}
            onChange={handleChange}
            /></label>
            
            <label>Password
            <input
            name="password"
            type="password"
            value={formInfo.password}
            onChange={handleChange}
            /></label>
            {error ? <p className="error-text">{error}</p> : null}
            <button>Submit</button>
        </form> 
    </div>
    )
}