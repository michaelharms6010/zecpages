import React from 'react';
import {Link} from "react-router-dom"

export default function BoardPagecontrols({page, prev, setPage, next, history}) {
    return (
    <div className="board-page-buttons">
                    <button disabled={prev ? "" : "disabled"} onClick={_ => history.push(`/z/all/${page-1}`)} className="board-previous">
                        <Link className="page-link" to={`/z/all/${page-1}`}>Previous</Link>
                    </button> 
                    <button className="page-number" disabled="disabled">{page}</button>
                 
                    <button disabled={next ? "" : "disabled"}  onClick={_ => history.push(`/z/all/${page+1}`)} className="board-next">
                        <Link className="page-link" to={`/z/all/${page+1}`}>Next</Link>
                    </button> 
                
    </div>
    )
}