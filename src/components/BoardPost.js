import React, {useState, useEffect} from "react"
import axios from "axios";
import {Link} from "react-router-dom"
import like from "../378zheart.png"
import QRCode from "qrcode.react";
import qricon from "../icons/qr.png"
import qricondark from "../icons/qrdark.png"
import {UserContext} from "../contexts/UserContext"
import shieldicon from "../icons/shieldicon.gif"
import "./Board.scss"
import {copyTextToClipboard} from "../utils/copy"
import copyicon from "../icons/zecpagescopyicondaymode01.png"
import copyicondark from "../icons/bignightcopy.png"
import copyiconb from "../icons/copyiconb.png"
import zebraemoji from "../icons/zebra-emoji.png"
import zebraemojiblack from "../icons/zebra-emoji-black.png"
import URLSafeBase64 from 'urlsafe-base64';
import PostEntry from "./PostEntry"

var Base64 = require("js-base64")
var Buffer = require('buffer/').Buffer
var decoder = new TextDecoder();
var encoder = new TextEncoder();

export default function BoardPost(props) {
    const replyRegex = /REPLY::\d+/i
    const initial_qrVal = "zs1j29m7zdhhyy2eqrz89l4zhk0angqjh368gqkj2vgdyqmeuultteny36n3qsm47zn8du5sw3ts7f"
    const {darkMode} = React.useContext(UserContext)
    const [likeTooltip, setLikeTooltip] = useState(null)
    const [qrVal, setQrVal] = useState(initial_qrVal)
    const [qrVis, setQrVis] = useState(false)
    const [pinned, setPinned] = useState({id: 0})
    const [replyBody, setReplyBody] = useState("")
    const [likeQrVis, setLikeQrVis] = useState(0)
    const [ab, setAb] = useState(Math.random() > .9)
    const [post, setPost] = useState({
        memo: "",
        amount: 0,
        datetime: 0,
        replies: [],
        reply_to_post: null
    })
    const showLikeCopyTooltipById = id => {
        document.querySelector(`.like-copied-${id}`).classList.add('visible')
        setTimeout(_ => document.querySelector(`.like-copied-${id}`).classList.remove('visible'), 1000)
    }



    const iconsToReplace = [{"🦓": <img className="zebra-icon" src={darkMode ? zebraemoji : zebraemojiblack} />}, {"🛡": <img className="shield-icon" src={shieldicon} />}]

    const zaddrMarker = "🚠"

    const reformatShields = (str, replyZaddr, username) => {
        let output = []
        str = str.replace(/^board::(\w+)/i, "").trim()
        
        let string = str;
        if (replyZaddr && username ) {
            str = str.replace(replyZaddr, zaddrMarker)
        }




        let shieldUnicode = /\ud83d\udee1/

        
        
            for (let i = 0; i < str.length ; i++) {
                const icon = iconsToReplace.find(icon => Object.keys(icon)[0].charCodeAt(0) == str[i].charCodeAt(0) && str[i+1].charCodeAt(0) == Object.keys(icon)[0].charCodeAt(1) )
                if (icon) {
                    let Image = Object.values(icon)[0]
                    output.push(Image)
                    if (str[i+1] != " ") {
                        output.push(" ")
                    }
                    i++
                } else if (str[i].charCodeAt(0) == zaddrMarker.charCodeAt(0) && str[i+1].charCodeAt(0) === zaddrMarker.charCodeAt(1) ) {
                    output.push(<Link className="board-zaddr-link" to={`/${username}`}>{replyZaddr}</Link>)
                    i++
                } else {
                    output.push(str[i])
                }

                
                if (str[i+1] && iconsToReplace.find(icon => Object.keys(icon)[0].charCodeAt(0) === str[i+1].charCodeAt(0)) && str[i] != " "  )  {
                    output.push(" ")
                }
                

                
            }
        
        return output
    }



    const formatReplyBody = str => {

        
        setReplyBody(str)
    }

    const formatURI = replyBody => {
        return encodeURIComponent(replyBody).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
        })

    }

    useEffect( _ => {
        console.log(URLSafeBase64.encode(Buffer.from("hello world")))
        axios.get(`https://be.zecpages.com/board/post/${props.match.params.id}`)
            .then(res => {
                setTimeout(_ => setPost(res.data), 100)
                
                // setQrVal(`zcash:${initial_qrVal}?amount=0.001&memo=${btoa(`REPLY::${res.data.id}`)}`)
                
            })
            .catch(err => console.log(err))
        axios.get(`https://be.zecpages.com/board/pinned`)
            .then(res => {
                setPinned(res.data)
                
            })
            .catch(err => console.log(err))
    },[props.match.params])
    
    const stringifyDate = date => {
        return new Date(Number(date)).toString().split("GMT")[0]
      }

      const handleLikeTooltip = id => {
        if (likeTooltip !== id) {
            setLikeTooltip(id)
        }
        else {
            setLikeTooltip(null)
        }
    }

    const handleLikeQR = id => {
        if (likeQrVis !== id) {
            setLikeQrVis(id)
        }
        else {
            setLikeQrVis(0)
        }
    }

    return (
    <div className={darkMode ? "dark-mode z-board" : "z-board"}>

    {post.memo ? 
    <>
    {post.reply_to_post ? <Link className="replying-to-link" to={`/board/post/${post.reply_to_post}`}>← Replying to post {post.reply_to_post}</Link> : <Link  className="replying-to-link" to="/board">← Back to board</Link>}
    <div key={post.id} id={post.id === pinned.id ? "pinned-post" : ""} className={post.amount >= 10000000 ? "highlighted-board-post board-post individual-post" : "board-post individual-post"}>
    {!!post.board_name && <p className="post-text sub-board-link">Posted to <Link className="z-link" to={`/z/${post.board_name}`}>z/{post.board_name}</Link></p>}
        <p className="post-text">{reformatShields(post.memo.split("â€™").join("'").replace(replyRegex, ""), post.reply_zaddr, post.username)}</p>
       
       <hr></hr>
        <p style={{wordBreak: "break-word", paddingLeft: "10px"}}><code>Reply to this post: <img alt='qr code' onClick={_ => setQrVis(!qrVis)} style={{cursor: 'pointer', marginLeft: '10px', height: "2rem", width: "2rem"}} src={darkMode ? qricondark : qricon}/> <br/>{`zcash:${qrVal}?amount=0.001&memo=${URLSafeBase64.encode(Buffer.from(`REPLY::${post.id} ${replyBody}`))}`} 
        <span className="copy-icon icon" onClick={_ => {copyTextToClipboard(`zcash:${qrVal}?amount=0.001&memo=${URLSafeBase64.encode(Buffer.from(`REPLY::${post.id} ${replyBody}`))}`); showLikeCopyTooltipById(99999999);}}>
        <img alt="copy" title="Copy to Clipboard" src={ab ? copyiconb : darkMode ? copyicondark : copyicon}></img>
        <span style={{textAlign: "center"}} className={`copied-tooltip like-copied-${99999999}`}>Copied!</span></span><br/>
        or simply make a new board post with a memo starting with {`REPLY::${post.id}`}</code></p>
        {!!qrVis && 
        // qrVal
        //replyBody
        //darkMode
        // formatReplyBody
            <PostEntry
                isReply={true}
                qrVal={qrVal}
                post={post}
                darkMode={darkMode}
                formatReplyBody={formatReplyBody}
                replyBody={replyBody}
            />
        }
         {likeTooltip === post.id && 

            <>
            <hr />
                <p style={{margin: 0, marginBottom: "10px", wordBreak: "break-word", paddingLeft: "10px"}}><code>Like this post: <img alt="qr code" onClick={_ => handleLikeQR(post.id)} style={{ cursor: 'pointer',  marginLeft: '10px', height: "2rem", width: "2rem"}} src={darkMode ? qricondark : qricon}/><br/> {`zcash:${qrVal}?amount=0.001&memo=${btoa(`LIKE::${post.id}`)}`}       
                <span className="copy-icon icon" onClick={_ => {copyTextToClipboard(`zcash:${qrVal}?amount=0.001&memo=${btoa(`LIKE::${post.id}`)}`); showLikeCopyTooltipById(post.id);}}>
                <img alt="copy" title="Copy to Clipboard" src={ab ? copyiconb : darkMode ? copyicondark : copyicon}></img>
                <span style={{textAlign: "center"}} className={`copied-tooltip like-copied-${post.id}`}>Copied!</span></span>
                <br/> or simply make a board post with the memo "{`LIKE::${post.id}`}"</code></p>
            </>
        }
        {likeQrVis === post.id && likeTooltip === post.id && <QRCode bgColor={darkMode ? "#111111" : '#eeeeee'} fgColor={darkMode ? post.amount >= 10000000 ? "#C46274" : "#7377EF" : '#111111'} style={{margin: '.5% auto', display: 'block'}} includeMargin={true} size={256} value={`zcash:${qrVal}?amount=0.001&memo=${btoa(`LIKE::${post.id}`)}`} />}
        
         <div className="post-date">
            <div className="like-container">
                <img alt='zcash heart' onClick={_ => handleLikeTooltip(post.id)} className="like-icon" src={like} />
                <span>{post.likes}</span>
            </div>
            <p style={{display: "inline"}}>{stringifyDate(post.datetime)}</p>
            
        </div>
        

    </div>
    
    <h3 className="reply-header">Replies {`(${post.replies.length})` || ""}</h3>
    {post && post.replies && !post.replies.length ? <h4>No replies yet!</h4> 
    : post.replies.sort((a,b) => a.id - b.id).map(reply => 
        <div key={reply.id} className={reply.amount >= 10000000 ? "highlighted-board-post board-post individual-post" : "board-post individual-post"}>
        <p className="post-text">{reformatShields(reply.memo.split("â€™").join("'").replace(replyRegex, ""), reply.reply_zaddr, reply.username)}</p>
        
        {likeTooltip === reply.id && 
        <p style={{margin: 0, marginBottom: "10px", wordBreak: "break-word", paddingLeft: "10px"}}><code>Like this post: <img alt="qr code" onClick={_ => handleLikeQR(reply.id)} style={{ cursor: 'pointer',  marginLeft: '10px', height: "2rem", width: "2rem"}} src={darkMode ? qricondark : qricon}/><br/> {`zcash:${qrVal}?amount=0.001&memo=${btoa(`LIKE::${reply.id}`)}`}       
        <span className="copy-icon icon" onClick={_ => {copyTextToClipboard(`zcash:${qrVal}?amount=0.001&memo=${btoa(`LIKE::${reply.id}`)}`); showLikeCopyTooltipById(reply.id);}}>
        <img alt="copy" title="Copy to Clipboard" src={ab ? copyiconb : darkMode ? copyicondark : copyicon}></img>
        <span style={{textAlign: "center"}} className={`copied-tooltip like-copied-${reply.id}`}>Copied!</span></span>
        <br/> or simply make a board post with the memo "{`LIKE::${reply.id}`}"</code></p>}
        {likeQrVis === reply.id && likeTooltip === reply.id && <QRCode bgColor={darkMode ? "#111111" : '#eeeeee'} fgColor={darkMode ? reply.amount >= 10000000 ? "#C46274" : "#7377EF" : '#111111'} style={{margin: '.5% auto', display: 'block'}} includeMargin={true} size={256} value={`zcash:${qrVal}?amount=0.001&memo=${btoa(`LIKE::${reply.id}`)}`} />}
        <div className="post-date">
            <div className="like-container">
                <img alt='zcash heart' onClick={_ => handleLikeTooltip(reply.id)} className="like-icon" src={like} />
                <span>{reply.likes}</span>
            </div>
            <p style={{display: "inline"}}>{stringifyDate(reply.datetime)}</p>
        </div>
        <div className="post-links">
                        <Link to={`/board/post/${reply.id}`}> 
                            {reply.reply_count > 1 ? `${reply.reply_count} Replies` : reply.reply_count === 1 ? "1 Reply" : "Reply"}
                        </Link>
                        <Link to={`/board/post/${reply.id}`}> 
                            Permalink
                        </Link>
        </div>  
    </div>
    )}
    
        
        </>
    : null }
    </div>
    
    )
}