import React, {useState, useEffect, useContext} from "react";
import axios from "axios"
import "./Board.scss"
import QRCode from "qrcode.react";
import logo from "../zcash-icon.png"
import {Link} from "react-router-dom";
import like from "../378zheart.png"
import darklike from "../378zheartdark.png"
import qricon from "../icons/qr.png"
import AOS from 'aos'
import 'aos/dist/aos.css';
import {UserContext} from "../contexts/UserContext";
import qricondark from "../icons/qrdark.png"
import shieldicon from "../icons/shieldicon.gif"
import copyicon from "../icons/zecpagescopyicondaymode01.png"
import copyicondark from "../icons/bignightcopy.png"
import copyiconb from "../icons/copyiconb.png"
import {copyTextToClipboard} from "../utils/copy"
import PollChart from "./charts/PollChart"
import BoardPageControls from "./BoardPageControls"
import zcashLogo from "../zcash-icon.png"
import zcashLogoDark from "../zcash-icon-dark.png"

export default function UserBoard(props) {
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
    const [page, setPage] = useState(1)
    const [postCount, setPostCount] = useState(0)
    const [showViewKey, setShowViewKey] = useState(false)
    const {darkMode} = React.useContext(UserContext)
    const [pinned, setPinned] = useState(null)
    const [next, setNext] = useState(true);
    const [prev, setPrev] = useState(true);
    const [loaded, setLoaded] = useState(false)
    const [newReplyId, setNewReplyId] = useState(null)
    const [notificationVis, setNotificationVis] = useState(false)
    const [likeTooltip, setLikeTooltip] = useState(null)
    const qrVal = "zs1j29m7zdhhyy2eqrz89l4zhk0angqjh368gqkj2vgdyqmeuultteny36n3qsm47zn8du5sw3ts7f"
    const viewKey = "zxviews1q0duytgcqqqqpqre26wkl45gvwwwd706xw608hucmvfalr759ejwf7qshjf5r9aa7323zulvz6plhttp5mltqcgs9t039cx2d09mgq05ts63n8u35hyv6h9nc9ctqqtue2u7cer2mqegunuulq2luhq3ywjcz35yyljewa4mgkgjzyfwh6fr6jd0dzd44ghk0nxdv2hnv4j5nxfwv24rwdmgllhe0p8568sgqt9ckt02v2kxf5ahtql6s0ltjpkckw8gtymxtxuu9gcr0swvz"


    const iconsToReplace = [{"🛡": <img className="shield-icon" src={shieldicon} />}]

    const zaddrMarker = "🚠"

    const reformatShields = (str, replyZaddr, username) => {
        let output = []
        str = str.replace(/^board::(\w+)/i, "").replace(/^reply::(\w+)/i, "").trim()
        
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
        axios.get(`https://be.zecpages.com/board/u/${props.match.params.username}`)
        .then(res =>{ 
            
                let newPosts= res.data.posts.sort( (a, b) => b.id-a.id)
                if (posts !== newPosts) {
                    const scrollHeight = offset(document.querySelector(".board-page-buttons")).top;
                    window.scroll({top: scrollHeight, behavior: "smooth"})
                    setPosts(newPosts)
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

    const getNewPosts = () => {

        if (props.match.params.page === "0") {
            props.history.push("/z/all/1")
            return
        }
        const page = +props.match.params.page || 1
        axios.get(`https://be.zecpages.com/board/u/${props.match.params.username}`)
        .then(res =>{ 
                if (!res.data.posts.length) {
                    setLoaded(true)
                    return
                }
                let newPosts= res.data.posts.sort( (a, b) => b.id-a.id)
                if (posts !== newPosts) {
                    setPosts(newPosts)
                    setNotificationVis(false)
                    setLoaded(true)
                }
            })
        .catch(err => {setLoaded(true); console.log(err)});
        axios.get(`https://be.zecpages.com/board/count`)
        .then(res =>{ 
                setPostCount(Number(res.data));
            })
        .catch(err => console.log(err));
    }

    const fetchPinned = _ => {
        axios.get(`https://be.zecpages.com/board/pinned`)
        .then(res => {
            if (!pinned || res.data.id !== pinned.id) {
                setPinned(res.data)
            }
        })
        .catch(err => console.log(err))
    }

    useEffect(_ => {

    }, [])

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

    useEffect( _ => {
        if (posts.length > 0) {
            document.querySelector(".z-board").style.display = "block";
        }
    }, [posts])

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

    return (
        
        <div style={props.cardview ? {paddingTop: "0", display: "none"}: {}} className={"z-board"}>
    
            {notificationVis && <h2 onClick={getNotifiedContent} className='update-notification'>New posts/likes</h2>}

            <div className={darkMode ? "board-explainer dark-mode" : "board-explainer"}>
                <h1 style={{marginBottom: "0"}}><Link style={props.cardview ? {cursor: "default"} : {}} className="user-page-link" to={`/${props.match.params.username}`}>{props.cardview ? "Posts" : props.match.params.username}</Link></h1>
                <p style={{ margin: "1% auto", width: "80%", fontSize: "18px"}}><br/><strong>Admin Note:</strong> It's the nature of an anonymous, permissionless push system that these posts are only ALLEGED to be by {props.match.params.username}. Feed curation coming soon.</p>
            </div>
            
            
            

        
            {posts.length > 0 
            ? 
            <>
            

            {posts.map(item => 
               <>

               
                <div key={item.id} className="aos-container" >
                <div style={{paddingTop: "10px"}} key={item.id} className={item.amount >= 10000000 ? "highlighted-board-post board-post" : "board-post"}>
                    {/* <h4 className="post-id">{item.id}</h4> */}
                    {!!item.reply_to_post && <Link style={{marginTop: "10px"}} to={`/z/post/${item.reply_to_post}`}>👈 Replying to {item.reply_to_post}</Link> }
                    <p className="post-text">{reformatShields(lineReducer(item.memo.split("â€™").join("'")).split("\\n").join("\n"), item.reply_zaddr, item.username)}</p>
                    
                    
                    {likeTooltip === item.id && 
                    <>
                    <p style={{margin: 0, marginBottom: "10px", marginBottom: "10px", wordBreak: "break-word", paddingLeft: "10px"}}><code>Like this post: <img alt="qr code" onClick={_ => setReplyQrVis(!replyQrVis)} style={{cursor: 'pointer', marginLeft: '10px', height: "2rem", width: "2rem"}} src={darkMode ? qricondark : qricon}/> <br/> {`zcash:${qrVal}?amount=0.001&memo=${btoa(`LIKE::${item.id}`)}`} 
                    <span className="copy-icon icon" onMouseDown={flagClickedIcon} onMouseLeave={flagUnClickedIcon} onMouseUp={flagUnClickedIcon} onClick={_ => {copyTextToClipboard(`zcash:${qrVal}?amount=0.001&memo=${btoa(`LIKE::${item.id}`)}`); showCopyTooltipById(item.id);}}>
                    <img alt="copy" title="Copy to Clipboard" src={ab ? copyiconb : darkMode ? copyicondark : copyicon}></img>
                    <span style={{textAlign: "center"}} className={`copied-tooltip copied-tooltip-${item.id}`}>Copied!</span></span>
                    <br/> or simply make a board post with the memo "{`LIKE::${item.id}`}"</code></p>
                    {replyQrVis && <QRCode bgColor={darkMode ? "#111111" : item.amount >= 10000000 ? '#743943' : '#5e63fd'} fgColor={darkMode ? item.amount >= 10000000 ? "#C46274" : "#7377EF" : '#ffe8ec'} style={{margin: '.5% auto', display: 'block'}} includeMargin={true} size={256} value={`zcash:${qrVal}?amount=0.001&memo=${btoa(`LIKE::${item.id}`)}`} />}
                    </>}
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

            <h5>{`There are currently ${posts.length} posts by ${props.match.params.username}`}</h5>
            </>
        : 
        loaded 
        ?
        <h3>{props.match.params.username} hasn't posted yet.</h3>
        : 
        <h3>
            {darkMode ? <img id="spinner" alt="spinning zcash logo" src={zcashLogoDark} /> : <img id="spinner" alt="spinning zcash logo" src={zcashLogo} />}
            
        </h3>}


        </div>

    )

}