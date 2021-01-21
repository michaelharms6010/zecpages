import React from "react";
import mike from "../mike.jpg"
import {Link} from 'react-router-dom';
import { UserContext } from "../contexts/UserContext"
import ShieldIcon from "./icons/ShieldIcon";

export default function About() {
    const { ip, darkMode } = React.useContext(UserContext);

    React.useEffect(_ => {
        window.scrollTo(0, 0)
    },[])

    return (
        <>

        <div style={{color: "#111"}} className="about-page">
        <div className="about-content">
            <h2>lightwalletd server</h2>
            <p><strong style={{marginTop: "10px"}}>https://lightwalletd.zecpages.com:443</strong></p>
        </div>
            
            <div className="about-content">
                <h2>About the site</h2>
                
                <p>ZECpages is a public directory of Zcash users. "Take it easy" is the ZECpages motto. A good reason to swing by is if you want to chat and make new friends.</p>
                <p style={{fontWeight: "bold"}}><a href="https://github.com/michaelharms6010/fe-zeitpages" target="_new">Source Code</a> </p>
            </div>
            <div className="about-content">
                <h2>What is Zcash?</h2>
                <p>Zcash is a decentralized means of exchange that employs Zero Knowledge Proofs to prevent printing transaction details onto its public ledger.</p>
                <p>When transacting between z-addresses, the sender, receiver, amount, and memo are not shared with anyone else along the way!</p>
                <p>Want a lil Zcash to take this ole blockchain for a spin? <a target="_new" href="https://twitter.com/zecpages">Tweet at Zecpages!</a></p>
                <a target="_new" href="https://www.zecwallet.co/"><button className="cta">Get started in under a minute!</button></a>
            </div>
            <div className="about-content">
                <h2>About the Creator</h2>
                <p className="zaddr">zs1q4jdaenhv5pdn4uqn86qekt7j2dch66uuszyp05ywne8z7yh56dhqjekpqle72skfl8ycd86ew4</p>
                <Link to="/noonervision" style={{textDecoration: "none"}}><h2 style={{margin: "1% auto", borderRadius: "8%", padding: "20px", width: "300px", color: "#ddd", background: "black"}}>Graphic Design by <ShieldIcon /><span style={{color: "#bec0fe" }}>noonervision</span><ShieldIcon /></h2></Link>
            </div>
            <p>Your ip is {ip}. Think about that.</p>
         </div>
    </> 
    )
}