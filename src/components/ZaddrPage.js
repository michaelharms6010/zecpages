import React, {useState, useEffect, useContext} from "react";
import {copyTextToClipboard } from "../utils/copy";
import QRCode from "qrcode.react";
import {Link} from "react-router-dom"
import axios from "axios"
import jwt from "jsonwebtoken"

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
import qrdark from "../icons/qrdark.png"
import UserBoard from "../components/UserBoard"
import copyicon from "../icons/zecpagescopyicondaymode01.png"
import copyicondark from "../icons/bignightcopy.png"
import SendDm from "./SendDm"

import {UserContext} from "../contexts/UserContext"
import {ZaddrContext} from "../contexts/ZaddrContext";

export default function ZaddrCard ({match, history, copied, setCopied, zaddr}) {
    const zaddrRegex = /^zs[a-z0-9]{76}$/i
    const uaddrRegex = /u1\w{211}/
    const oaddrRegex = /^u1\w{104}$/
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let query = params.get('subscribe');
    const [user, setUser] = useState({website: "", username: ""});
    const [QRId, setQRId] = useState(false);
    const [proofHttps, setProofHttps] = useState("");
    const { zaddrs } = useContext(ZaddrContext);
    const {darkMode, loggedIn} = useContext(UserContext)
    const [myId, setMyId] = useState(loggedIn && localStorage.getItem("user_id") ? localStorage.getItem("user_id") : null)
    const [done, setDone] = useState(false)
    const [showSubInfo, setShowSubInfo] = useState(!!query)
    const [numMonths, setNumMonths] = useState(1)
    const [inputZaddr, setInputZaddr] = useState("")
    const SUBSCRIBE_ADDRESS = "zs19k7jr4lajl285r96jzuhc4xdkh978qkgqutmla74t9ayxa6rppj2e8z3zcme88lyz90gqz92tam"

    

    useEffect( _ => {
        let userInfo;
        if (localStorage.getItem("jwt") && !localStorage.getItem("user_id")) {
            const decodedToken = jwt.decode(localStorage.getItem("jwt"))
            localStorage.setItem("user_id", decodedToken.id)
            setMyId(decodedToken.id)
        }


        if (zaddr) {
            axios.get(`https://be.zecpages.com/users/zaddr/${match.params.zaddr}`)
            .then(r => {
                userInfo = r;
                if (userInfo) {
                    setUser(userInfo.data)
                } else if (!userInfo) {

                    
                }
            })
            .catch(err => console.log(err))
        } else {
            axios.get(`https://be.zecpages.com/users/${match.params.username}.json`)
            .then(r => {
                userInfo = r;
                if (userInfo) {
                    setUser(userInfo.data)
                } else if (!userInfo) {

                    
                }
            })
            .catch(err => console.log(err))
        }  
        // todos:   
        // get by zaddr endpoint
        
        // get by username endpoint

        
        
 
        setTimeout(_ => setDone(true), 300)
    },[match.params.zaddr, match.params.username])
  
    const [httpsString, setHttpsString] = useState("");

    const isValidZaddr = str => {
        return /^zs[a-z0-9]{76}$/.test(str)
    }

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
    }

    const flagClickedIcon = e => {
        document.querySelector(".copy-icon.icon").classList.add('clicked')
    }
    
    const flagUnClickedIcon = e => {
        document.querySelector(".copy-icon.icon").classList.remove('clicked')
    }
    const showCopyTooltip = e => {
        document.querySelector(".copied-tooltip").classList.add('visible')
        setTimeout(_ => document.querySelector(".copied-tooltip").classList.remove('visible'), 1000)
    }

    const showCopyTooltipById = (id) => {
        document.querySelector(`.copied-tooltip-${id}`).classList.add('visible')
        setTimeout(_ => document.querySelector(`.copied-tooltip-${id}`).classList.remove('visible'), 1000)
    }
      

    return(
        <>
        {user.username ? 
        <>
        <div className={darkMode ? "zaddr-card dark-mode" : "zaddr-card"}>
            <h2>{user.username}<button style={{width: "100px"}} onClick={_ => setShowSubInfo(!showSubInfo)}>{!showSubInfo ? "Send ZEC" : "Hide"} </button></h2>
            {showSubInfo 
                ? <SendDm userZaddr={user.zaddr} userName={user.username} />
                : null}
        
            
            {user.description ? <p className="user-description">{user.description}</p> : null }
            <div className="card-top-row">
                <p>{user.zaddr}</p>
                <button className="copy-button" onClick={_ => handleCopy(user.zaddr, user.id)}>{user.id === copied ? "Copied!" : "Copy Zaddr"}</button>
                
            </div>
            {!QRId 
                ? null 
                : <QRCode bgColor={darkMode ? "#111111" : '#0a5e55'} fgColor={darkMode ? "#087f73" : '#bec0fe'} includeMargin={true} size={256} value={`zcash:${user.zaddr}?amount=0.001`} />} 
            <div className="card-bottom-row">
            {user.proofposturl ? <a target="_new" href={`${proofHttps}${user.proofposturl}`}><img alt="green check mark" src={darkMode ? proofinactive :proofactive} /></a> : <img alt="white check mark" src={darkMode ? proofactive :proofinactive} />}
                {user.website ? <a target="_new" href={`${httpsString}${user.website}`}><img alt="dark connected world" src={darkMode ? websiteinactive :websiteactive} /></a> : <img alt="light connected world" src={darkMode ? websiteactive : websiteinactive} />}
                {user.twitter ? <a target="_new" href={`https://twitter.com/${user.twitter}`}><img alt="dark twitter logo" src={darkMode ? twitterinactive :twitteractive} /></a> : <img alt="light twitter logo"src={darkMode ? twitteractive : twitterinactive} />}
                {user.email ? <a href={`mailto:${user.email}`}><img alt="dark envelope" src={darkMode ? emailinactive : emailactive} /></a> : <img alt="light envelope" src={darkMode ? emailactive : emailinactive} />}
                <img alt="qr code" className="qr-icon" src={darkMode ? qrdark : qricon} onClick={_ => setQRId(!QRId) } />
            </div>
        </div>
        <div className="cta-button-container">
            <button className="cta-button cta-button-silver"><a target="_new" href="https://zecwallet.co/"><img alt="zecwallet logo" src={zecwallet}/>New to Zcash? Get started in ~60 seconds with ZecWallet Lite. (Desktop/Mobile)</a></button>
            <button className="cta-button cta-button-black"><Link to="/directory"><img alt="zecpages logo" src={logo}/>Return to main Z-address Directory</Link></button>
        </div>
        <UserBoard match={match} cardview={true} />
        </>
        : null}
        <div style={{maxWidth: "900px", margin: "30px auto"}}>
            {done && zaddr && !user.username ? (zaddrRegex.test(match.params.zaddr) || uaddrRegex.test(match.params.zaddr) || oaddrRegex.test(match.params.zaddr)) ? <h2 style={{color: darkMode ? "#ccc" : "#111"}}>{match.params.zaddr}<br/> isn't in the ZECpages database.</h2> : <h2 style={{color: darkMode ? "#ccc" : "#111"}}>{match.params.zaddr}<br/> isn't a a valid sapling z-address.</h2>: null}
            {done && !zaddr && !user.username && <h2 style={{color: darkMode ? "#ccc" : "#111"}}>{match.params.username} isn't in the ZECpages database. Try <Link to="/directory">searching the directory</Link>.</h2> }
        </div>
        </>
    )

}