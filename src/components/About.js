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
            <div id="canary" style={{textAlign: 'left'}} className="about-content">
                <h2 style={{textAlign: "center"}}>Canary</h2>
               <code  className="canary">
               -----BEGIN PGP SIGNED MESSAGE-----<br/>
                Hash: SHA256<br/>
                <br/>
                As of January 5, 2023, ZECpages.com has not received any National Security Letters or FISA court orders, and we have not been subject to any gag order(s) by a FISA court, or any other similar court(s) of any government. ZECpages has never placed any backdoors in our hardware or software and has not received any requests to do so. ZECpages has never disclosed any user communications to any third party. No searches or seizures of any kind have ever been performed on ZECpages assets.<br/>
                <br/>
                Recent headlines:<br/>
                Prince Harry accuses Prince William of physical attack in book<br/>
                Mexico arrests capo Ovidio Guzman, son of "El Chapo" - sources<br/>
                Evacuations ordered as California storm knocks out power<br/>
                -----BEGIN PGP SIGNATURE-----<br/>
                <br/>
                iQEzBAEBCAAdFiEEHR4JGHTE2yF9R32s3x/m0fUOzv4FAmO3FZ0ACgkQ3x/m0fUO<br/>
                zv4S5QgAkMTYchJfrpPYtmBSWNwRhbeA16n441jzn4d7ESmubFDKsWXJBpJLcsWd<br/>
                PWF3E9nIIrXHzaT8rZm7ys1GvqhdKiJ//xsZ7I0hUOKzQH8/jpYzMgq875lZ7myY<br/>
                rS2sC1aWw2qyXAQcOutgfW7Krz/NQM8/fAizVBcF4ruM1AlVh3YATsB1Lg9RpZVz<br/>
                v/nWWSv8B/7tTkun5zy0kzhqwkMWpj5WkyT+8sBj+2M7hfXppCfECVYqOojfowv+<br/>
                ovKFOuzpL2IWVkCdH7Feyps6hg4FOQnSaS0Dzv8aiPWeykRNekrjL/0VJLSRuST2<br/>
                L3jaPGpbglhaLEBLEBO0TqD5YkwZww==<br/>
                =gKuB<br/>
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