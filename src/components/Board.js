import React, {useState, useEffect} from "react";
import axios from "axios"
import "./Board.scss"
import QRCode from "qrcode.react";
import logo from "../zcash-icon.png"
import Pusher from 'pusher-js';
import {Link} from "react-router-dom";

import {useLocalStorage} from "../hooks/useLocalStorage";



export default function Board() {
    const [posts, setPosts] = useState([])
    const [toggle, setToggle] = useState(false)
    const [qrVis, setQrVis] = useState(false)
    const [page, setPage] = useState(1)
    const [postCount, setPostCount] = useState(0)
    const [showViewKey, setShowViewKey] = useState(false)
    const [bathroomMode, setBathroomMode] = useLocalStorage("br-mode", false)
    const [pinned, setPinned] = useState(null)
    const [next, setNext] = useState(true);
    const [prev, setPrev] = useState(true);
    const qrVal = "zs1j29m7zdhhyy2eqrz89l4zhk0angqjh368gqkj2vgdyqmeuultteny36n3qsm47zn8du5sw3ts7f"
    const viewKey = "zxviews1q0duytgcqqqqpqre26wkl45gvwwwd706xw608hucmvfalr759ejwf7qshjf5r9aa7323zulvz6plhttp5mltqcgs9t039cx2d09mgq05ts63n8u35hyv6h9nc9ctqqtue2u7cer2mqegunuulq2luhq3ywjcz35yyljewa4mgkgjzyfwh6fr6jd0dzd44ghk0nxdv2hnv4j5nxfwv24rwdmgllhe0p8568sgqt9ckt02v2kxf5ahtql6s0ltjpkckw8gtymxtxuu9gcr0swvz"

    function lineReducer(str) {
        let arr = str.split("\n");
        if (arr.length > 12) {
          return arr.join("")
        } else {
          return arr.join("\n")
        }
      }

    const getNewPosts = _ => {
        axios.get(`https://be.zecpages.com/board/${page}`)
        .then(res =>{ 
                let newPosts= res.data.sort( (a, b) => b.id-a.id)
                if (posts !== newPosts) {
                    setPosts(newPosts)
                                    }
            })
        .catch(err => console.log(err));
        axios.get(`https://be.zecpages.com/board/count`)
        .then(res =>{ 
                setPostCount(Number(res.data));
            })
        .catch(err => console.log(err));
    }

    const fetchPinned = _ => {
        axios.get(`https://be.zecpages.com/board/pinned`)
        .then(res => setPinned(res.data))
        .catch(err => console.log(err))
    }

    useEffect( _ => {
        fetchPinned();
        getNewPosts();
        Pusher.logToConsole = false;
        var pusher = new Pusher('0cea3b0950ab8614f8e9', {
            cluster: 'us2',
            forceTLS: true
        });
        var channel = pusher.subscribe('board');
            channel.bind('new-post', function(data) {
            console.log(data);
            getNewPosts();
        });
        window.scrollTo(0, 0);
        if (page === 1) {
            setPrev(false)
        } else {
            setPrev(true)
        }
    },[page])

    useEffect( _ => {
        if (page * 25 >= postCount) {
            setNext(false)
        } else {
            setNext(true)
        }
    },[postCount, page])

    const stringifyDate = date => {
        return new Date(Number(date)).toString().split("GMT")[0]
    }

    const handleModeChange = _ => {
        setBathroomMode(!bathroomMode)
    }

    return (
        <div className={bathroomMode ? "z-board bathroom-mode" : "z-board"}>
            <span></span>
            <div className="bathroom-mode-controls">
                <label className="switch">
                    
                    <input checked={bathroomMode} value={bathroomMode} onChange={handleModeChange} type="checkbox" />
                    <span className="slider"></span>
                </label>
                <p style={{width: "190px", height: "28px"}}>Toggle Bathroom Mode</p>
            </div>
            <h2>Anonymous Memo Board</h2>
            <h4 className="instructions-header">{`Post to board anonymously by sending a memo along with 0.001 ZEC (or more) to ${qrVal}`}</h4>
            <h4 className="highlight-cta">Send at least .1 ZEC to highlight your post!</h4>
            {showViewKey ? <p style={{margin: "0 auto", width: "60%", wordBreak: "break-all"}}>{viewKey} <a style={{margin: "1%", display: "block", color: "blue", textDecoration: "underline"}} target="_blank" rel="noopener noreferrer" href="https://electriccoin.co/blog/explaining-viewing-keys/">What's a viewing key?</a> </p> : null}
            <button onClick={_ => setShowViewKey(!showViewKey)} >{showViewKey ? "Hide View Key" : "Show View Key"}</button><br/>
            {qrVis 
                ? <><QRCode size={256} value={qrVal} /><br /></> 
                : null}
            <button onClick={_ => setQrVis(!qrVis)}>{qrVis ? "Hide QR" : "Show Board QR"}</button>
            {pinned && 
                <>
                <h3>Pinned post: (Claim the pinned slot for {pinned.amount+1} Zats)</h3>
                <div key={pinned.id} className={"highlighted-board-post board-post"}>
                    <p className="post-text">{lineReducer(pinned.memo.split("â€™").join("'")).split("\\n").join("\n")}</p>
                    <div className="post-bottom-row">
                    <p className="post-date">{stringifyDate(pinned.datetime)}</p>
                    <Link to={`/board/post/${pinned.id}`}> 
                    Permalink
                    </Link>
                    </div>
                </div>
                </>
                }

        
            {posts.length > 0 
            ? 
            <>
            <div className="board-page-buttons">
                <button disabled={prev ? "" : "disabled"} onClick={_ => setPage(page -1) }className="board-previous">Previous</button> 
                <button className="page-number" disabled="disabled">{page} </button>
                <button disabled={next ? "" : "disabled"} onClick={_ => setPage(page +1 )} className="board-next">Next</button>      
            </div>

            {posts.map(item => 
               <>
                <div key={item.id} className={item.amount >= 10000000 ? "highlighted-board-post board-post" : "board-post"}>
                    <p className="post-text">{lineReducer(item.memo.split("â€™").join("'")).split("\\n").join("\n")}</p>
                    <div className="post-bottom-row">
                    <p className="post-date">{stringifyDate(item.datetime)}</p>
                    <Link to={`/board/post/${item.id}`}> 
                    Permalink
                    </Link>
                    </div>
                </div>   
                
                </>
            )}
            <div className="board-page-buttons">
                <button disabled={prev ? "" : "disabled"} onClick={_ => setPage(page -1) }className="board-previous">Previous</button> 
                <button className="page-number" disabled="disabled">{page} </button>
                <button disabled={next ? "" : "disabled"} onClick={_ => setPage(page +1 )} className="board-next">Next</button>      
            </div>
            <h5>{`There are currently ${postCount} posts on this board!`}</h5>
            </>
        : 
        <>
            <img id="spinner" alt="spinning zcash logo" src={logo} />
            <h2>Loading . . .</h2>
        </>}


        </div>

    )

}