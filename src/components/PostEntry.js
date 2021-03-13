import React, {useContext} from "react";

import URLSafeBase64 from 'urlsafe-base64';
import QRCode from "qrcode.react"
import {UserContext} from "../contexts/UserContext"
import {copyTextToClipboard} from "../utils/copy"
import copyicon from "../icons/zecpagescopyicondaymode01.png"
import copyicondark from "../icons/bignightcopy.png"
import copyiconb from "../icons/copyiconb.png"
import {flagUnClickedIcon, flagClickedIcon, showCopyTooltip} from "./helpers/icon-helpers"

var Base64 = require("js-base64")
var Buffer = require('buffer/').Buffer
const ab = Math.random() > .9;

const boardZaddr = "zs1j29m7zdhhyy2eqrz89l4zhk0angqjh368gqkj2vgdyqmeuultteny36n3qsm47zn8du5sw3ts7f"
export default function PostEntry({boardName, qrVal, replyBody, formatReplyBody, post, isReply, boardInput, setBoardInput}) {
    const {amount, setAmount, darkMode} = useContext(UserContext)

    

    const handleChange = e => {
        setAmount(+e.target.value)
    }

    const isChosen = e => {
        console.log(e.target.value, amount)
        return +e.target.value === amount
    }

    return (
        <>
        <div className="reply-editor">
        <div className="reply-text-editor">
           
            {!isReply && !boardName && <h2>Post to Board:</h2>}



            {!isReply && !boardName ? <input style={darkMode ? {borderColor: "#ddd", color: "#eee", background:  "#000126"} : {}} placeholder="Defaults to all" name="boardInput" value={boardInput} onChange={e => setBoardInput(e.target.value.replace(/ /g, "_").replace(/(z\/all|z\/|[^a-z0-9_])/ig, ""))}></input> : null}
            <h2>{isReply ? "Write reply:" : boardName ? `Post to z/${boardName}` : "Post text:"}</h2>
            <textarea style={darkMode ? {borderColor: "#ddd", color: "#eee", background:  "#000126"} : {} } maxlength="500" placeholder="Type your message, then scan the QR code from your wallet app." value={replyBody} onChange={e => { formatReplyBody(e.target.value) }} />

        </div>
        {/* #bec0fe #0a5e55*/}
        <div>


        <QRCode bgColor={darkMode ? "#111111" : 'black'} fgColor={darkMode ? post.amount >= 10000000 ? "#C46274" : "#7377EF" : post.amount >= 10000000 ? "#ff879b" : '#bec0fe'} style={{display: 'inline-block', margin: '0 auto'}} includeMargin={true} size={256} value={`zcash:${qrVal}?amount=${amount}&memo=${URLSafeBase64.encode(Buffer.from(`${boardName ? `BOARD::${boardName} ` : boardInput ? `BOARD::${boardInput} ` : ""}${isReply ? `REPLY::${post.id} ` : ""}${replyBody}`))}`} />
        </div>


        </div>    
        <div className="price-selector">   
                <div className="price-selector-pair">             
                <input
                onChange={handleChange}
                name="price"
                type="radio"
                value="0.001" 
                id="0.001" 
                defaultChecked />
                <label for="0.001">Post (.001)</label>
                </div>
                <div className="price-selector-pair">    
                <input
                onChange={handleChange}
                name="price"
                type="radio"
                id="0.01"
                value="0.01" />
                <label for="0.01">Post and <a className="label-link" target="_blank" rel="noopener noreferrer" href="https://twitter.com/zecpagesRAW">Tweet</a> (.01)</label>
                </div>
                <div className="price-selector-pair">    
                <input
                onChange={handleChange}
                name="price"
                type="radio"
                id="0.1"
                value="0.1" />
                <label for="0.1">Highlight (.1)</label>
                </div>
            </div>
            <a className="uri-link" href={`zcash:${boardZaddr}?amount=${amount}${replyBody ? `&memo=${URLSafeBase64.encode(Buffer.from(`${boardInput ? `BOARD::${boardInput} ` : ""}${replyBody}`))}` : ""}`}>
                <code style={{wordBreak: 'break-word'}}>{`zcash:${boardZaddr}?amount=${amount}${replyBody ? `&memo=${URLSafeBase64.encode(Buffer.from(`${boardInput ? `BOARD::${boardInput} ` : ""}${replyBody}`))}` : ""}`}</code></a>
                <span className="copy-icon icon" onMouseDown={flagClickedIcon} onMouseLeave={flagUnClickedIcon} onMouseUp={flagUnClickedIcon} onClick={_ => {copyTextToClipboard(`zcash:${boardZaddr}?amount=${amount}${replyBody ? `&memo=${URLSafeBase64.encode(Buffer.from(`${boardInput ? `BOARD::${boardInput} ` : ""}${replyBody}`))}` : ""}`); showCopyTooltip();}}><img alt="copy" title="Copy to Clipboard" src={ab ? copyiconb : darkMode ? copyicondark : copyicon}></img><span className='copied-tooltip'>Copied!</span></span>
        </>
    )
}