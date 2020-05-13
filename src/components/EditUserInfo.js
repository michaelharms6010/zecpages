import React, {useState, useEffect, useContext} from "react";
import axiosAuth from "../utils/AxiosWithAuth";
import {UserContext} from "../contexts/UserContext";
import {ZaddrContext} from "../contexts/ZaddrContext";
import {confirmAlert} from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"
import ReactGA from "react-ga"


export default function EditUserInfo ({history}) {
    const [user, setUser] = useState({website: "", proofposturl: "",})
    const [httpsString, setHttpsString] = useState("");
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState("");
    const {setLoggedIn} = useContext(UserContext);
    const {zaddrs, setZaddrs} = useContext(ZaddrContext);
    const zaddrRegex = /^zs[a-z0-9]{76}$/;
    const logout = _ => {
        localStorage.removeItem("jwt")
        setLoggedIn(false)
    }

    useEffect( _ => {
        axiosAuth().get("https://be.zecpages.com/users/me")
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
            if (!zaddrRegex.test(editing.zaddr)) {
                setError("That z-address is invalid.")
            } else {
            axiosAuth().put("https://be.zecpages.com/users", user)
                .then(res => {
                    ReactGA.event({category: "User", action: "Edited User"});
                    setUser(res.data);
                    setZaddrs([ ...zaddrs.filter(zaddr => zaddr.id !== user.id ), user].sort( (a, b) => b.id-a.id));
                    setEditing(false);
                    setError("");})
                .catch(err => setError("Your z-address is invalid."));
            }
        } else {
            setEditing(true);
        }
    }

    const deleteUser = _ => {
        confirmAlert({
            title: "Confirm Delete",
            message: "Are you sure you want to remove yourself from the directory? Your account will be deleted.",
            buttons: [
                {
                    label: "Yes",
                    onClick: _ => axiosAuth().delete(`https://be.zecpages.com/users/`)
                    .then( _ => {
                        setZaddrs( ...zaddrs.filter(zaddr => zaddr.id !== user.id ))
                        setUser({website: ""});
                        logout();
                        ReactGA.event({category: "User", action: "Deleted User"});
                        history.push("/");   
                        window.location.reload()
                    })
                    .catch(err => {console.error(err)
                        
                    })
                },
                {
                    label: "No",
                    onClick: _ => console.log("cancelled delete")
                }
            ]
        })




        
    }
    const handleChange = e => {
        setUser({...user, [e.target.name] : e.target.value})
    }

    return(
        <>
        <h2>Edit your listing:</h2>
        <div className="zaddr-card">
            
            {!editing
            ?
            <>
            <h2>{user.username}</h2>
            {user.description ? <p className="user-description">{user.description}</p> : null }
            <p>{user.zaddr}</p>
            
            <div className="card-bottom-row">
                {user.proofposturl ? <div><h3 className="title">Proof Link:</h3> {user.proofposturl}</div> : null}
                {user.website ? <div><h3 className="title">Website:</h3> {`${httpsString}${user.website}`}</div> : null}
                {user.twitter ? <div><h3 className="title">Twitter:</h3> @{user.twitter}</div> : null}
                {user.email ? <div><h3 className="title">Email:</h3> {user.email}</div> : null}
            </div>
            </>
            : 
            <>
            <h2>{user.username}</h2>
            <textarea maxlength="512"
                className="desc-input"
                name="description"
                onChange={handleChange}
                value={user.description} 
                placeholder="A Brief Description of yourself (Limit 512 Chars)"
            />
            <textarea 
                maxlength="128"
                className="zaddr-input"
                name="zaddr"
                onChange={handleChange}
                value={user.zaddr} 
                placeholder="Paste your z-address here"
            />

            <p className="zaddr-link" ><a className="zaddr-a" target="_new" href="https://www.zecwallet.co/">Don't have a zaddr yet? Get one!</a></p>
            <div className="card-bottom-row-form">
            
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
            <button onClick={toggleEditing}>{editing? "Submit" : "Edit Info"}</button>
            <button onClick={deleteUser}>Delete Your Entry</button>
        </div>
        </>
    )

}