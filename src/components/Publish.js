import React from "react";
import {Link} from "react-router-dom"

export default function Publish(props) {
    const [subscribers, setSubscribers] = React.useState([])

    const handleSubmit = e => {
        e.preventDefault();
        console.log("post to zecpages backend here")
    }

    return (
        <>
        <div className="back-button-container">
            <Link to="/edit">Back</Link>
        </div>
        <div className="publish-page">

            <h3>Publish to {`${subscribers.length}`} subscribers:</h3>
            <form className="publish-form" onSubmit={handleSubmit}>
                {!!subscribers.length && <textarea maxLength="500" />}
                <button disabled={!subscribers.length} type="submit">{subscribers.length ? "Publish To Subscribers" : "You need subscribers to publish"}</button>
            </form>
        </div>
        </>
    )
}