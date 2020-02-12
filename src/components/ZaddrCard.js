import React, {useState, useEffect} from "react";
import {copyTextToClipboard } from "../utils/copy";

import proofactive from "../icons/proof-active.png";
import proofinactive from "../icons/proof-inactive.png";
import twitteractive from "../icons/twitter-active.png";
import twitterinactive from "../icons/twitter-inactive.png";
import websiteactive from "../icons/website-active.png";
import websiteinactive  from "../icons/website-inactive.png";
import emailactive from "../icons/email-active.png";
import emailinactive from "../icons/email-inactive.png";

export default function ZaddrCard ({user, copied, setCopied}) {
    const [httpsString, setHttpsString] = useState("");
    

    useEffect( _ => {
        if (user.website && !user.website.includes("http")) {
            setHttpsString("https://")
        }
    },[user.website])


    const handleCopy = ( zaddr, id) => {
        copyTextToClipboard(zaddr)
        setCopied(user.id)
    }
      

    return(
        <div className="zaddr-card">
            <h2>{user.username}</h2>
            <div className="card-top-row">
                <p>{user.zaddr}</p>
                <button onClick={_ => handleCopy(user.zaddr, user.id)}>{user.id === copied ? "Copied!" : "Copy Zaddr"}</button>
            </div>
            <div className="card-bottom-row">
                {user.proofposturl ? <a target="_new" href={user.proofposturl}><img src={proofactive} /></a> : <img src={proofinactive} />}
                {user.website ? <a target="_new" href={`${httpsString}${user.website}`}><img src={websiteactive} /></a> : <img src={websiteinactive} />}
                {user.twitter ? <a target="_new" href={`https://twitter.com/${user.twitter}`}><img src={twitteractive} /></a> : <img src={twitterinactive} />}
                {user.email ? <a href={`mailto:${user.email}`}><img src={emailactive} /></a> : <img src={emailinactive} />}
            </div>
        </div>
    )

}