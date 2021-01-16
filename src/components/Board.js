import React, {useState, useEffect, useContext} from "react";
import axios from "axios"
import "./Board.scss"
import QRCode from "qrcode.react";
import logo from "../zcash-icon.png"
import Pusher from 'pusher-js';
import {Link} from "react-router-dom";
import like from "../378zheart.png"
import darklike from "../378zheartdark.png"
import qricon from "../icons/qr.png"
import AOS from 'aos'
import 'aos/dist/aos.css';
import {UserContext} from "../contexts/UserContext";
import {ZaddrContext} from "../contexts/ZaddrContext";
import qricondark from "../icons/qrdark.png"
import shieldicon from "../icons/shieldicon.gif"
import copyicon from "../icons/zecpagescopyicondaymode01.png"
import copyicondark from "../icons/bignightcopy.png"
import copyiconb from "../icons/copyiconb.png"
import {copyTextToClipboard} from "../utils/copy"
import PollChart from "./charts/PollChart"


export default function Board() {
    AOS.init()

    const POLL_TITLE= "Are You A Chill Dude?"
    const TEST_POLL_DATA = {
      "No no no on onononononononono": 15,
      "Yes IU think thats fine": 8,
      "Maybe that's ok but idk i'm silly": 24
    }

    const [ab, setAb] = useState(Math.random() > .5)
    const [posts, setPosts] = useState([])
    const [qrVis, setQrVis] = useState(false)
    const [replyQrVis, setReplyQrVis] = useState(false)
    const [page, setPage] = useState(1)
    const [postCount, setPostCount] = useState(0)
    const [showViewKey, setShowViewKey] = useState(false)
    const {darkMode} = React.useContext(UserContext)
    const { zaddrs } = useContext(ZaddrContext);
    const [pinned, setPinned] = useState(null)
    const [next, setNext] = useState(true);
    const [prev, setPrev] = useState(true);
    const [likeTooltip, setLikeTooltip] = useState(null)
    const qrVal = "zs1j29m7zdhhyy2eqrz89l4zhk0angqjh368gqkj2vgdyqmeuultteny36n3qsm47zn8du5sw3ts7f"
    const viewKey = "zxviews1q0duytgcqqqqpqre26wkl45gvwwwd706xw608hucmvfalr759ejwf7qshjf5r9aa7323zulvz6plhttp5mltqcgs9t039cx2d09mgq05ts63n8u35hyv6h9nc9ctqqtue2u7cer2mqegunuulq2luhq3ywjcz35yyljewa4mgkgjzyfwh6fr6jd0dzd44ghk0nxdv2hnv4j5nxfwv24rwdmgllhe0p8568sgqt9ckt02v2kxf5ahtql6s0ltjpkckw8gtymxtxuu9gcr0swvz"


    const iconsToReplace = [{"🛡": <img className="shield-icon" src={shieldicon} />}]
    const charCodes = iconsToReplace.map(item => Object.keys(item)[0].charCodeAt(0))
    const zaddrMarker = "🚠"
    const zaddrRegex = /^zs[a-z0-9]{76}$/ig;

    const reformatShields = (str, replyZaddr, username) => {
        let output = []
        
        let string = str;
        if (replyZaddr && username ) {
            str = str.replace(replyZaddr, zaddrMarker)
        }


        iconsToReplace.forEach(icon => {
            let char = Object.keys(icon)[0]
            let Image = icon[char]
            let shieldUnicode = /\ud83d\udee1/

            
          
                for (let i = 0; i < str.length ; i++) {
                    if (str[i].charCodeAt(0) == char.charCodeAt(0) && str[i+1].charCodeAt(0) == char.charCodeAt(1)  ) {
                        
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

                    
                    if (str[i+1] && str[i+1].charCodeAt(0) === char.charCodeAt(0) && str[i] != " "  )  {
                        output.push(" ")
                    }
                    

                    
                }
            

        })
        return output
    }




    function lineReducer(str) {
        let arr = str.split("\n");
        if (arr.length > 12) {
          return arr.join("")
        } else {
          return arr.join("\n")
        }
      }

    const getNewPosts = (page=1) => {
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
        
        Pusher.logToConsole = false;
        var pusher = new Pusher('0cea3b0950ab8614f8e9', {
            cluster: 'us2',
            forceTLS: true
        });
        var channel = pusher.subscribe('board');
            channel.bind('new-post', function(data) {
            console.log('board update', new Date().toISOString());
            getNewPosts(page);
            fetchPinned();
        });
        // window.scrollTo(0, 0);
        if (page === 1) {
            setTimeout(_ => getNewPosts(), 360);
            setPrev(false)
        } else {
            getNewPosts(page);
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

    const handleLikeTooltip = id => {
        if (likeTooltip !== id) {
            setLikeTooltip(id)
        }
        else {
            setLikeTooltip(null)
        }
    }
    const flagClickedIcon = e => {
        document.querySelector(".copy-icon.icon").classList.add('clicked')
    }
    
    const flagUnClickedIcon = e => {
        document.querySelector(".copy-icon.icon").classList.remove('clicked')
    }
    const showCopyTooltip = e => {
        document.querySelector(".copied-tooltip").classList.add('visible')
        setTimeout(_ => document.querySelector(".copied-tooltip").classList.remove('visible'), 1000)
    }

    return (
        <div className={"z-board"}>

            <div className={darkMode ? "board-explainer dark-mode" : "board-explainer"}>
                <h2>Zecpages Anonymous Memo Board</h2>
                <h4 className="instructions-header">{`Post to the board anonymously by sending a memo along with 0.001 ZEC (or more) to`}</h4>
                <h4 className="board-zaddr">{qrVal} <span className="copy-icon icon" onMouseDown={flagClickedIcon} onMouseLeave={flagUnClickedIcon} onMouseUp={flagUnClickedIcon} onClick={_ => {copyTextToClipboard(qrVal); showCopyTooltip();}}><img alt="copy" title="Copy to Clipboard" src={ab ? copyiconb : darkMode ? copyicondark : copyicon}></img><span className='copied-tooltip'>Copied!</span></span></h4>
                <h4>**Include your zaddr in your post and you'll receive a daily payout for each like you received. (50k zat/like)**</h4>
                <h4 className="highlight-cta">Send at least .1 ZEC to highlight your post!</h4>
                <code style={{wordBreak: 'break-word'}}>{`zcash:${qrVal}?amount=0.001`}</code>
                <br/><img alt="qr code" onClick={_ => setQrVis(!qrVis)} style={{ cursor: 'pointer',  marginTop: '10px', height: "2rem", width: "2rem"}} src={darkMode ? qricondark : qricon}/>
                <br/>
                {qrVis 
                ? <><QRCode bgColor={darkMode ? "#111111" : '#eeeeee'} fgColor={darkMode ? "#7377EF" : '#111111'} includeMargin={true} size={256} value={`zcash:${qrVal}?amount=0.001`} /><br /></> 
                : null}
            </div>
            {showViewKey ? <p className="view-key" style={{margin: "5px auto", width: "60%", wordBreak: "break-all"}}>{viewKey} <a className="view-key-link" style={{margin: "1%", display: "block", textDecoration: "underline"}} target="_blank" rel="noopener noreferrer" href="https://electriccoin.co/blog/explaining-viewing-keys/">What's a viewing key?</a> </p> : null}
            <button style={{color: "#333"}} onClick={_ => setShowViewKey(!showViewKey)} >{showViewKey ? "Hide View Key" : "Show View Key"}</button><br/>
            
            {pinned ? <h3 style={{marginBottom: "20px", marginTop: '5px'}}></h3> : <h3 style={{marginBottom: "20px", marginTop: '5px', color: darkMode ? "#333" : "#5e63fd"}}>Pinned Post</h3> }
            {pinned && !!posts.length && 
                <>
                
                <div data-aos="flip-left"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000"
                    id="pinned-post"
                    key={pinned.id} 
                    className={"highlighted-board-post board-post"}>
                    <h3 className="pin-text">Pinned for {pinned.amount} Zats</h3>
                    <p className="post-text">{reformatShields(lineReducer(pinned.memo.split("â€™").join("'")).split("\\n").join("\n"), pinned.reply_zaddr, pinned.username)}</p>
                    <div className="post-bottom-row">
                    <div className="post-date">
                            <div className="like-container">
                                <img alt="zcash heart" onClick={_ => handleLikeTooltip(pinned.id)} className="like-icon" src={darkMode ? darklike : like} />
                                <span>{pinned.likes}</span>
                            </div>
                        
                    </div>
                    <div className="post-links">
                        <div className="post-date" style={{display:'inline'}}>
                            <p style={{display: "inline"}}>{stringifyDate(pinned.datetime)}</p>
                        </div>
                        <Link to={`/board/post/${pinned.id}`}> 
                            {pinned.reply_count > 1 ? `${pinned.reply_count} Replies` : pinned.reply_count === 1 ? "1 Reply" : "Reply"}
                        </Link>
                        <Link to={`/board/post/${pinned.id}`}> 
                            Permalink
                        </Link>
                    </div>
                    </div>
                    {likeTooltip === pinned.id &&
                    <p style={{margin: 0, wordBreak: "break-word", paddingLeft: "10px"}}><code>Like this post: <img alt="qr code" onClick={_ => setReplyQrVis(!replyQrVis)} style={{ cursor: 'pointer',  marginLeft: '10px', height: "2rem", width: "2rem"}} src={darkMode ? qricondark : qricon}/><br/> {`zcash:${qrVal}?amount=0.001&memo=${btoa(`LIKE::${pinned.id}`)}`} <br/> or simply make a board post with the memo "{`LIKE::${pinned.id}`}"</code></p>}
                    {replyQrVis && likeTooltip === pinned.id && <QRCode bgColor={darkMode ? "#111111" : '#eeeeee'} fgColor={darkMode ? "#C46274" : '#111111'} style={{margin: '.5% auto', display: 'block'}} includeMargin={true} size={256} value={`zcash:${qrVal}?amount=0.001&memo=${btoa(`LIKE::${pinned.id}`)}`} />}
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

               
                <div className="aos-container" >
                <div key={item.id} className={item.amount >= 10000000 ? "highlighted-board-post board-post" : "board-post"}>
                    <p className="post-text">{reformatShields(lineReducer(item.memo.split("â€™").join("'")).split("\\n").join("\n"), item.reply_zaddr, item.username)}</p>
                    
                    <div className="post-bottom-row">
                    <div className="post-date">
                    {item.likes ?
                    <div className="like-container">
                            <img alt="zcash heart" onClick={_ => handleLikeTooltip(item.id)} className="like-icon" src={darkMode ? darklike : like} /> 
                         <span>{item.likes}</span> 
                    </div>
                    : <div className="like-icon-container" style={{width:"2rem", marginRight: '5px'}}>
                        <img alt="zcash heart" src={darkMode ? darklike : like} onClick={_ => handleLikeTooltip(item.id)} className="like-icon" style={{ marginRight: '5px', cursor: "pointer"}}></img></div> }
                        
                        <p style={{display: "inline"}}>{stringifyDate(item.datetime)}</p>
                    </div>
                    <div className="post-links">
                        <Link to={`/board/post/${item.id}`}> 
                        {item.reply_count > 1 ? `${item.reply_count} Replies` : item.reply_count === 1 ? "1 Reply" : "Reply"}
                        </Link>
                        <Link to={`/board/post/${item.id}`}> 
                        Permalink
                        </Link>
                    </div>
                    </div>
                    {likeTooltip === item.id && 
                    <>
                    <p style={{margin: 0, wordBreak: "break-word", paddingLeft: "10px"}}><code>Like this post: <img alt="qr code" onClick={_ => setReplyQrVis(!replyQrVis)} style={{cursor: 'pointer', marginLeft: '10px', height: "2rem", width: "2rem"}} src={darkMode ? qricondark : qricon}/> <br/> {`zcash:${qrVal}?amount=0.001&memo=${btoa(`LIKE::${item.id}`)}`} <br/> or simply make a board post with the memo "{`LIKE::${item.id}`}"</code></p>
                    {replyQrVis && <QRCode bgColor={darkMode ? "#111111" : '#eeeeee'} fgColor={darkMode ? item.amount >= 10000000 ? "#C46274" : "#7377EF" : '#111111'} style={{margin: '.5% auto', display: 'block'}} includeMargin={true} size={256} value={`zcash:${qrVal}?amount=0.001&memo=${btoa(`LIKE::${item.id}`)}`} />}
                    </>}
                </div> 
                </div>  
                
                </>
            )}
            <div className="board-page-buttons">
                <button disabled={prev ? "" : "disabled"} onClick={_ => setPage(page -1) }className="board-previous">Previous</button> 
                <button className="page-number" disabled="disabled">{page}</button>
                <button disabled={next ? "" : "disabled"} onClick={_ => setPage(page +1 )} className="board-next">Next</button>      
            </div>
            <h5>{`There are currently ${postCount} posts on this board!`}</h5>
            </>
        : 
        <>
            <img id="spinner" alt="spinning zcash logo" src={logo} />
            
        </>}


        </div>

    )

}