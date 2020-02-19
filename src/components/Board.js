import React, {useState, useEffect} from "react";
import axios from "axios"
import "./Board.scss"

export default function Board() {
    const [posts, setPosts] = useState([])
    const [toggle, setToggle] = useState(false)

    useEffect( _ => {
        axios.get("https://be.zecpages.com/board")
        .then(res =>{ 
                let newPosts= res.data.sort( (a, b) => b.id-a.id)
                if (posts !== newPosts) {
                    setPosts(newPosts)
                }
            })
        .catch(err => console.log(err));
        setTimeout( () => setToggle(!toggle),  100000)
    }, [toggle])

    const stringifyDate = date => {
        return new Date(Number(date)).toString().replace(" GMT-0600 (Central Standard Time)", "")
      }

    return (
        <div className="z-board">
            <h2>Anonymous Memo Board</h2>
            <h4 className="instructions-header">Send at least .001 ZEC to zs1n5m4szkmqup6ht9nuwke9j5w6pwcd527l4sm8u2aqqhaedjv5at64el6eyazm6engqplx0ht6x9 and it will be posted to this page for all to see!</h4>
            {posts.map(item => 
                <div className={item.amount >= 10000000 ? "highlighted-board-post board-post" : "board-post"}>
                    <p className="post-text">{item.memo}</p>
                    <p className="post-date">{stringifyDate(item.datetime)}</p>
                </div>    
            )}

        </div>

    )

}