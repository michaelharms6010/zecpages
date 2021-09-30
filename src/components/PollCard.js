import React, {useContext, useState} from "react"
import {UserContext} from "../contexts/UserContext"
import PollChart from "./charts/PollChart"
import PollVoter from "./PollVoter"
import {Link} from "react-router-dom";

export default function PollCard({post, onListView}) {
    
    const {darkMode} = useContext(UserContext)
    const [showResults, setShowResults] = useState(false)

    const [chosenOption, setChosenOption] = useState(null)
    const handleChange = e => setChosenOption(+e.target.value)

    const POLL_TITLE= "What's the deal with corn nuts?"
    const TEST_POLL_DATA = {
      "It's a corn": 8,
      "It's a nut": 15,
      "Who are these people?": 24
    }

    const pollString = post.memo.replace(/poll::/i, "")

    const pollJson = JSON.parse(pollString)

    const poll = JSON.stringify({
        q: "What's the deal with corn nuts?",
        o1: "It's a corn",
        o2: "It's a nut",
        o3: "Who are these people?",
        o4: "None of the above"
    })

    const toggleShowResults = _ => setShowResults(!showResults)
  

    
    return ( 
    <div>

        <div style={{padding: 5}} key={post.id} className={post.amount >= 10000000 ? "highlighted-board-post board-post individual-post" : "board-post individual-post"}>
            <div className="poll-form">
                {
                    showResults
                    ? <PollChart darkMode={darkMode} pollTitle={pollJson.q} pollData={TEST_POLL_DATA} poll_id={post.id}  />
                    
                    : <PollVoter chosenOption={chosenOption} handleChange={handleChange} darkMode={darkMode} post={post} poll={pollString} />
                }
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <button onClick={toggleShowResults}>{!showResults ? "Show Results" : "Vote"}</button>
                    {!!onListView && <Link to={`/z/post/${post.id}`}>Permalink</Link>}
                </div>
            </div>
        </div>
    </div>
    )
}