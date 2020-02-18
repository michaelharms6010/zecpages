import React, {useState, useEffect} from "react";
import axios from "axios"
import "./Board.scss"

export default function Board() {
    const [posts, setPosts] = useState([])

    useEffect( _ => {
        axios.get("https://zeitpages-staging.herokuapp.com/board")
        .then(res => setPosts(res.data.sort( (a, b) => b.id-a.id)))
        .catch(err => console.log(err));
    }, [])

    return (
        <div className="z-board">
            {posts.map(item => 
                <div className="board-post">
                    <p>{item.memo}</p>
                    <p>{Date(item.datetime).toString().replace("GMT-0600 (Central Standard Time)", "")}</p>
                </div>    
            )}

        </div>

    )

}