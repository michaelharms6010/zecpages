import React from "react";
import {Link} from "react-router-dom"
import axiosWithAuth from "../utils/AxiosWithAuth";

export default function Publish(props) {
    const [subscribers, setSubscribers] = React.useState([])
    const [memo, setMemo] = React.useState("")

    React.useEffect(_ => {
        axiosWithAuth().get("https://be.zecpages.com/users/getsubs")
        .then(r => setSubscribers(r.data))
        .catch(err => console.log(err))
    },[])


    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth().post("https://be.zecpages.com/users/publish", {memo})
        .then(r => {
            console.log(r)
            setMemo("")
        }).catch(err => console.log(err))
        console.log("post to zecpages backend here")
    }

    return (
        <>
        <div className="back-button-container">
            <Link to="/edit">Back</Link>
        </div>
        <div className="publish-page">

            <h3>Publish to {`${subscribers.length}`} {subscribers.length === 1 ? "subscriber" : "subscribers"}:</h3>
            <form className="publish-form" onSubmit={handleSubmit}>
                {!!subscribers.length && 
                <textarea maxLength="500"
                    value={memo}
                    name="memo"
                    onChange={e => setMemo(e.target.value)} />}
                <button disabled={!subscribers.length} type="submit">{subscribers.length ? "Publish To Subscribers" : "You need subscribers to publish"}</button>
            </form>
        </div>
        </>
    )
}