import React, {useState, useEffect} from "react";
import axiosAuth from "../utils/AxiosWithAuth";


export default function EditUserInfo () {
    const [user, setUser] = useState({website: "", proofposturl: "",})
    const [httpsString, setHttpsString] = useState("")
    const [editing, setEditing] = useState(false)

    useEffect( _ => {
        axiosAuth().get("https://zeitpages-staging.herokuapp.com/users/me")
        .then(res => setUser(res.data))
        .catch(err => console.error(err))
    },[])

    useEffect( _ => {
        if (!user.website.includes("http")) {
            setHttpsString("https://")
        }
    },[user.website])

    const toggleEditing = _ => {
        console.log(user);
        if (editing) {
            axiosAuth().put("https://zeitpages-staging.herokuapp.com/users", user)
                .then(res => setEditing(false))
                .catch(err => console.error(err));
            
        } else {
            setEditing(true);
        }
    }

    const deleteUser = id => {
        axiosAuth.delete(`https://zeitpages-staging.herokuapp.com/users/${id}`)
        .then(res => setUser({website: ""}))
        .catch(err => console.error(err));
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
            <h2 style={{marginBottom: "0"}}>{user.username}</h2>
            <label>z-address</label>
            <textarea 
                className="zaddr-input"
                name="zaddr"
                onChange={handleChange}
                value={user.zaddr} 
            />
            <div className="card-bottom-row">
            
                <input
                name="proofposturl"
                onChange={handleChange}
                value={user.proofposturl} 
                placeholder="Proof of identity"/>
                <input
                name="website"
                onChange={handleChange}
                value={user.website}
                placeholder="Website" />
                <input
                name="twitter"
                onChange={handleChange}
                value={user.twitter}
                placeholder="Twitter" />
                <input
                name="email"
                onChange={handleChange}
                value={user.email}
                placeholder="Email" />
            </div>
            </>}
            <button onClick={toggleEditing}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete Your Entry</button>
        </div>
    )

}