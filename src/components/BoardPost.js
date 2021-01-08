import React, {useState, useEffect} from "react"
import axios from "axios";
import {Link} from "react-router-dom"
import like from "../512like.png"
const replyRegex = /REPLY::\d+/i

export default function BoardPost(props) {
    const qrVal = "zs1j29m7zdhhyy2eqrz89l4zhk0angqjh368gqkj2vgdyqmeuultteny36n3qsm47zn8du5sw3ts7f"

    const [likeTooltip, setLikeTooltip] = useState(null)
    const [post, setPost] = useState({
        memo: "",
        amount: 0,
        datetime: 0,
        replies: []
    })
    useEffect( _ => {
        axios.get(`https://be.zecpages.com/board/post/${props.match.params.id}`)
            .then(res => setPost(res.data))
            .catch(err => console.log(err))
    },[])

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

    return (
    <div className="z-board">

    {post.memo ? 
    <div key={post.id} className={post.amount >= 10000000 ? "highlighted-board-post board-post individual-post" : "board-post individual-post"}>
        <p className="post-text">{post.memo.split("â€™").join("'")}</p>
        <div className="post-date">
            <div className="like-container">
                <img onClick={_ => handleLikeTooltip(post.id)} className="like-icon" src={like} />
                <span>{post.likes}</span>
            </div>
            <p style={{display: "inline"}}>{stringifyDate(post.datetime)}</p>
        </div>
        {likeTooltip === post.id && <p style={{wordBreak: "break-word", paddingLeft: "10px"}}><code>Like this post by sending a .001 ZEC tx to {qrVal} with the memo "LIKE::{post.id}"</code></p>}
        <p style={{wordBreak: "break-word", paddingLeft: "10px"}}><code>Reply to this post by sending a .001 ZEC tx to {qrVal} beginning with the memo "REPLY::{post.id}"</code></p>

    </div>
    : null }
    <h3 className="reply-header">Replies {`(${post.replies.length})` || ""}</h3>
    {post && post.replies && !post.replies.length ? <h4>No replies yet!</h4> 
    : post.replies.map(reply => 
        <div key={reply.id} className={reply.amount >= 10000000 ? "highlighted-board-post board-post individual-post" : "board-post individual-post"}>
        <p className="post-text">{reply.memo.split("â€™").join("'").replace(replyRegex, "")}</p>
        <div className="post-date">
            <div className="like-container">
                <img onClick={_ => handleLikeTooltip(reply.id)} className="like-icon" src={like} />
                <span>{reply.likes}</span>
            </div>
            <p style={{display: "inline"}}>{stringifyDate(reply.datetime)}</p>
        </div>
        <div className="post-links">
                        <a href={`/board/post/${reply.id}`}> 
                            {reply.reply_count > 1 ? `${reply.reply_count} Replies` : reply.reply_count === 1 ? "1 Reply" : "Reply"}
                        </a>
                        <a href={`/board/post/${reply.id}`}> 
                            Permalink
                        </a>
        </div>  
        {likeTooltip === reply.id && <p style={{wordBreak: "break-word", paddingLeft: "10px"}}><code>Like this post by sending a .001 ZEC tx to {qrVal} with the memo "LIKE::{reply.id}"</code></p>}

    </div>
    )}
        <Link to="/board"><button>Back to the board!</button></Link>
    </div>
    )
}