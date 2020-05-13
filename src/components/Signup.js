import React, {useState, useContext} from "react";
import axios from "axios";
import {UserContext} from "../contexts/UserContext";
import ReactGA from "react-ga";

export default function Login({history}) {
    const [formInfo, setFormInfo] = useState({username: "", password: "", password2: ""});
    const [alert, setAlert] = useState("")
    const {setLoggedIn} = useContext(UserContext);
    const handleChange = e => {
        setFormInfo({...formInfo, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (formInfo.password !== formInfo.password2) {
            setAlert("Passwords do not match.");
        } 
        else if (formInfo.password.length < 8) {
            setAlert("Your password should be at least 8 characters long.")
        } 
        else {
            const {username, password} = formInfo;
            axios.post("https://be.zecpages.com/auth/register", {username, password})
                .then(res => {
                        
                        ReactGA.event({category: "User", action: `created account ${formInfo.username} `});
                        localStorage.setItem("jwt", res.data.token)
                        setLoggedIn(true)
                        history.push("/edit")
                    
                })
                .catch(err => console.error(err))
        }
    }
    
    return (
    <div className="auth-form">
        <h2>Register a new account:</h2>
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
            <label>Confirm Password 
            <input
            name="password2"
            type="password"
            value={formInfo.password2}
            onChange={handleChange}
            /></label>
            {alert ? <h5>{alert}</h5> : null}
            <button>Submit</button>
        </form> 
    </div>
    )
}