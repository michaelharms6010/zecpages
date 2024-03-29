import axios from 'axios';
import React, {useState} from 'react';
import {Link} from "react-router-dom"
import BoardDropdown from "./BoardDropdown";

export default function BoardPagecontrols({offset, onlyDropdown, posts, setPosts, page, prev, setPage, next, history, setShowReplies, showReplies, onlySearch}) {
    const [search, setSearch] = useState("")

    React.useEffect(_ => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let query = params.get('query');
        if (query) {
            setSearch(query)
            doSearch(query)
        }
    }, [])

    const doSearch = query => {
        
        axios.post("https://be.zecpages.com/board/search", {search: query ? query : search})
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

    const scrollTop = _ => {
        const scrollHeight = offset(document.querySelector(".board-page-buttons")).top;
        window.scroll({top: scrollHeight, behavior: "smooth"})
    }
    
    return (
    <>
    {onlyDropdown ? 
     <BoardDropdown history={history} />
     :
    onlySearch?
    <div className="board-controls-container" style={{margin: "20px auto", justifyContent: "center"}}>
    <div className="board-search">
    <form className="search-form" onSubmit={handleSubmit}>
    <input
    style={{transform: "scale(1)", margin: "0", marginLeft: "1px"}}
        name="search"
        value={search}
        onChange={e => setSearch(e.target.value)} />
    <button>Search</button>
    </form>
</div></div> :
    <div className="board-controls-container">
    <div className="board-search">
        <form  className="search-form" onSubmit={handleSubmit}>
        <input
        style={{transform: "scale(1)", margin: "0", marginTop: "10px", marginLeft: "1px"}}
            name="search"
            value={search}
            onChange={e => setSearch(e.target.value)} />
        <button>Search</button>
        </form>
        <BoardDropdown history={history} />
    </div>
    <div className="board-page-buttons">

        {showReplies !== undefined ? 
        <div>
            <label>Show Replies: </label>
            <input type="checkbox"
                    autocomplete="off"
                    checked={showReplies}
                    value={showReplies}
                    onChange={_ => setShowReplies(!showReplies)} />
        </div>
        :
        null}
        <div style={{display:"flex"}}>
            <button disabled={prev ? "" : "disabled"} onClick={_ => {history.push(`/z/all/${page-1}`); scrollTop()}} className="board-previous">
                <Link className="page-link" to={`/z/all/${page-1}`}>Previous</Link>
            </button> 
            <button className="page-number" disabled="disabled">{page}</button>
            
            <button disabled={next ? "" : "disabled"}  onClick={_ => {history.push(`/z/all/${page+1}`); scrollTop()}} className="board-next">
                <Link className="page-link" to={`/z/all/${page+1}`}>Next</Link>
            </button> 
        </div>
                
    </div>
    </div>}
    </>
    )
}