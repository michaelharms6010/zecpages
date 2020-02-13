import React, {useState, useContext} from "react";
import axios from "axios";
import {UserContext} from "../contexts/UserContext";

export default function Login({history}) {
    const [formInfo, setFormInfo] = useState({username: "", password: ""});
    const {setLoggedIn} = useContext(UserContext);
    const handleChange = e => {
        setFormInfo({...formInfo, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.post("https://be.zecpages.com/auth/register", formInfo)
            .then(res => {
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
            <button>Submit</button>
        </form> 
    </div>
    )
}