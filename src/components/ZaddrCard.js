import React, {useState, useEffect} from "react";
import {copyTextToClipboard } from "../utils/copy";
import ReactGA from "react-ga";
import QRCode from "qrcode.react";

import proofactive from "../icons/proof-active.png";
import proofinactive from "../icons/proof-inactive.png";
import twitteractive from "../icons/twitter-active.png";
import twitterinactive from "../icons/twitter-inactive.png";
import websiteactive from "../icons/website-active.png";
import websiteinactive  from "../icons/website-inactive.png";
import emailactive from "../icons/email-active.png";
import emailinactive from "../icons/email-inactive.png";
import qricon from "../icons/qr.png"

export default function ZaddrCard ({user, copied, setCopied}) {
    const [httpsString, setHttpsString] = useState("");
    const [proofHttps, setProofHttps] = useState("");
    const [qrVis, setQrVis] = useState(false);
    useEffect( _ => {
        if (user.website && !user.website.includes("http")) {
            setHttpsString("https://")
        }
        if (user.proofposturl && !user.proofposturl.includes("http")) {
            setProofHttps("https://")
        }
    },[user.website, user.proofposturl])

    const handleCopy = ( zaddr, id) => {
        copyTextToClipboard(zaddr)
        setCopied(user.id)
        ReactGA.event({category: "User", action: `Copied a zaddr`});
    }
      
    return(
        <div className="zaddr-card">
            <h2>{user.username}</h2>
            {user.description ? <p className="user-description">{user.description}</p> : null }
            <div className="card-top-row">
                
                <p>{user.zaddr}</p>
                <button className="copy-button" onClick={_ => handleCopy(user.zaddr, user.id)}>{user.id === copied ? "Copied!" : "Copy Zaddr"}</button>
            </div>
            {!qrVis 
                ? null 
                : <QRCode size={256} value={user.zaddr} />}
            <div className="card-bottom-row">              
                {user.proofposturl ? <a target="_new" href={`${proofHttps}${user.proofposturl}`}><img alt="green check mark" src={proofactive} /></a> : <img alt="white check mark" src={proofinactive} />}
                {user.website ? <a target="_new" href={`${httpsString}${user.website}`}><img alt="dark connected world" src={websiteactive} /></a> : <img alt="light connected world" src={websiteinactive} />}
                {user.twitter ? <a target="_new" href={`https://twitter.com/${user.twitter}`}><img alt="dark twitter logo" src={twitteractive} /></a> : <img alt="light twitter logo"src={twitterinactive} />}
                {user.email ? <a href={`mailto:${user.email}`}><img alt="dark envelope" src={emailactive} /></a> : <img alt="light envelope" src={emailinactive} />}
                <img alt="a qr code" className="qr-icon" src={qricon} onClick={_ => setQrVis(!qrVis) } />
            </div>
        </div>
    )
}