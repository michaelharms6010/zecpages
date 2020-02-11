import React, {useState, useContext} from "react";
import axios from "axios";
import {UserContext} from "../contexts/UserContext";

export default function Login({history}) {
    const {setLoggedIn} = useContext(UserContext);
    const [formInfo, setFormInfo] = useState({username: "", password: ""});
    const [error, setError] = useState("");

    const handleChange = e => {
        setFormInfo({...formInfo, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.post("https://zeitpages-staging.herokuapp.com/auth/login", formInfo)
            .then(res => {
                localStorage.setItem("jwt", res.data.token);
                setLoggedIn(true);
                history.push("/edit")
            })
            .catch(err => {
                if (error.status === 401) {
                    setError("Invalid Credentials.")
                }
                console.error(err)})
    }
    
    return (
    <div className="auth-form">
        <h2>Log in to make edits</h2>
        <form onSubmit={handleSubmit}>   
            <input
            name="username"
            type="text"
            value={formInfo.username}
            onChange={handleChange}
            placeholder="username" />
            
            <input
            name="password"
            type="password"
            value={formInfo.password}
            onChange={handleChange}
            placeholder="password" />
            {error ? <p className="error-text">{error}</p> : null}
            <button>Submit</button>
        </form> 
    </div>
    )
}