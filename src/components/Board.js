import React, {useState, useEffect} from "react";
import axios from "axios"
import "./Board.scss"
import QRCode from "qrcode.react";
import logo from "../zcash-icon.png"
import Pusher from 'pusher-js';
import {Link} from "react-router-dom";



export default function Board() {
    const [posts, setPosts] = useState([])
    const [toggle, setToggle] = useState(false)
    const [qrVis, setQrVis] = useState(false)
    const [page, setPage] = useState(1)
    const [postCount, setPostCount] = useState(0)
    
    const [next, setNext] = useState(true);
    const [prev, setPrev] = useState(true);

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

    useEffect( _ => {
        
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

    return (
        <div className="z-board">
            <h2>Anonymous Memo Board</h2>
            {/*<h4 className="instructions-header">Post to board anonymously by sending a memo along with 0.001 ZEC (or more) to zs1n5m4szkmqup6ht9nuwke9j5w6pwcd527l4sm8u2aqqhaedjv5at64el6eyazm6engqplx0ht6x9</h4> */}
            {/* <h5 className="dev-disclaimer">The board's address has changed! Any old posts you've sent to the previous address will be posted after my node resyncs. Sorry for any inconvenience.</h5> */}
            <h4 className="instructions-header">Post to board anonymously by sending a memo along with 0.001 ZEC (or more) to zs1j29m7zdhhyy2eqrz89l4zhk0angqjh368gqkj2vgdyqmeuultteny36n3qsm47zn8du5sw3ts7f</h4>
            <h4 className="highlight-cta">Send at least .1 ZEC to highlight your post!</h4>
            {qrVis 
                ? <><QRCode size={256} value="zs1j29m7zdhhyy2eqrz89l4zhk0angqjh368gqkj2vgdyqmeuultteny36n3qsm47zn8du5sw3ts7f" /><br /></> 
                : null}
            <button onClick={_ => setQrVis(!qrVis)}>{qrVis ? "Hide QR" : "Show Board QR"}</button>
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
                    <p className="post-text">{lineReducer(item.memo.split("â€™").join("'"))}</p>
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