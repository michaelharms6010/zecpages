import React, {useState, useEffect, useContext} from "react";
import {copyTextToClipboard } from "../utils/copy";
import ReactGA from "react-ga";
import QRCode from "qrcode.react";
import {Link} from "react-router-dom"

import proofactive from "../icons/proof-active.png";
import proofinactive from "../icons/proof-inactive.png";
import twitteractive from "../icons/twitter-active.png";
import twitterinactive from "../icons/twitter-inactive.png";
import websiteactive from "../icons/website-active.png";
import websiteinactive  from "../icons/website-inactive.png";
import emailactive from "../icons/email-active.png";
import emailinactive from "../icons/email-inactive.png";
import zecwallet from "../icons/zecwallet.png";
import logo from "../icons/zecpageslogo.png";
import qricon from "../icons/qr.png"


import {ZaddrContext} from "../contexts/ZaddrContext";

export default function ZaddrCard ({match, history, copied, setCopied}) {
    const [user, setUser] = useState({website: "", username: ""});
    const [QRId, setQRId] = useState(false);
    const { zaddrs } = useContext(ZaddrContext);


    useEffect( _ => {
        let userInfo = zaddrs.find(item => match.params.username.toLowerCase() === item.username.toLowerCase().split(" ").join(""))
        
        if (userInfo) {
            setUser(userInfo)
        } else if (!userInfo && zaddrs.length > 0) {

            
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
        <>
        <div className="zaddr-card">
            <h2>{user.username}</h2>
            {user.description ? <p className="user-description">{user.description}</p> : null }
            <div className="card-top-row">
                <p>{user.zaddr}</p>
                <button className="copy-button" onClick={_ => handleCopy(user.zaddr, user.id)}>{user.id === copied ? "Copied!" : "Copy Zaddr"}</button>
                
            </div>
            {!QRId 
                ? null 
                : <QRCode size={256} value={user.zaddr} />}
            <div className="card-bottom-row">
                {user.proofposturl ? <a target="_new" href={user.proofposturl}><img alt="green check mark" src={proofactive} /></a> : <img alt="white check mark" src={proofinactive} />}
                {user.website ? <a target="_new" href={`${httpsString}${user.website}`}><img alt="dark connected world" src={websiteactive} /></a> : <img alt="light connected world" src={websiteinactive} />}
                {user.twitter ? <a target="_new" href={`https://twitter.com/${user.twitter}`}><img alt="dark twitter logo" src={twitteractive} /></a> : <img alt="light twitter logo"src={twitterinactive} />}
                {user.email ? <a href={`mailto:${user.email}`}><img alt="dark envelope" src={emailactive} /></a> : <img alt="light envelope" src={emailinactive} />}
                <img alt="qr code" className="qr-icon" src={qricon} onClick={_ => setQRId(!QRId) } />
            </div>
        </div>
        <div className="cta-button-container">
            <button className="cta-button cta-button-silver"><a target="_new" href="https://zecwallet.co/"><img alt="zecwallet logo" src={zecwallet}/>New to Zcash? Get started in ~60 seconds with ZecWallet Lite. (Mac/PC/Linux)</a></button>
            <button className="cta-button cta-button-black"><Link to="/"><img alt="zecpages logo" src={logo}/>Return to main Z-address Directory</Link></button>
        </div>
        </>
        : null}
        </>
    )

}