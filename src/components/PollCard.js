import React, {useContext, useState} from "react"
import {UserContext} from "../contexts/UserContext"
import PollChart from "./charts/PollChart"
import PollVoter from "./PollVoter"

export default function PollCard({post}) {
    
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

    const poll = JSON.stringify({
        q: "What's the deal with corn nuts?",
        o1: "It's a corn",
        o2: "It's a nut",
        o3: "Who are these people?",
        o4: "None of the above"
    })

    const toggleShowResults = _ => setShowResults(!showResults)
  

    
    return ( 
    <div className={darkMode ? "dark-mode z-board" : "z-board"}>

        <div key={post.id} className={post.amount >= 10000000 ? "highlighted-board-post board-post individual-post" : "board-post individual-post"}>
            {
                showResults
                ? <PollChart darkMode={darkMode} pollTitle={POLL_TITLE} pollData={TEST_POLL_DATA} />
                
                : <PollVoter chosenOption={chosenOption} handleChange={handleChange} darkMode={darkMode} post={post} poll={poll} />
            }
            <button onClick={toggleShowResults}>{!showResults ? "Show Results" : "Vote"}</button>
        </div>
    </div>
    )
}