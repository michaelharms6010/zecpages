import axios from 'axios';
import React, {useState} from 'react';
import {Link} from "react-router-dom"

export default function BoardPagecontrols({posts, setPosts, page, prev, setPage, next, history, setShowReplies, showReplies, onlySearch}) {
    const [search, setSearch] = useState("")

    React.useEffect(_ => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let query = params.get('query');
        if (query) {
            doSearch(query)
            setSearch(query)
        }
    }, [])

    const doSearch = _ => {
        axios.post("https://be.zecpages.com/board/search", {search})
        .then(r =>{ console.log(r)
        setPosts(r.data)})
        .catch(err => console.log(err))
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log(search)
        if (!window.location.href.includes("search")) {
            history.push(`/search?query=${search}`)
        } else {
            doSearch(search)
        }

        
        
    }
    
    return (
    <>
    {onlySearch?
    <div className="board-controls-container" style={{margin: "20px auto", justifyContent: "center"}}>
    <div className="board-search">
    <form onSubmit={handleSubmit}>
    <input
    style={{transform: "scale(1)", margin: "0"}}
        name="search"
        value={search}
        onChange={e => setSearch(e.target.value)} />
    <button>Search</button>
    </form>
</div></div> :
    <div className="board-controls-container">
    <div className="board-search">
        <form onSubmit={handleSubmit}>
        <input
        style={{transform: "scale(1)", margin: "0", marginTop: "10px"}}
            name="search"
            value={search}
            onChange={e => setSearch(e.target.value)} />
        <button>Search</button>
        </form>
    </div>
    <div className="board-page-buttons">

        {showReplies !== undefined ? 
        <>
            <label>Show Replies: </label>
            <input type="checkbox"
                    autocomplete="off"
                    checked={showReplies}
                    value={showReplies}
                    onChange={_ => setShowReplies(!showReplies)} />
        </>
        :
        null}
            <button disabled={prev ? "" : "disabled"} onClick={_ => history.push(`/z/all/${page-1}`)} className="board-previous">
                <Link className="page-link" to={`/z/all/${page-1}`}>Previous</Link>
            </button> 
            <button className="page-number" disabled="disabled">{page}</button>
            
            <button disabled={next ? "" : "disabled"}  onClick={_ => history.push(`/z/all/${page+1}`)} className="board-next">
                <Link className="page-link" to={`/z/all/${page+1}`}>Next</Link>
            </button> 
                
    </div>
    </div>}
    </>
    )
}