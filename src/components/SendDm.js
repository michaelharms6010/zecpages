import React, {useState, useContext, useEffect} from 'react';
import {UserContext} from "../contexts/UserContext";
import URLSafeBase64 from 'urlsafe-base64';
import QRCode from "qrcode.react"
import CopyIcon from "./CopyIcon"
var Buffer = require('buffer/').Buffer

export default function SendDm({userName, userZaddr}) {
    const [content, setContent] = useState("")
    const [uri, setUri] = useState("")
    const {darkMode} = useContext(UserContext)
    useEffect(_ => {
        setUri(`zcash:${userZaddr}?amount=0.00000001&memo=${URLSafeBase64.encode(Buffer.from(content))}`)
    }, [content])
    return (
        <>
            <h3 style={{margin: "10px 0 0 0"}}>Send ZEC to {userName}:</h3>
            <div className="DM-form">
                <div>
                <label style={{display: 'block'}}>Memo</label>
                <textarea 
                maxlength="500" 
                placeholder="Type your message, then scan the QR code from your wallet app." 
                value={content} 
                onChange={e => { setContent(e.target.value) }} />
                </div>
                <QRCode bgColor={darkMode ? "#111111" : 'black'} fgColor={darkMode ? "#087f73" : '#bec0fe'} style={{display: 'inline-block'}} includeMargin={true} size={256} value={uri} />
            </div>
            <p>
                {uri}
                <CopyIcon value={uri} />
            </p>
           
        </>
    )
}