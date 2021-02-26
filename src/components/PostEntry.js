import React from "react";

import URLSafeBase64 from 'urlsafe-base64';
import QRCode from "qrcode.react"

var Base64 = require("js-base64")
var Buffer = require('buffer/').Buffer

        // qrVal
        //replyBody
        //darkMode
        // formatReplyBody

export default function PostEntry({qrVal, replyBody, darkMode, formatReplyBody, post, isReply}) {
    return (
        <div className="reply-editor">
        <div className="reply-text-editor">
            <h2>{isReply ? "Write reply:" : "Write a post:"}</h2>
            <textarea maxlength="500" placeholder="Type your message, then scan the QR code from your wallet app." value={replyBody} onChange={e => { formatReplyBody(e.target.value) }} />
        </div>
        {/* #bec0fe #0a5e55*/}
        <QRCode bgColor={darkMode ? "#111111" : 'black'} fgColor={darkMode ? post.amount >= 10000000 ? "#C46274" : "#7377EF" : post.amount >= 10000000 ? "#ff879b" : '#bec0fe'} style={{display: 'inline-block', margin: '0 auto'}} includeMargin={true} size={256} value={`zcash:${qrVal}?amount=0.001&memo=${URLSafeBase64.encode(Buffer.from(`${isReply ? `REPLY::${post.id}` : ""}${replyBody}`))}`} />
        </div>    
    )
}