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
                <h2>About the site</h2>
                
                <p>ZECpages is a public directory of Zcash users. "Take it easy" is the ZECpages motto. A good reason to swing by is if you want to chat and make new friends.</p>
                <p style={{fontWeight: "bold"}}><a href="https://github.com/michaelharms6010/fe-zeitpages" target="_new">Source Code</a> </p>
            </div>
            <div className="about-content">
                <h2>What is Zcash?</h2>
                <p>Zcash is Bitcoin + Encryption. </p>
                <p>A blockchain is public. Blockchain-level privacy is super important.</p>
                <p>Want a lil Zcash to take this ole blockchain for a spin? <a target="_new" href="https://twitter.com/zecpages">Tweet at Zecpages!</a></p>
                <a target="_new" href="https://www.zecwallet.co/"><button className="cta">Get started in under a minute!</button></a>
            </div>
            <div className="about-content">
                <h2>lightwalletd server</h2>
                <p><strong style={{marginTop: "10px"}}>https://lightwalletd.zecpages.com:443</strong></p>
            </div>
            <div className="about-content">
                <h2>About the Creator</h2>
                <p className="zaddr">zs1q4jdaenhv5pdn4uqn86qekt7j2dch66uuszyp05ywne8z7yh56dhqjekpqle72skfl8ycd86ew4</p>
                <Link to="/noonervision" style={{textDecoration: "none"}}><h2 style={{margin: "1% auto", borderRadius: "8%", padding: "20px", width: "300px", color: "#ddd", background: "black"}}>Graphic Design by <ShieldIcon /><span style={{color: "#bec0fe" }}>noonervision</span><ShieldIcon /></h2></Link>
            </div>
            <div id="canary" style={{textAlign: 'left'}} className="about-content">
                <h2 style={{textAlign: "center"}}>Canary</h2>
               <code  className="canary">
               -----BEGIN PGP SIGNED MESSAGE-----<br/>
                Hash: SHA256<br/><br/>

                As of January 20th, 2021, Zecpages.com has not received any National Security Letters or FISA court orders, and we have not been subject to any gag order(s) by a FISA court, or any other similar court(s) of any government. Zecpages has never placed any backdoors in our hardware or software and has not received any requests to do so. Zecpages has never disclosed any user communications to any third party. No searches or seizures of any kind have ever been performed on Zecpages assets.<br/><br/>

                Recent headlines:<br/>
                DHS pauses some deportations for 100 days - https://www.cnn.com/2021/01/20/politics/homeland-security-pause-some-deportations/index.html<br/><br/>

                Amanda Gorman calls on Americans - https://www.cnn.com/2021/01/20/politics/amanda-gorman-inauguration-poem-trnd/index.html<br/><br/>

                -----BEGIN PGP SIGNATURE-----<br/><br/>

                iQEzBAEBCAAdFiEEHR4JGHTE2yF9R32s3x/m0fUOzv4FAmAJBgsACgkQ3x/m0fUO<br/>
                zv496gf+Kk4A4pY1cDfPbSMVw67Bvmydc2TF/x/HqChKF1ehrtm4EEoWrWO8waTx<br/>
                1QiCYtJ7T2llcqtqyTQRxumSX8iLnWfjxkD12lwUCX8EQy11GJ9PA+KmZ4dPFcap<br/>
                Nn/dRv8gMaFhNTy1qrPncN/Le6k8L4Bgr0r1GAEbGz2MnBZgXL6tpa1YUtmT1j/o<br/>
                iGgbnU4H4UEMobxbtgI15SezxZB+BCvMU/0Olf0sk7bOpGy0wfYjQL5u6LV05vL4<br/>
                WF90FbpnGvvvTO1D9k2lo9VCaNfGvxht7YBBk76HvMckScFSeqOrwn5Hph0SHLZZ<br/>
                ZeqtOLuDQbpvN1dhFCPCzpOGUWIXFQ==<br/>
                =lRxJ<br/>
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