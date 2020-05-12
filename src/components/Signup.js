import React, {useState, useContext} from "react";
import axios from "axios";
import {UserContext} from "../contexts/UserContext";
import ReactGA from "react-ga";

export default function Login({history}) {
    const [formInfo, setFormInfo] = useState({username: "", password: "", password2: ""});
    const {setLoggedIn} = useContext(UserContext);
    const handleChange = e => {
        setFormInfo({...formInfo, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.post("https://be.zecpages.com/auth/register", formInfo)
            .then(res => {
                ReactGA.event({category: "User", action: `created account ${formInfo.username} `});
                localStorage.setItem("jwt", res.data.token)
                setLoggedIn(true)
                history.push("/edit")
            })
            .catch(err => console.error(err))
    }
    
    return (
    <div className="auth-form">
        <h2>Register an account to post your zaddr</h2>
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
            <input
            name="password2"
            type="password"
            value={formInfo.password2}
            onChange={handleChange}
            placeholder="Confirm Password" />
            <button>Submit</button>
        </form> 
    </div>
    )
}