import React from "react";
import mike from "../mike.jpg"
import {Link} from 'react-router-dom';
import { UserContext } from "../contexts/UserContext"
import shieldicon from "../icons/shieldicon.gif"

export default function About() {
    const { ip, darkMode } = React.useContext(UserContext);

    React.useEffect(_ => {
        window.scrollTo(0, 0)
    },[])

    return (
        <div style={{color: "#111"}} className="about-page">
            <div className="about-content">
                <h2>About the site</h2>
                
                <p>ZECpages is a public directory of zcash users. "Take it easy" is the ZECpages motto. A good reason to swing by is if you want to chat and make new friends.</p>
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
                <img style={{width: "200px", height: "200px"}} className="mike-pic" alt="Mike looking silly" src={mike} />
                <p>Hi! I'm Mike! I'm a friendly web developer interested in human autonomy, the impending Golden Age, privacy, robots, carnivory, and piano. You can contact me on <a href="https://twitter.com/michaelharms70">Twitter</a> or via shielded ZEC memo:</p>
                <p className="zaddr">zs1q4jdaenhv5pdn4uqn86qekt7j2dch66uuszyp05ywne8z7yh56dhqjekpqle72skfl8ycd86ew4</p>
                <p>I'd love to hear about your experience using this app and any features or improvements you'd like to see!</p>

                <Link to="/noonervision" style={{textDecoration: "none"}}><h2 style={{margin: "1% auto", borderRadius: "8%", padding: "20px", width: "300px", color: "#ddd", background: "black"}}>Graphic Design by <img src={shieldicon} className="shield-icon" /><span style={{color: "#bec0fe" }}>noonervision</span><img src={shieldicon} className="shield-icon" /></h2></Link>
            </div>
            <p>Your ip is {ip}. Learn about network-level privacy from Naomi Brockwell <a target="_new" href="https://www.youtube.com/watch?v=KXEe2kqiYIM">here.</a></p>
         </div>
    )
}