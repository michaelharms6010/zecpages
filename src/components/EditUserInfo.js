import React, {useState, useEffect, useContext} from "react";
import axiosAuth from "../utils/AxiosWithAuth";
import {UserContext} from "../contexts/UserContext";

export default function EditUserInfo ({history}) {
    const [user, setUser] = useState({website: "", proofposturl: "",})
    const [httpsString, setHttpsString] = useState("");
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState("");
    const {setLoggedIn} = useContext(UserContext);

    const logout = _ => {
        localStorage.removeItem("jwt")
        setLoggedIn(false)
    }

    useEffect( _ => {
        axiosAuth().get("https://zeitpages-staging.herokuapp.com/users/me")
        .then(res => setUser(res.data))
        .catch(err => console.error(err))
    },[])

    useEffect( _ => {
        if (user.website && !user.website.includes("http")) {
            setHttpsString("https://")
        }
    },[user.website])

    const toggleEditing = _ => {
        if (editing) {
            axiosAuth().put("https://zeitpages-staging.herokuapp.com/users", user)
                .then(res => {setEditing(false);
                     setError("");})
                .catch(err => setError("Your z-address is invalid."));
            
        } else {
            setEditing(true);
        }
    }

    const deleteUser = _ => {
        axiosAuth().delete(`https://zeitpages-staging.herokuapp.com/users/`)
        .then(res => {
            setUser({website: ""});
            logout();
            history.push("/");   
    })
        .catch(err => {console.error(err)
            
        });
    }
    const handleChange = e => {
        setUser({...user, [e.target.name] : e.target.value})
    }

    return(
        <div className="zaddr-card">
            {!editing
            ?
            <>
            <h2>{user.username}</h2>
            <p>{user.zaddr}</p>
            <div className="card-bottom-row">
                {user.proofposturl ? <a href={user.proofposturl}>Proof</a> : null}
                {user.website ? <a href={`${httpsString}${user.website}`}>Website</a> : null}
                {user.twitter ? <a href={`https://twitter.com/${user.twitter}`}>Twitter: @{user.twitter}</a> : null}
                {user.email ? <span>{user.email}</span> : null}
            </div>
            </>
            : 
            <>
            <h2>{user.username}</h2>
            <textarea 
                className="zaddr-input"
                name="zaddr"
                onChange={handleChange}
                value={user.zaddr} 
                placeholder="Paste your z-address here"
            />
            <div className="card-bottom-row">
            
                <input
                className="details-input"
                name="proofposturl"
                onChange={handleChange}
                value={user.proofposturl} 
                placeholder="Proof of identity"/>
                <input
                className="details-input"
                name="website"
                onChange={handleChange}
                value={user.website}
                placeholder="Website" />
                <input
                className="details-input"
                name="twitter"
                onChange={handleChange}
                value={user.twitter}
                placeholder="Twitter" />
                <input
                className="details-input"
                name="email"
                onChange={handleChange}
                value={user.email}
                placeholder="Email" />
            </div>
            </>}
            {error ? <p className="error-text">{error}</p> : null}
            <button onClick={toggleEditing}>{editing? "Submit" : "Edit"}</button>
            <button onClick={deleteUser}>Delete Your Entry</button>
        </div>
    )

}