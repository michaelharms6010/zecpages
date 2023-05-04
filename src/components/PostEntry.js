import React, {useContext, useState} from "react";

import URLSafeBase64 from 'urlsafe-base64';
import QRCode from "qrcode.react"
import {UserContext} from "../contexts/UserContext"
import {copyTextToClipboard} from "../utils/copy"
import copyicon from "../icons/zecpagescopyicondaymode01.png"
import copyicondark from "../icons/bignightcopy.png"
import copyiconb from "../icons/copyiconb.png"
import {flagUnClickedIcon, flagClickedIcon, showCopyTooltip} from "./helpers/icon-helpers"

var Buffer = require('buffer/').Buffer
var Base64 = require("js-base64")
const ab = Math.random() > .9;

const INITIAL_POLL =  {
    q: "",
    o1: "",
    o2: "",
    o3: "",
    o4: ""
}

const boardZaddr = "zs1j29m7zdhhyy2eqrz89l4zhk0angqjh368gqkj2vgdyqmeuultteny36n3qsm47zn8du5sw3ts7f"
export default function PostEntry({boardName, qrVal, replyBody, formatReplyBody, post, isReply, boardInput, setBoardInput}) {
    const {amount, setAmount, darkMode} = useContext(UserContext)
    const [isPoll, setIsPoll] = useState(false)
    const [pollBuilder, setPollBuilder] = useState(INITIAL_POLL)
    const [valid, setValid] = useState(true)
    const [memoLength, setMemoLength] = useState(0)

    React.useEffect(_ => {
        setMemoLength(6 + JSON.stringify(pollBuilder).length)
    },[pollBuilder])
    

    const handleChange = e => {
        setAmount(+e.target.value)
    }

    const handlePollChange = e => {
        const newPollBuilder = {...pollBuilder, [e.target.name]: e.target.value}
        if (JSON.stringify(newPollBuilder).length >= 510) return
        setPollBuilder(newPollBuilder)
    }

    const isChosen = e => {
        console.log(e.target.value, amount)
        return +e.target.value === amount
    }

    return (
        <div className="post-entry-container">
        <button onClick={_ => setIsPoll(!isPoll)}>{isPoll ? "Make a post" : "Make a poll? (new)"}</button>
        <div className="reply-editor">
        {isPoll 
        ? <div>
            <h1 style={{marginBottom: 0}}>Create Poll</h1>
            <form className="poll-entry-form">
                <label>Question</label>
                <input
                    autocomplete='off'
                    name="q"
                    value={pollBuilder.q}
                    onChange={handlePollChange} />
                <label>Option 1</label>
                <input
                    autocomplete='off'
                    name="o1"
                    maxLength="80"
                    value={pollBuilder.o1}
                    onChange={handlePollChange} />
                <label>Option 2</label>
                <input
                    autocomplete='off'
                    name="o2"
                    maxLength="80"
                    value={pollBuilder.o2}
                    onChange={handlePollChange} />
                <label>Option 3</label>
                <input
                    autocomplete='off'
                    name="o3"
                    maxLength="80"
                    value={pollBuilder.o3}
                    onChange={handlePollChange} />
                <label>Option 4</label>
                <input
                    autocomplete='off'
                    name="o4"
                    maxLength="80"
                    value={pollBuilder.o4}
                    onChange={handlePollChange} />
                {memoLength > 512 && <p style={{color: 'red'}}>Your poll is too long! {memoLength}/512</p>}
            </form>
        </div>
        : <div className="reply-text-editor">
                {!isReply && !boardName && <h2>Post to Board:</h2>}



                {!isReply && !boardName ? <input style={darkMode ? {borderColor: "#ddd", color: "#eee", background:  "#000126"} : {}} placeholder="Defaults to all" name="boardInput" value={boardInput} onChange={e => setBoardInput(e.target.value.replace(/ /g, "_").replace(/(z\/all|z\/|[^a-z0-9_])/ig, ""))}></input> : null}
                <h2>{isReply ? "Write reply:" : boardName ? `Post to z/${boardName}` : "Post text:"}</h2>
                <textarea style={darkMode ? {borderColor: "#ddd", color: "#eee", background:  "#000126"} : {} } maxlength="500" placeholder="Type your message, then scan the QR code from your wallet app." value={replyBody} onChange={e => { formatReplyBody(e.target.value) }} />

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

            </div>
        }
        {/* #bec0fe #0a5e55*/}
        <div>


        <QRCode bgColor={darkMode ? "#ccc" : '#d1d2ff'} fgColor={darkMode ? post.amount >= 10000000 ? "#220005" : "#000126" : post.amount >= 10000000 ? "#58000f" : '#000126'} style={{display: 'inline-block', margin: '0 auto'}} includeMargin={true} size={256} value={isPoll ? `zcash:${boardZaddr}?amount=0.001&memo=${URLSafeBase64.encode(Buffer.from("POLL::" + JSON.stringify(pollBuilder)))}` : `zcash:${boardZaddr}?amount=${amount}&memo=${URLSafeBase64.encode(Buffer.from(`${boardName ? `BOARD::${boardName} ` : boardInput ? `BOARD::${boardInput} ` : ""}${isReply ? `REPLY::${post.id} ` : ""}${replyBody}`))}`} />
        </div>

        </div>    
            {isPoll ? 
            <>
                <a className="uri-link" href={`zcash:${boardZaddr}?amount=0.001&memo=${URLSafeBase64.encode(Buffer.from( "POLL::" +  JSON.stringify(pollBuilder)))}`}>
                <code style={{wordBreak: 'break-word'}}>{`zcash:${boardZaddr}?amount=0.001&memo=${URLSafeBase64.encode(Buffer.from("POLL::" +  JSON.stringify(pollBuilder)))}`}</code></a>
                <span className="copy-icon icon" onMouseDown={flagClickedIcon} onMouseLeave={flagUnClickedIcon} onMouseUp={flagUnClickedIcon} onClick={_ => {copyTextToClipboard(`zcash:${boardZaddr}?amount=0.001&memo=${URLSafeBase64.encode(Buffer.from("POLL::" +  JSON.stringify(pollBuilder)))}`); showCopyTooltip("editor");}}><img alt="copy" title="Copy to Clipboard" src={ab ? copyiconb : darkMode ? copyicondark : copyicon}></img><span style={{textAlign: 'center'}}  className={`copied-tooltip editor-tooltip`}>Copied!</span></span>
            </>
            : <>
                <a className="uri-link" href={`zcash:${boardZaddr}?amount=${amount}${replyBody ? `&memo=${URLSafeBase64.encode(Buffer.from(`${isReply ? `REPLY::${post.id} ` : boardInput || boardName ? `BOARD::${boardInput || boardName} ` : ""}${replyBody}`))}` : ""}`}>
                <code style={{wordBreak: 'break-word'}}>{`zcash:${boardZaddr}?amount=${amount}${replyBody ? `&memo=${URLSafeBase64.encode(Buffer.from(`${isReply ? `REPLY::${post.id} ` : boardInput || boardName ? `BOARD::${boardInput || boardName} ` : ""}${replyBody}`))}` : ""}`}</code></a>
                <span className="copy-icon icon" onMouseDown={flagClickedIcon} onMouseLeave={flagUnClickedIcon} onMouseUp={flagUnClickedIcon} onClick={_ => {copyTextToClipboard(`zcash:${boardZaddr}?amount=${amount}${replyBody ? `&memo=${URLSafeBase64.encode(Buffer.from(`${isReply ? `REPLY::${post.id} ` : boardInput || boardName ? `BOARD::${boardInput || boardName} ` : ""}${replyBody}`))}` : ""}`); showCopyTooltip("editor");}}><img alt="copy" title="Copy to Clipboard" src={ab ? copyiconb : darkMode ? copyicondark : copyicon}></img><span style={{textAlign: 'center'}}  className={`copied-tooltip editor-tooltip`}>Copied!</span></span>
            </>
            }
        </div>
    )
}