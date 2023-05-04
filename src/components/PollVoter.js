import React, {useState, useContext} from 'react';
import URLSafeBase64 from 'urlsafe-base64';
import QRCode from "qrcode.react"
import CopyIcon from "./CopyIcon"
var Buffer = require('buffer/').Buffer
const boardZaddr = "zs1j29m7zdhhyy2eqrz89l4zhk0angqjh368gqkj2vgdyqmeuultteny36n3qsm47zn8du5sw3ts7f"
export default function PollVoter({chosenOption, handleChange, post, poll, darkMode}) {

    const [activePoll, setActivePoll] = useState({
        q: "",
        o1: "",
        o2: "",
        o3: "",
        o4: ""
    })


    const [uri, setUri] = useState("")

    React.useEffect(_ => {
        setUri(`zcash:${boardZaddr}?amount=${0.001}&memo=${URLSafeBase64.encode(Buffer.from(`VOTE::${post.txid}::${chosenOption}`))}`)
    }, [post, poll, chosenOption])

    

    React.useEffect( _ => {
        setActivePoll(JSON.parse(poll))
    },[poll])
    return( 
        <div>
        <form>
            <h2 style={{textAlign: 'center'}}>{activePoll.q}</h2>
            <div className="poll-options">
                {activePoll.o1 && <div className="form-pair">
                <input
                    className="poll-radio"
                    id="o1"
                    value="1"
                    name="poll-vote"
                    type="radio" 
                    checked={chosenOption == 1}
                    onChange={handleChange}
                    /><label for="o1">{activePoll.o1}</label></div> }
                {activePoll.o2 && <div className="form-pair">
                <input 
                    className="poll-radio"
                    id="o2"
                    value="2"
                    name="poll-vote" 
                    onChange={handleChange}
                    checked={chosenOption == 2}
                    type="radio" /><label for="o2">{activePoll.o2}</label></div> }
                {activePoll.o3 &&<div className="form-pair"> 
                <input 
                    className="poll-radio"
                    id="o3"
                    value="3"
                    name="poll-vote"
                    onChange={handleChange}
                    checked={chosenOption == 3}
                    type="radio" /><label for="o3">{activePoll.o3}</label></div>}
                {activePoll.o4 && <div className="form-pair">
                <input 
                     className="poll-radio"
                     id="o4"
                     value="4"
                     name="poll-vote"
                     onChange={handleChange}
                     checked={chosenOption == 4}
                     type="radio" /><label for="o4">{activePoll.o4}</label></div> }
            </div>
        </form>
        {chosenOption && 
        <>
        <hr />
            <div style={{margin: '0 auto', textAlign: 'center'}}>
                <h3>Send your vote with ZECwallet:</h3>
                <QRCode bgColor={darkMode ? "#ccc" : '#d1d2ff'} fgColor={darkMode ? post.amount >= 10000000 ? "#220005" : "#000126" : post.amount >= 10000000 ? "#58000f" : '#000126'} style={{display: 'inline-block', margin: '0 auto'}} includeMargin={true} size={256} value={uri} />
                <p>
                    <code style={{wordBreak: 'break-word'}}>{uri}</code>
                    <CopyIcon value={uri} />
                </p>
            </div> 
        </>   
        }
        </div>
    )
}