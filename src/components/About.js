import React from "react";
import mike from "../mike.jpg"
export default function About() {
    return (
        <div className="about-page">
            <div className="about-content">
                <h1>About the site</h1>
                <p>ZECpages is a public director of zcash users. "Take it easy" is the ZECpages motto. A good reason to swing by is if you want to chat and make new friends.</p>
            </div>
            <div className="about-content">
                <h2>Want to join in? Don't have a z-address?</h2>
                <a target="_new" href="https://www.zecwallet.co/"><button className="cta">Get started in under a minute!</button></a>
            </div>
            <div className="about-content">
                <h2>About the Creator</h2>
                <img alt="a silly picture of Mike" src={mike} />
                <p>Hi! I'm Mike! I'm a friendly full-stack web developer interested in cryptocurrency, privacy, robots, carnivory, and piano. You can contact me on <a href="https://twitter.com/michaelharms70">Twitter</a> or via shielded ZEC memo: zs1q4jdaenhv5pdn4uqn86qekt7j2dch66uuszyp05ywne8z7yh56dhqjekpqle72skfl8ycd86ew4</p>
            </div>
         </div>
    )
}