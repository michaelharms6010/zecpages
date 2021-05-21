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
                    As of As of May 21, 2021, ZECpages.com has not received any National Security Letters or FISA court orders, and we have not been subject to any gag order(s) by a FISA court, or any other similar court(s) of any government. ZECpages has never placed any backdoors in our hardware or software and has not received any requests to do so. ZECpages has never disclosed any user communications to any third party. No searches or seizures of any kind have ever been performed on ZECpages assets.<br/>
                    <br/>
                    Recent headlines:<br/>
                    Edward An interview with Emily Wilder, recent Stanford grad fired from AP job over criticisms of Israel - https://www.sfgate.com/politics/article/Emily-Wilder-Associated-Press-Israel-Palestine-AP-16192391.php
                    <br/>
                    <br/>
                    Israel and Palestinian militant group Hamas agree to a ceasefire - https://www.cnn.com/2021/05/20/middleeast/israel-palestinian-gaza-conflict-ceasefire-intl/index.html
                    <br/>
                    <br/>
                    -----BEGIN PGP SIGNATURE-----<br/>
                    <br/>
                    iQEzBAEBCAAdFiEEHR4JGHTE2yF9R32s3x/m0fUOzv4FAmCnpEkACgkQ3x/m0fUO<br/>
                    zv76MggAurUFgnGMvw7Irl/X7n0GZbnrYx3a63BjgXNRVVgu2eY6UxVSG7n7isu2<br/>
                    PSsriyBClcznfnT8NKDszjIytwn3blT49kmDIpd9kj5Ms8lrEmZoHkDaTklUrvOp<br/>
                    fedgw27mEC2NPeigPxd4i6cLWpBlay7E+h1LZqidgp+jRSnliULa4+Qac73cCVPU<br/>
                    yZp31lv02utilvVo5f3Wkvy+SsYlTxfxLKWA92xSA9PjPhmyS5HxlKA+Tatn8Mbm<br/>
                    G8MhIzcSsBoI8f4FhdtfNUy38y3gbOygKyM4OC+5qE/5LZby9MlG1FHqxVTsYcWD<br/>
                    JMlqXFulVgpTSBLZlnybYuUesQkdtw==<br/>
                    =Nw9G<br/>
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