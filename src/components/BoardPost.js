import React, {useState, useEffect} from "react"
import axios from "axios";
import {Link} from "react-router-dom"

export default function BoardPost(props) {
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

    return (
    <div className="z-board">

    {post.memo ? 
    <div key={post.id} className={post.amount >= 10000000 ? "highlighted-board-post board-post" : "board-post"}>
        <p className="post-text">{post.memo.split("â€™").join("'")}</p>
        <p className="post-date">{stringifyDate(post.datetime)}</p>
    </div>
    : null }
        <Link to="/board"><button>Back to the board!</button></Link>
    </div>
    )
}