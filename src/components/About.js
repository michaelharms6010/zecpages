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
                <h2>About ZECpages</h2>
                
                <p>ZECpages is a public directory of Zcash users. "Take it easy" is the ZECpages motto. A good reason to swing by is if you want to chat and make new friends.</p>
                <p style={{fontWeight: "bold"}}><a href="https://github.com/michaelharms6010/fe-zeitpages" target="_new">Github</a> </p>
            </div>
            <div className="about-content">
                <h2>What is Zcash?</h2>
                <p>Zcash (aka ZEC) is Bitcoin + Encryption. Learn about it <a target="_blank" href="https://z.cash">here</a></p>
                <p>A blockchain is public. Blockchain-level privacy is super important.</p>
                <p>Want a lil Zcash to take this blockchain for a spin? <a target="_new" href="https://twitter.com/zecpages">Tweet at ZECpages!</a></p>
                <a target="_new" href="https://www.zecwallet.co/"><button className="cta">Get started in under a minute!</button></a>
            </div>
            <div className="about-content">
                <h2>Team ZECpages</h2>
                <a href="https://twitter.com/michaelharms70">Michael Harms</a>
                <p className="zaddr">zs150xua0qxun6lf7p2rexz2kz2t75aqecaguh80rq2ruaj7vwn9rxuhphgm9qpce4j6runxqm3e2u</p>
               
                <h2 style={{display: 'inline-block', fontSize: "12px", margin: "1% auto", borderRadius: "4px", padding: "5px"}}>ZECpages 2021 cloud costs were <a href="https://grants.zfnd.org/proposals/284405689-1-year-of-zecpages-servers">provided</a> by a <a href="https://zcashomg.org/">Zcash OMG</a> grant. </h2>
            </div>
            <div id="canary" style={{wordBreak: 'break-all', textAlign: 'left'}} className="about-content">
                <h2 style={{textAlign: "center"}}>Canary</h2>
               <code className="canary">
               -----BEGIN PGP SIGNED MESSAGE-----<br/>
               Hash: SHA256<br/>
               <br/>
               As of June 1, 2023, ZECpages.com has not received any National Security Letters or FISA court orders, and we have not been subject to any gag order(s) by a FISA court, or any other similar court(s) of any government. ZECpages has never placed any backdoors in our hardware or software and has not received any requests to do so. ZECpages has never disclosed any user communications to any third party.<br/>
               Recent headlines:<br/>
               US Senate set to pass debt limit suspension bill Thursday night<br/>
               Russia says it repels border incurs<br/>
               ion, strikes on Kyiv kill three<br/>
               Wall Street rises on hopes of Fed pausing hikes, debt ceiling deal cheer<br/>
               -----BEGIN PGP SIGNATURE-----<br/>
               <br/>
               iQEzBAEBCAAdFiEEHR4JGHTE2yF9R32s3x/m0fUOzv4FAmR5QPwACgkQ3x/m0fUO<br/>
               zv6tzQgAiAihAzoMpo/90ZFF4kTxRRoX8IIeSQ+7OUx73V7gj727KDnHEusAYjwo<br/>
               40QoOMo4Vmi6nQkxLnpNWC8U4VYa4pxRIBSH5gsRx9INR7OPlmQi6RqF34pO6kb/<br/>
               qnMETqLhV+koRksBrhisF3GUmtqm6uXpOpydk9evQtM0fFmoRQpF8n2ltA8REExI<br/>
               Q9qUmr05XVrJaZwapIuFtqVxyharqDNGHjm710JYm+SZ63Pk1YHOBq67+X3kkx/1<br/>
               eLUSihaHEaiH1Q8pLAyJERFFCrsSqZrHMM7QdUv91UKrmL0FicQ3sEooWXxTpcIR<br/>
               ruhW/cBR9Bby84uwnqocG9ORWiYgGw==<br/>
               =FnQt<br/>
               -----END PGP SIGNATURE-----<br/>
                <br/>
               </code>
               <hr style={{border: "1px solid black", borderBottom: "none"}} />
               <code>
                gpg --keyserver keys.gnupg.net --recv-key F50ECEFE<br/><br/>
                Fingerprint: 1D1E 0918 74C4 DB21 7D47  7DAC DF1F E6D1 F50E CEFE<br/><br/>
                gpg --verify zecpages_canary_message.asc<br/><br/>
               </code>
            </div>
            <p>Your ip is {ip || "not visible. Nice."}. Think about that.</p>
         </div>
    </> 
    )
}