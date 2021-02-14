import React, {useState, useEffect} from 'react';
import axios from "axios";

export default function BoardDropdown({history}) {
    const [boards, setBoards] = useState(["Loading Boards"])

    useEffect(_ => {
        axios.get('https://be.zecpages.com/board/boardlist')
        .then(r => setBoards(r.data.boards))
        .catch(err => console.log(err))
    },[])


    const handleChange = e => {
        history.push(`/z/${e.target.value}`)
    }


    return(
        <div className="board-dropdown-pair" style={{display: "flex", alignItems: "center"}}>
        <label>Board: </label>
        <select onChange={handleChange}>
            <option value={"all"}>z/all</option>
            {boards.map(board => 
                <option value={board.board_name}>
                    z/{board.board_name} ({board.post_count})
                </option>    
            )}

        </select>
        </div>
    )
}