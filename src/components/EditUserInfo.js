import React, {useState, useEffect, useContext} from "react";
import axiosAuth from "../utils/AxiosWithAuth";
import {UserContext} from "../contexts/UserContext";
import {ZaddrContext} from "../contexts/ZaddrContext";
import {confirmAlert} from "react-confirm-alert";
import SubscriptionInfo from "./SubscriptionInfo"
import "react-confirm-alert/src/react-confirm-alert.css"
import zcashLogo from "../zcash-icon.png"
import zcashLogoDark from "../zcash-icon-dark.png"
import {Link} from "react-router-dom"



export default function EditUserInfo ({history}) {
    const [user, setUser] = useState({website: "", proofposturl: "", zaddr: ""})
    const [httpsString, setHttpsString] = useState("");
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState("");
    const {loggedIn, setLoggedIn, darkMode} = useContext(UserContext);
    const [showReferralInfo, setShowReferralInfo] = useState(false)
    const zaddrRegex = /^zs[a-z0-9]{76}$/;
    const uaddrRegex = /u1\w{211}/
    const proofRegex = /([a-z0-9][a-z0-9-]*\.)+[a-z0-9][a-z0-9-]/;
    const viewkeyRegex = /^zxviews\w{278}$/
    const logout = _ => {
        localStorage.removeItem("jwt")
        setLoggedIn(false)
    }

    useEffect( _ => {
        axiosAuth().get("https://be.zecpages.com/users/me")
        .then(res => { if (res.data) localStorage.setItem("user_id", res.data.id); setUser(res.data)})
        .catch(err => console.error(err))
    },[])

    useEffect( _ => {
        if (user.website && !user.website.includes("http")) {
            setHttpsString("https://")
        }
    },[user.website])

    const toggleEditing = _ => {
        if (editing) {
            if (!zaddrRegex.test(user.zaddr) && !uaddrRegex.test(user.zaddr)) {
                setError("That z-address is invalid.")
            } else if(user.viewing_key && !viewkeyRegex.test(user.viewing_key)) {
                setError("That viewing key looks invalid.")
            } else if (user.proofposturl && !proofRegex.test(user.proofposturl)) {
                setError("Your proof of identity should link to a post on another website that indicates your ownership of this account.")
            }
            else {
            console.log(user)
            axiosAuth().put("https://be.zecpages.com/users", user)
                .then(res => {
                    setUser(res.data);
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
                        setUser({website: ""});
                        logout();
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

    const handleZaddrChange = e => {
        e.target.value = e.target.value.replace(/[ \n]/gi, "")
        setUser({...user, [e.target.name] : e.target.value})
    }

    return(
        
        <>
        {loggedIn ?
        <div className={darkMode ? "zaddr-card dark-mode" : "zaddr-card"}>
            {user.username ? null : darkMode ? <img style={{width: "150px", height: "150px"}}  id="spinner" alt="spinning zcash logo" src={zcashLogoDark} /> : <img style={{width: "150px", height: "150px"}}  id="spinner" alt="spinning zcash logo" src={zcashLogo} />}
            {!editing
            ?
            <>
            <h2><Link to={`/${user.username}`}>{user.username}</Link></h2>
            {user.description ? <p className="user-description">{user.description}</p> : null }
            <p>{user.zaddr}</p>
            {!!user.viewing_key && <p>Viewing key: zxviews...{user.viewing_key.slice(275)} <button id="private-board-activation-button" disabled>Activate private board<br/>(coming soon)</button></p>}
            
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
            <textarea 
                maxLength="512"
                className="desc-input"
                name="description"
                onChange={handleChange}
                value={user.description} 
                placeholder="A Brief Description of yourself (Limit 512 Chars)"
            />
            <textarea 
                maxLength="128"
                className="zaddr-input"
                name="zaddr"
                onChange={handleZaddrChange}
                value={user.zaddr} 
                placeholder="Paste your z-address here"
            />
            <textarea 

                maxLength="285"
                className="zaddr-input view-key-input"
                name="viewing_key"
                onChange={handleZaddrChange}
                value={user.viewing_key} 
                placeholder="Paste a view key here"
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
            {/* <button onClick={deleteUser}>Delete Your Entry</button> */}
        </div>
        : <div className="zaddr-card" >
            <h3>You must log into edit your profile or view subscription information.</h3>
        </div>}
        {loggedIn && <div className={darkMode ? "zaddr-card dark-mode" : "zaddr-card"}>
                <h2>Referrals{" "}<span style={{userSelect: "none", width: "15px", display: 'inline-block', cursor: "pointer"}} onClick={_ => setShowReferralInfo(!showReferralInfo)}>{!showReferralInfo ? "+" : "-" }</span></h2>
                {showReferralInfo &&
                <>
                <p>You can refer users to ZECpages by sharing the following link. <br/>You'll earn .0001 ZEC for every ♥ Like your referrered users receive.</p>
                <p>https://zecpages.com/?referrer={user.username}</p>
                <hr></hr>
                <h2>Referral Tracker</h2>
                <p>⛏ Under Construction ⛏</p>
                {/* {referrals.map(user => {
                    <div className="referral-tracker-pair">
                        <p>{user.username}</p>
                        <p>{user.likes}</p>
                    </div>
                })} */}
                </>}

        </div>}
        {/* {loggedIn && <SubscriptionInfo />} */}
        </>

    )

}