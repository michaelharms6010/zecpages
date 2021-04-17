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
                <h2>lightwalletd server</h2>
                <h4 style={{textAlign: "center"}}>ZECpages is powered by its own lightwalletd server. You are welcome to connect as well.</h4>
                <p><strong style={{marginTop: "10px"}}>https://lightwalletd.zecpages.com:443</strong></p>
            </div>
            <div className="about-content">
                <h2>Team ZECpages</h2>
                <a href="https://twitter.com/michaelharms70">Michael Harms</a>
                <p className="zaddr">zs150xua0qxun6lf7p2rexz2kz2t75aqecaguh80rq2ruaj7vwn9rxuhphgm9qpce4j6runxqm3e2u</p>
               
                <h2 style={{display: 'inline-block', fontSize: "12px", margin: "1% auto", borderRadius: "4px", padding: "5px"}}>ZECpages 2021 cloud costs were <a href="https://grants.zfnd.org/proposals/284405689-1-year-of-zecpages-servers">provided</a> by a <a href="https://zcashomg.org/">Zcash OMG</a> grant. </h2>
            </div>
            <div id="canary" style={{textAlign: 'left'}} className="about-content">
                <h2 style={{textAlign: "center"}}>Canary</h2>
               <code  className="canary">
                    -----BEGIN PGP SIGNED MESSAGE-----<br/>
                    Hash: SHA256<br/>
                    <br/>
                    As of April 17, 2021, ZECpages.com has not received any National Security Letters or FISA court orders, and we have not been subject to any gag order(s) by a FISA court, or any other similar court(s) of any government. ZECpages has never placed any backdoors in our hardware or software and has not received any requests to do so. ZECpages has never disclosed any user communications to any third party. No searches or seizures of any kind have ever been performed on ZECpages assets.<br/>
                    <br/>
                    Recent headlines:<br/>
                    Edward Snowden NFT sells for more than $5.4 million - https://www.msn.com/en-us/money/other/edward-snowden-nft-sells-for-more-than-54-million/ar-BB1fJL12<br/>
                    <br/>
                    Edward Snowden Auctions NFT Titled ‘Stay Free’ on Foundation Platform - https://finance.yahoo.com/news/edward-snowden-auctions-nft-titled-100300841.html<br/>
                    <br/>
                    -----BEGIN PGP SIGNATURE-----<br/>
                    <br/>
                    iQEzBAEBCAAdFiEEHR4JGHTE2yF9R32s3x/m0fUOzv4FAmB7CR0ACgkQ3x/m0fUO<br/>
                    zv7YzAgAyqoGKmxyirr+hOc8pfiwKQJqTNYEk0rSaKAVKOTiLgbhDwoa1YLe39Kr<br/>
                    rI3AwKsKerTP8hRngr8w0znvnqUrnP86ubrpQBGx6AWxBPJGok6uMWJZOfgpnx80<br/>
                    jXXLBsS9MIOQmz3bDUSM/V6VQfyxeUyskJr4zqC7lTAEqvnS/imdBuR3hgCGFD81<br/>
                    qNfDlsnH2GdRqA5QYo8yEjYOVRDb+4hePaTC8IsimONgr6oPLaDtAdqr6dfxHnIY<br/>
                    fi3+PV97NGrSsHMCuU25MI56z4kX3saMRytbMQiM2ea+oQqhH0WtZ/+Hu2EhPMo3<br/>
                    e6d0LwDyFsyvr6jVdQLD6fsSN17xfg==<br/>
                    =jUOu<br/>
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
            <p>Your ip is {ip}. Think about that.</p>
         </div>
    </> 
    )
}