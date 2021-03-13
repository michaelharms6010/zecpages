import React, {useState, useEffect, useContext} from "react";
import axios from "axios"
import "./Board.scss"
import QRCode from "qrcode.react";
import logo from "../zcash-icon.png"
import Pusher from 'pusher-js';
import {Link} from "react-router-dom";
import like from "../380zheart.png"
import darklike from "../380zheartdark.png"
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
import BoardPageControls from "./BoardPageControls"
import zebraemoji from "../icons/zebra-emoji.png"
import zebraemojiblack from "../icons/zebra-emoji-black.png"
import {useLocalStorage} from "../hooks/useLocalStorage"
import zcashLogo from "../zcash-icon.png"
import zcashLogoDark from "../zcash-icon-dark.png"
import PostEntry from "./PostEntry"
import CopyIcon from "./CopyIcon"
import URLSafeBase64 from 'urlsafe-base64';
var Buffer = require('buffer/').Buffer


export default function Board(props) {
    AOS.init()

    const POLL_TITLE= "Are You A Chill Dude?"
    const TEST_POLL_DATA = {
      "No no no on onononononononono": 15,
      "Yes IU think thats fine": 8,
      "Maybe that's ok but idk i'm silly": 24
    }
    const [newLike, setNewLike] = useState(null)
    const [ab, setAb] = useState(Math.random() > .9)
    const [posts, setPosts] = useState([])
    const [qrVis, setQrVis] = useState(false)
    const [replyQrVis, setReplyQrVis] = useState(false)
    const [page, setPage] = useState(props.match.params.page ? +props.match.params.page : 1)
    const [postCount, setPostCount] = useState(0)
    const [showViewKey, setShowViewKey] = useState(false)
    const {darkMode, amount} = React.useContext(UserContext)
    const [pinned, setPinned] = useState(null)
    const [next, setNext] = useState(true);
    const [prev, setPrev] = useState(true);
    const [decay, setDecay] = useState(false);
    const [doCardHeight, setDoCardHeight] = useState(false)
    const [newReplyId, setNewReplyId] = useState(null)
    const [notificationVis, setNotificationVis] = useState(false)
    const [likeTooltip, setLikeTooltip] = useState(null)
    const [flipped, setFlipped] = useState(false)
    const [inUsd, setInUsd] = useState(false) 
    const [zecPrice, setZecPrice] = useState(null)
    const [replyBody, setReplyBody] = useState("")
    const [showReplies, setShowReplies] = useLocalStorage("show-replies", true)
    const boardZaddr = "zs1j29m7zdhhyy2eqrz89l4zhk0angqjh368gqkj2vgdyqmeuultteny36n3qsm47zn8du5sw3ts7f"
    const viewKey = "zxviews1q0duytgcqqqqpqre26wkl45gvwwwd706xw608hucmvfalr759ejwf7qshjf5r9aa7323zulvz6plhttp5mltqcgs9t039cx2d09mgq05ts63n8u35hyv6h9nc9ctqqtue2u7cer2mqegunuulq2luhq3ywjcz35yyljewa4mgkgjzyfwh6fr6jd0dzd44ghk0nxdv2hnv4j5nxfwv24rwdmgllhe0p8568sgqt9ckt02v2kxf5ahtql6s0ltjpkckw8gtymxtxuu9gcr0swvz"

    const [boardInput, setBoardInput] = useState("")
    
    useEffect(_ => {
        setBoardInput(boardInput.replace(/(\/z\/all|\/z)/ig, ""))
    }, [boardInput])


    const iconsToReplace = [{"🦓": <img className="zebra-icon" src={darkMode ? zebraemoji : zebraemojiblack} />}, {"🛡": <img className="shield-icon" src={shieldicon} />}]
    // const wordsToReplace = [{pattern: /zcash/gi, replacement: "Scamcoin"}]
    const zaddrMarker = "🚠"

    const reformatShields = (str, replyZaddr, username) => {
        let output = []
        str = str.replace(/^board::(\w+)/i, "").replace(/^reply::(\d+)/i, "").trim()

        // wordsToReplace.forEach()
        
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
                    output.push(<Link style={{padding: "0"}} className="board-zaddr-link" to={`/${username}`}>{replyZaddr}</Link>)
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




    function lineReducer(str) {
        let arr = str.split("\n");
        if (arr.length > 20) {
          return arr.join("")
        } else {
          return arr.join("\n")
        }
      }

      function offset(el) {
        var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
        }

      const getNotifiedContent = () => {
       if (newReplyId) {
           setNotificationVis(false)
           props.history.push(`/z/post/${newReplyId}`)
           return
       }
        if (!/board\/1$/.test(window.location)) {
            props.history.push("/z/all/1")
        }
        fetchPinned();
        axios.get(`https://be.zecpages.com/board/1`)
        .then(res =>{ 
                let newPosts= res.data.sort( (a, b) => b.id-a.id)
                if (posts !== newPosts) {
                    const scrollHeight = offset(document.querySelector(".board-page-buttons")).top;
                    window.scroll({top: scrollHeight, behavior: "smooth"})
                    if (showReplies) {
                        setPosts(newPosts)

                    } else {
                        setPosts(newPosts.filter(post => !post.reply_to_post ))
                    }
                    setPage(1)
                    setNotificationVis(false)
                }
            })
        .catch(err => console.log(err));
        axios.get(`https://be.zecpages.com/board/count`)
        .then(res =>{ 
                setPostCount(Number(res.data));
            })
        .catch(err => console.log(err));
    }


    useEffect(_ => {
        if (newLike) addLike(newLike)
    },[newLike])

    useEffect(_ => {
            if (showReplies) {
                getNewPosts()
            } else {
                console.log("YOU ARE HERE")
                setPosts(posts.filter(post => !post.reply_to_post ))
            }
    }, [showReplies])

    const getNewPosts = () => {

        if (props.match.params.page === "0") {
            props.history.push("/z/all/1")
            return
        }
        const page = +props.match.params.page || 1
        axios.get(`https://be.zecpages.com/board/${page}`)
        .then(res =>{ 
                let newPosts= res.data.sort( (a, b) => b.id-a.id)
                if (posts !== newPosts) {
                    if (showReplies) {
                        setPosts(newPosts)
                    } else {
                        
                        setPosts(newPosts.filter(post => !post.reply_to_post ))
                    }
                    setNotificationVis(false)
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
        axios.get(`https://be.zecpages.com/board/decayedpinned`)
        .then(res => {

            if (!pinned || res.data.id !== pinned.id) {
                setPinned(res.data)
            } else if (res.data.id === pinned.id) {
                setPinned({...pinned, decayed_amount: res.data.decayed_amount})
            }
        })
        .catch(err => console.log(err))
    }

    useEffect(_ => {


        axios.get("https://api.coingecko.com/api/v3/simple/price?ids=zcash&vs_currencies=usd")
            .then(r => setZecPrice(r.data.zcash.usd))
            .catch(err => console.log(err))


        Pusher.logToConsole = false;
        setInterval(adjustCardHeight, 100)
        var pusher = new Pusher('0cea3b0950ab8614f8e9', {
            cluster: 'us2',
            forceTLS: true
        });
        var channel = pusher.subscribe('board');
            // todo - Push new like ids ? Only manually refresh posts?
            channel.bind('new-post', function(data) {
            

            if (data.liked_post_id) {
                setNewLike(data.liked_post_id)
            } else if (data.reply_to) {
                if (!notificationVis) {
                    setNewReplyId(data.reply_to)
                    setNotificationVis(true)
                }
            }
            else {
                setNewReplyId(null)
                setNotificationVis(true);
            }
            // getNewPosts();
        });
    }, [])

    const formatReplyBody = str => {    
        setReplyBody(str)
    }

    const adjustCardHeight = _ => {
        const flipCard = document.querySelector(".flip-card")
        const flipCardBack = document.querySelector(".pinned-back")
        const pinnedPost = document.querySelector("#pinned-post");
        if (pinnedPost && flipCard && flipCardBack) {
            const postStyles = getComputedStyle(pinnedPost)
            const newHeight = pinnedPost.offsetHeight
            const newHeightWithMargin = pinnedPost.offsetHeight + parseInt(postStyles.marginTop) + parseInt(postStyles.marginBottom) - 24
            flipCard.style.height = `${newHeight}px`
            flipCardBack.style.height = `${newHeightWithMargin}px`
        }       
    }


    useEffect( _ => {
        fetchPinned();
        
        if (props.match.params.page) setPage(+props.match.params.page)
        // window.scrollTo(0, 0);
        if (+props.match.params.page === 1 || !props.match.params.page) {
            getNewPosts();
            setPrev(false)
        } else {
            getNewPosts();
            setPrev(true)
        }
    },[props.match.params.page])

    useEffect( _ => {
        if (page * 25 >= postCount) {
            setNext(false)
        } else {
            setNext(true)
        }
    },[postCount, page])

    const stringifyDate = date => {
        return new Date(Number(date)).toLocaleString().replace(/[,] /ig, " ").replace(/(pm|am)$/ig, "")
    }

    const handleLikeTooltip = (id, e) => {
 
        if (e) e.stopPropagation();

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

    const showCopyTooltipById = (id) => {
        document.querySelector(`.copied-tooltip-${id}`).classList.add('visible')
        setTimeout(_ => document.querySelector(`.copied-tooltip-${id}`).classList.remove('visible'), 1000)
    }

    const addLike = postId => {
        const post = posts.find(post => post.id === postId)
        if (pinned.id === postId) setPinned({...pinned, likes: pinned.likes + 1})
        if (!post) return
        let newPosts = posts.filter(post => post.id !== postId)
        newPosts.push({...post, likes: post.likes + 1})
        setPosts(newPosts.sort( (a, b) => b.id-a.id))
        
    }

    const flipCard = _ => {
        if (!flipped) {
            fetchPinned();
        }
        setFlipped(!flipped)
    }

    useEffect(_ => { console.log(pinned)},[pinned])

    const formatTime = datetime => {
        let timeInSeconds = Math.floor((Date.now() - datetime) / 1000)
        const days = Math.floor(timeInSeconds / (60 * 60 * 24))
        timeInSeconds -= (days * (60 * 60 * 24))
        const hours = Math.floor(timeInSeconds / (60 * 60))
        timeInSeconds -= (hours * (60 * 60))
        const minutes = Math.floor(timeInSeconds / (60))
        timeInSeconds -= (minutes * (60))
        const seconds = timeInSeconds
        return `${days}d\xa0${hours}h\xa0${minutes}m\xa0${seconds}s`
    }

    return (
        <div className={"z-board"}>
            {notificationVis && <h2 onClick={getNotifiedContent} className='update-notification'>New Posts</h2>}

            <div className={darkMode ? "board-explainer dark-mode" : "board-explainer"}>
                <h2>ZEC-powered anonymous memo board</h2>
                <h3 style={{margin: "0 auto", width: "95%", wordBreak: 'break-all'}}>{boardZaddr}<CopyIcon value={boardZaddr} /></h3>
                
                
                <div style={{display: "block"}}>
                    
                    <button style={{width: "150px", margin: "5px auto", display: "flex", justifyContent: "center", alignItems: "center", padding: "5px"}} onClick={_ => setQrVis(!qrVis)}>{qrVis ? "Hide editor" : "Create a Post"}<img alt="qr code"  style={{ cursor: 'pointer',  marginLeft: "10px", marginTop: '0px', height: "2rem", width: "2rem"}} src={darkMode ? qricondark : qricon}/></button>
                </div>
                
                {qrVis 
                ? <>
                <br/>
                <PostEntry
                    isReply={false}
                    post={{amount: "100000"}}
                    boardZaddr={boardZaddr}
                    darkMode={darkMode}
                    formatReplyBody={formatReplyBody}
                    replyBody={replyBody}
                    boardInput={boardInput}
                    setBoardInput={setBoardInput}
                />
                
                {/* <br/><QRCode bgColor={darkMode ? "#111111" : '#5e63fd'} fgColor={darkMode ? "#7377EF" : '#d1d2ff'} includeMargin={true} size={256} value={`${boardZaddr}`} /><br /> */}
                </> 
                : null}
            </div>
            {showViewKey && 
            <p className="view-key" style={{margin: "5px auto", width: "60%", wordBreak: "break-all"}}>
                {viewKey}
                <a className="view-key-link" style={{margin: "1%", display: "block", textDecoration: "underline"}} target="_blank" rel="noopener noreferrer" href="https://electriccoin.co/blog/explaining-viewing-keys/">
                    What's a viewing key?</a> 
            </p>}
            <button style={{marginBottom: "18px"}} onClick={_ => setShowViewKey(!showViewKey)} >{showViewKey ? "Hide View Key" : "Show View Key"}</button><br/>
            
            {pinned && !!posts.length && 
                <>
                <div onClick={flipCard} className={`${flipped ? "flipped" : ""} flip-card`}>
                <div className='flip-card-inner'>
                <div className="flip-card-front">   
                    <div 
                        id="pinned-post"
                        key={pinned.id} 
                        className={"highlighted-board-post board-post"}>
                        <div className="pinned-header">
                            {/* <h4>{pinned.id}</h4> */}
                            <h4></h4>
                            <h3 className="pin-text">Pinned for {(pinned.amount / 100000000).toFixed(8)}{"\xa0"}ZEC</h3>
                        </div>
                        {!!pinned.board_name && <p className="post-text sub-board-link">Posted to <Link className="z-link" to={`/z/${pinned.board_name}`}>z/{pinned.board_name}</Link></p>}
                        {!!pinned.reply_to_post && <p className="post-text sub-board-link">Replying to <Link className="z-link" to={`/z/post/${pinned.reply_to_post}`}>{pinned.reply_to_post}</Link></p>}
                        <p className="post-text">{reformatShields(lineReducer(pinned.memo.split("â€™").join("'")).split("\\n").join("\n"), pinned.reply_zaddr, pinned.username)}</p>
                        
                        {likeTooltip === "pinned" &&
                        <p style={{margin: 0, marginBottom: "10px", wordBreak: "break-word", paddingLeft: "10px"}}><code>Like this post: <img alt="qr code" onClick={e => { e.stopPropagation(); setReplyQrVis(!replyQrVis) } } style={{ cursor: 'pointer',  marginLeft: '10px', height: "2rem", width: "2rem"}} src={darkMode ? qricondark : qricon}/>
                        <br/> 
                        <a className="uri-link" onClick={e=> e.stopPropagation()} href={`zcash:${boardZaddr}?amount=0.001&memo=${btoa(`LIKE::${pinned.id}`)}`}>{`zcash:${boardZaddr}?amount=0.001&memo=${btoa(`LIKE::${pinned.id}`)}`}</a> 
                        <span className="copy-icon icon" onMouseDown={flagClickedIcon} onMouseLeave={flagUnClickedIcon} onMouseUp={flagUnClickedIcon} onClick={e => {e.stopPropagation(); copyTextToClipboard(`zcash:${boardZaddr}?amount=0.001&memo=${btoa(`LIKE::${pinned.id}`)}`); showCopyTooltipById(pinned.id);}}>
                        <img alt="copy" title="Copy to Clipboard" src={ab ? copyiconb : darkMode ? copyicondark : copyicon}></img>
                        <span style={{textAlign: "center"}} className={`copied-tooltip copied-tooltip-${pinned.id}`}>Copied!</span></span>
                        <br/> or simply make a board post with the memo "{`LIKE::${pinned.id}`}"</code></p>}
                        {replyQrVis && likeTooltip === "pinned" && <QRCode bgColor={darkMode ? "#111111" : '#743943'} fgColor={darkMode ? "#C46274" : '#ffe8ec'} style={{margin: '.5% auto', display: 'block'}} includeMargin={true} size={256} value={`zcash:${boardZaddr}?amount=0.001&memo=${btoa(`LIKE::${pinned.id}`)}`} />}
                        <div className="post-bottom-row">
                        <div className="post-date">
                                <div className="like-container">
                                    <img alt="zcash heart" onClick={e => handleLikeTooltip("pinned", e)} className="like-icon" src={darkMode ? darklike : like} />
                                    <span>{pinned.likes}</span>
                                </div>
                            
                        </div>
                        <div className="post-links">
                            <div className="post-date" style={{display:'inline'}}>
                                <p style={{display: "inline"}}>{stringifyDate(pinned.datetime)}</p>
                            </div>
                            <Link to={`/z/post/${pinned.id}`}> 
                                {pinned.reply_count > 1 ? `${pinned.reply_count} Replies` : pinned.reply_count === 1 ? "1 Reply" : "Reply"}
                            </Link>
                            <Link to={`/z/post/${pinned.id}`}> 
                                Permalink
                            </Link>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="flip-card-back">
                    <div id='pinned-post' className={"highlighted-board-post board-post pinned-back"}>

                        <div className="pinned-header">
                            {/* <h4>{pinned.id}</h4> */}
                            <h4></h4>
                        </div>

    
                        <div className="icon-card">
                            <div className="pinned-card-back-text">
                                <h5>Pinned for {formatTime(pinned.datetime)}</h5>
                                <h5 onClick={e => e.stopPropagation() }>Current Price To Pin: <span className="no-break-text">{inUsd 
                                ? `$${Math.max(0.10000001 * zecPrice, ((+pinned.decayed_amount + 1) / 100000000) * zecPrice ).toFixed(2)}` 
                                : `${Math.max(0.10000001, (+pinned.decayed_amount + 1) / 100000000).toFixed(8)}\xa0ZEC` }</span></h5>
                                <h5>Price decaying by <span className="no-break-text">{inUsd ? `$${(0.00000005 * zecPrice).toFixed(8)}` : "0.00000005\xa0ZEC"}/second</span></h5>
                                <button className="unit-toggle" onClick={e => {e.stopPropagation(); setInUsd(!inUsd)}}>{"Toggle Unit"}</button>
                            </div>
                            <div className="img-container">
                                <img src={shieldicon} className="pinned-big-icon" />
                            </div>
                            {/* <img src={darkMode ? zebraemoji : zebraemojiblack} className="pinned-big-icon" /> */}

                        </div>
                    </div>
                </div>
                </div>
                </div>
                </>
                }

        
            {posts.length > 0 
            ? 
            <>
            <BoardPageControls
                showReplies={showReplies}
                setShowReplies={setShowReplies}
                history={props.history} 
                setPage={setPage}
                next={next}
                prev={prev}
                page={page} />

            {posts.map(item => 
               <>

               
                <div className="aos-container" >
                <div key={item.id} className={item.amount >= 10000000 ? "highlighted-board-post board-post" : "board-post"}>
                    {/* <h4 className="post-id">{item.id}</h4> */}
                    {!!item.board_name && <p className="post-text sub-board-link">Posted to <Link className="z-link" to={`/z/${item.board_name}`}>z/{item.board_name}</Link></p>}
                    {!!item.reply_to_post && <p className="post-text sub-board-link">Replying to <Link className="z-link" to={`/z/post/${item.reply_to_post}`}>{item.reply_to_post}</Link></p>}
                    <p onClick={e=> e.stopPropagation()} className="post-text">{reformatShields(lineReducer(item.memo.split("â€™").join("'")).split("\\n").join("\n"), item.reply_zaddr, item.username)}</p>
                    {/* <p onClick={e=> e.stopPropagation()} className="post-text">{item.memo}</p> */}
                    
                    
                    {likeTooltip === item.id && 
                    <>
                    <p style={{margin: 0, marginBottom: "10px", marginBottom: "10px", wordBreak: "break-word", paddingLeft: "10px"}}><code>Like this post: <img alt="qr code" onClick={e => { e.stopPropagation() ;  setReplyQrVis(!replyQrVis) } } style={{cursor: 'pointer', marginLeft: '10px', height: "2rem", width: "2rem"}} src={darkMode ? qricondark : qricon}/> 
                    <br/> 
                    <a className="uri-link" href={`zcash:${boardZaddr}?amount=0.001&memo=${btoa(`LIKE::${item.id}`)}`}>{`zcash:${boardZaddr}?amount=0.001&memo=${btoa(`LIKE::${item.id}`)}`} </a>
                    <span className="copy-icon icon" onMouseDown={flagClickedIcon} onMouseLeave={flagUnClickedIcon} onMouseUp={flagUnClickedIcon} onClick={_ => {copyTextToClipboard(`zcash:${boardZaddr}?amount=0.001&memo=${btoa(`LIKE::${item.id}`)}`); showCopyTooltipById(item.id);}}>
                    <img alt="copy" title="Copy to Clipboard" src={ab ? copyiconb : darkMode ? copyicondark : copyicon}></img>
                    <span style={{textAlign: "center"}} className={`copied-tooltip copied-tooltip-${item.id}`}>Copied!</span></span>
                    <br/> or simply make a board post with the memo "{`LIKE::${item.id}`}"</code></p>
                    {replyQrVis && <QRCode bgColor={darkMode ? "#111111" : item.amount >= 10000000 ? '#743943' : '#5e63fd'} fgColor={darkMode ? item.amount >= 10000000 ? "#C46274" : "#7377EF" : '#ffe8ec'} style={{margin: '.5% auto', display: 'block'}} includeMargin={true} size={256} value={`zcash:${boardZaddr}?amount=0.001&memo=${btoa(`LIKE::${item.id}`)}`} />}
                    </>}
                    <div className="post-bottom-row">
                    <div className="post-date">
                    {item.likes ?
                    <div className="like-container">
                            <img alt="zcash heart" onClick={e => {e.stopPropagation() ; handleLikeTooltip(item.id)} } className="like-icon" src={darkMode ? darklike : like} /> 
                         <span>{item.likes}</span> 
                    </div>
                    : <div className="like-icon-container" style={{width:"2rem", marginRight: '5px'}}>
                        <img alt="zcash heart" src={darkMode ? darklike : like} onClick={e => { e.stopPropagation() ; handleLikeTooltip(item.id) } } className="like-icon" style={{ marginRight: '5px', cursor: "pointer"}}></img></div> }
                        
                        <p style={{display: "inline"}}>{stringifyDate(item.datetime)}</p>
                    </div>
                    <div className="post-links">
                        <Link to={`/z/post/${item.id}`}> 
                        {item.reply_count > 1 ? `${item.reply_count} Replies` : item.reply_count === 1 ? "1 Reply" : "Reply"}
                        </Link>
                        <Link to={`/z/post/${item.id}`}> 
                        Permalink
                        </Link>
                    </div>
                    </div>
                </div> 
                </div>  
                
                </>
            )}
            <BoardPageControls 
                history={props.history}
                setPage={setPage}
                next={next}
                prev={prev}
                page={page} />
            <h5>{`There are currently ${postCount} posts on this board!`}</h5>
            </>
        : 
        <>
            {darkMode ? <img  id="spinner" alt="spinning zcash logo" src={zcashLogoDark} /> : <img  id="spinner" alt="spinning zcash logo" src={zcashLogo} />}
            
        </>}


        </div>

    )

}