import React, {useState, useEffect} from "react"
import axios from "axios";
import {Link} from "react-router-dom"
import like from "../512like.png"

export default function BoardPost(props) {
    const qrVal = "zs1j29m7zdhhyy2eqrz89l4zhk0angqjh368gqkj2vgdyqmeuultteny36n3qsm47zn8du5sw3ts7f"

    const [likeTooltip, setLikeTooltip] = useState(null)
    const [post, setPost] = useState({
        memo: "",
        amount: 0,
        datetime: 0
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
        {likeTooltip === post.id && <p style={{wordBreak: "break-all", paddingLeft: "10px"}}><code>Like this post by sending a .001 ZEC tx to {qrVal} with the memo "LIKE::{post.id}"</code></p>}

    </div>
    : null }
        <Link to="/board"><button>Back to the board!</button></Link>
    </div>
    )
}