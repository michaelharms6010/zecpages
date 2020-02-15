import React, {useState, useEffect, useContext} from "react";
import {copyTextToClipboard } from "../utils/copy";
import ReactGA from "react-ga";

import proofactive from "../icons/proof-active.png";
import proofinactive from "../icons/proof-inactive.png";
import twitteractive from "../icons/twitter-active.png";
import twitterinactive from "../icons/twitter-inactive.png";
import websiteactive from "../icons/website-active.png";
import websiteinactive  from "../icons/website-inactive.png";
import emailactive from "../icons/email-active.png";
import emailinactive from "../icons/email-inactive.png";

import {ZaddrContext} from "../contexts/ZaddrContext"
import axiosAuth from "../utils/AxiosWithAuth";

export default function ZaddrCard ({match, history, copied, setCopied}) {
    const [user, setUser] = useState({website: "", username: ""});
    const { zaddrs } = useContext(ZaddrContext);

    useEffect( _ => {
        let userInfo = zaddrs.find(item => match.params.username.toLowerCase() === item.username.toLowerCase())
        
        if (userInfo) {
            setUser(userInfo)
        } else if (!userInfo && zaddrs.length > 0) {
            if(match.params.username === "about" 
            || match.params.username === "edit" 
            || match.params.username === "about" 
            || match.params.username === "signup"
            || match.params.username === "login") {
                setUser({website: "", username: ""})
                return
            }
            history.push("/")
        }
    },[zaddrs])
  
    const [httpsString, setHttpsString] = useState("");
    useEffect( _ => {
        if (user.website && !user.website.includes("http")) {
            setHttpsString("https://")
        }
    },[user.website])

    const handleCopy = ( zaddr, id) => {
        copyTextToClipboard(zaddr)
        setCopied(user.id)
        ReactGA.event({category: "User", action: `Copied a zaddr`});
    }
      

    return(
        <>
        {user.username ? 
        <div className="zaddr-card">
            <h2>{user.username}</h2>
            <div className="card-top-row">
                <p>{user.zaddr}</p>
                <button onClick={_ => handleCopy(user.zaddr, user.id)}>{user.id === copied ? "Copied!" : "Copy Zaddr"}</button>
            </div>
            <div className="card-bottom-row">
                {user.proofposturl ? <a target="_new" href={user.proofposturl}><img alt="green check mark" src={proofactive} /></a> : <img alt="white check mark" src={proofinactive} />}
                {user.website ? <a target="_new" href={`${httpsString}${user.website}`}><img alt="dark connected world" src={websiteactive} /></a> : <img alt="light connected world" src={websiteinactive} />}
                {user.twitter ? <a target="_new" href={`https://twitter.com/${user.twitter}`}><img alt="dark twitter logo" src={twitteractive} /></a> : <img alt="light twitter logo"src={twitterinactive} />}
                {user.email ? <a href={`mailto:${user.email}`}><img alt="dark envelope" src={emailactive} /></a> : <img alt="light envelope" src={emailinactive} />}
            </div>
        </div>
        : null}
        </>
    )

}