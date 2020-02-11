import React, {useState, useEffect} from "react";
import {copyTextToClipboard } from "../utils/copy"

export default function ZaddrCard ({user}) {
    const [httpsString, setHttpsString] = useState("")

    useEffect( _ => {
        if (user.website && !user.website.includes("http")) {
            setHttpsString("https://")
        }
    },[user.website])


      
      

    return(
        <div className="zaddr-card">
            <h2>{user.username}</h2>
            <div className="card-top-row">
                <p>{user.zaddr}</p>
                <button onClick={_ => copyTextToClipboard(user.zaddr)}>Copy Zaddr</button>
            </div>
            <div className="card-bottom-row">
                {user.proofposturl ? <a href={user.proofposturl}>Proof</a> : null}
                {user.website ? <a href={`${httpsString}${user.website}`}>Website</a> : null}
                {user.twitter ? <a href={`https://twitter.com/${user.twitter}`}>Twitter: @{user.twitter}</a> : null}
                {user.email ? <span>{user.email}</span> : null}
            </div>
        </div>
    )

}