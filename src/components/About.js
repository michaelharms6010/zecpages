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
                <p>Zcash is Bitcoin + Encryption. </p>
                <p>A blockchain is public. Blockchain-level privacy is super important.</p>
                <p>Want a lil Zcash to take this ole blockchain for a spin? <a target="_new" href="https://twitter.com/zecpages">Tweet at ZECpages!</a></p>
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
                <Link to="/noonervision" style={{textDecoration: "none"}}><h2 style={{margin: "1% auto", borderRadius: "8%", padding: "20px", width: "300px", color: "#ddd", background: "black"}}>Graphic Design by <ShieldIcon /><span style={{color: "#bec0fe" }}>noonervision</span><ShieldIcon /></h2></Link>
            </div>
            <div id="canary" style={{textAlign: 'left'}} className="about-content">
                <h2 style={{textAlign: "center"}}>Canary</h2>
               <code  className="canary">
              -----BEGIN PGP SIGNED MESSAGE-----<br/>
                Hash: SHA256<br/>
                <br/>
                As of March 4, 2021, ZECpages.com has not received any National Security Letters or FISA court orders, and we have not been subject to any gag order(s) by a FISA court, or any other similar court(s) of any government. ZECpages has never placed any backdoors in our hardware or software and has not received any requests to do so. ZECpages has never disclosed any user communications to any third party. No searches or seizures of any kind have ever been performed on ZECpages assets.<br/>
                <br/>
                Recent headlines:<br/>
                Voter ID bill sails out of the House on final vote, moves to the Senate - https://news.yahoo.com/voter-id-bill-sails-house-024700764.html<br/>
                <br/>
                White House responds to Cuomo allegations: 'Every woman coming forward should be heard' - https://news.yahoo.com/white-house-press-briefing-cuomo-allegations-222007718.html
                <br/><br/>
                -----BEGIN PGP SIGNATURE-----
                <br/><br/>
                iQEzBAEBCAAdFiEEHR4JGHTE2yF9R32s3x/m0fUOzv4FAmBA96EACgkQ3x/m0fUO
                zv5svwgApKaBsX1XpH8cATmPO0+1kul3iOUrXQC1MVd7jgO8A0tP6aswsLl8ix2y
                ql7OoshuinUbahGKVk+ddxNjm3tnng+x34jSgJQzz/Y6Om51gLCZiyOh8OIEUpXC
                81qB8q7I76HjXb5FACgwJ5E8yvSZyD+uet9T9bBEQF6ToXkFOQNsKzkKqoIi+UB/
                o5iEAHcr8yu4H0aey3ZOIxx9KmxrhxU1S9pi81ZamXBRdAO3jEL3R8UX5wS5qqXE
                1vk5vSaJZxZ3/bUTawQVAKKyiCvu3Ji89W/hd7oD1IrKa8jfHlqx+0xAzh556rqf
                1JGEx0Jd1roqxxnrmky951ZcMySYwA==
                =d88h<br/>
                -----END PGP SIGNATURE-----<br/>


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