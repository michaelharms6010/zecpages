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

    const iconsToReplace = [{"🛡": <img className="shield-icon" src={shieldicon} />}]
    const charCodes = iconsToReplace.map(item => Object.keys(item)[0].charCodeAt(0))
    const zaddrMarker = "🚠"
    const zaddrRegex = /^zs[a-z0-9]{76}$/ig;

    



    const formatReplyBody = str => {

        
        setReplyBody(str)
    }

    const formatURI = replyBody => {
        return encodeURIComponent(replyBody).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
        })

    }

    const reformatShields = (str, replyZaddr,  username) => {
        let output = []
        let string = str;
        if (replyZaddr && username ) {
            str = str.replace(replyZaddr, zaddrMarker)
        }
        str = str.replace(/^board::(\w+)/i, "").trim()


        iconsToReplace.forEach(icon => {
            let char = Object.keys(icon)[0]
            let Image = icon[char]
            let shieldUnicode = /\ud83d\udee1/

            
          
                for (let i = 0; i < str.length ; i++) {
                    if (str[i].charCodeAt(0) == char.charCodeAt(0) && str[i+1].charCodeAt(0) == char.charCodeAt(1) && darkMode) {
                        
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

                    
                    if (str[i+1] && str[i+1].charCodeAt(0) === char.charCodeAt(0) && str[i] != " " && darkMode) {
                        output.push(" ")
                    }
                    

                    
                }
            

        })
        return output
    }
    useEffect( _ => {
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
    {post.reply_to_post ? <Link className="replying-to-link" to={`/board/post/${post.reply_to_post}`}>← Replying to post {post.reply_to_post}</Link> : null}
    <div key={post.id} id={post.id === pinned.id ? "pinned-post" : ""} className={post.amount >= 10000000 ? "highlighted-board-post board-post individual-post" : "board-post individual-post"}>
        <p className="post-text">{reformatShields(post.memo.split("â€™").join("'").replace(replyRegex, ""), post.reply_zaddr, post.username)}</p>
       
        {likeTooltip === post.id && 
            <p style={{margin: 0, marginBottom: "10px", wordBreak: "break-word", paddingLeft: "10px"}}><code>Like this post: <img alt="qr code" onClick={_ => handleLikeQR(post.id)} style={{ cursor: 'pointer',  marginLeft: '10px', height: "2rem", width: "2rem"}} src={darkMode ? qricondark : qricon}/><br/> {`zcash:${qrVal}?amount=0.001&memo=${btoa(`LIKE::${post.id}`)}`}       
            <span className="copy-icon icon" onClick={_ => {copyTextToClipboard(`zcash:${qrVal}?amount=0.001&memo=${btoa(`LIKE::${post.id}`)}`); showLikeCopyTooltipById(post.id);}}>
            <img alt="copy" title="Copy to Clipboard" src={ab ? copyiconb : darkMode ? copyicondark : copyicon}></img>
            <span style={{textAlign: "center"}} className={`copied-tooltip like-copied-${post.id}`}>Copied!</span></span>
            <br/> or simply make a board post with the memo "{`LIKE::${post.id}`}"</code></p>
        }
        {likeQrVis === post.id && likeTooltip === post.id && <QRCode bgColor={darkMode ? "#111111" : '#eeeeee'} fgColor={darkMode ? post.amount >= 10000000 ? "#C46274" : "#7377EF" : '#111111'} style={{margin: '.5% auto', display: 'block'}} includeMargin={true} size={256} value={`zcash:${qrVal}?amount=0.001&memo=${btoa(`LIKE::${post.id}`)}`} />}
        <hr></hr>
        <p style={{wordBreak: "break-word", paddingLeft: "10px"}}><code>Reply to this post: <img alt='qr code' onClick={_ => setQrVis(!qrVis)} style={{cursor: 'pointer', marginLeft: '10px', height: "2rem", width: "2rem"}} src={darkMode ? qricondark : qricon}/> <br/>{`zcash:${qrVal}?amount=0.001&memo=${Base64.encode(`REPLY::${post.id} ${replyBody}`)}`} or simply make a new board post with a memo starting with {`REPLY::${post.id}`}</code></p>
        {!!qrVis && 
            <div className="reply-editor">
                <div className="reply-text-editor">
                    <h2>Write reply</h2>
                    <textarea maxlength="500" placeholder="Type your message, then scan the QR code from your wallet app." value={replyBody} onChange={e => { formatReplyBody(e.target.value) }} />
                </div>
                {/* #bec0fe #0a5e55*/}
                <QRCode bgColor={darkMode ? "#111111" : 'black'} fgColor={darkMode ? post.amount >= 10000000 ? "#C46274" : "#7377EF" : post.amount >= 10000000 ? "#ff879b" : '#bec0fe'} style={{display: 'inline-block', margin: '0 auto'}} includeMargin={true} size={256} value={`zcash:${qrVal}?amount=0.001&memo=${Base64.encode(`REPLY::${post.id} ${replyBody}`)}`} />
            </div>    
        }
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
        <p className="post-text">{reply.memo.split("â€™").join("'").replace(replyRegex, "")}</p>
        
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
    
        <Link to="/board"><button>Back to the board!</button></Link>
        </>
    : null }
    </div>
    
    )
}