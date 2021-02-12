import React from "react";
import {Link} from "react-router-dom"
import axiosWithAuth from "../utils/AxiosWithAuth";
import jwt from "jsonwebtoken"


export default function Publish(props) {
    const [subscribers, setSubscribers] = React.useState([])
    const [memo, setMemo] = React.useState("")
    const [done, setDone] = React.useState(false)
    const [lastArticle, setLastArticle] = React.useState(null)
    const [user_id, setUserId] = React.useState(null)
    React.useEffect(_ => {
        const savedjwt = localStorage.getItem('jwt');
        if (savedjwt) {
            setUserId(jwt.decode(savedjwt).id)
        }

        axiosWithAuth().get("https://be.zecpages.com/users/getsubs")
        .then(r => setSubscribers(r.data))
        .catch(err => console.log(err))

        axiosWithAuth().get("https://be.zecpages.com/users/lastarticle")
        .then(r => {
            console.log(r)
            setLastArticle(r.data.article)
            console.log(new Date(r.data.article.date_created).getTime())
        })
        .catch(err => console.log(err))
    },[])


    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth().post("https://be.zecpages.com/users/publish", {memo})
        .then(r => {
            console.log(r)

            setDone(true)
        }).catch(err => console.log(err))
        console.log("post to zecpages backend here")
    }

    return (
        <>
        <div className="back-button-container">
            <Link className="back-profile-link" to="/edit">← Back to Profile</Link>
        </div>
        <div style={{position: "relative"}} className="publish-page">

            <h3>Publish to {`${subscribers.length}`} {subscribers.length === 1 ? "subscriber" : "subscribers"}:</h3>
            {lastArticle && lastArticle.date_created && new Date(lastArticle.date_created).getTime() > Date.now() - (1000 * 60 * 60 * 2) ? <h3>You can publish once every 2 hours. You can publish again in { 120 - Math.floor(((Date.now() - new Date(lastArticle.date_created).getTime()) / 1000) / 60) } minutes </h3> : null }
            <form className="publish-form" onSubmit={handleSubmit}>
                {!!subscribers.length && 
                <textarea maxLength="500"
                    value={memo}
                    name="memo"
                    disabled={(user_id && ![2,5,720].includes(user_id) && lastArticle && lastArticle.date_created && new Date(lastArticle.date_created).getTime() > Date.now() - (1000 * 60 * 60 * 2)) || !subscribers.length || done}
                    onChange={e => setMemo(e.target.value)} />}
                <button disabled={(user_id && ![2,5,720].includes(user_id) && lastArticle && lastArticle.date_created && new Date(lastArticle.date_created).getTime() > Date.now() - (1000 * 60 * 60 * 2)) || !subscribers.length || done} type="submit">{subscribers.length ? "Publish To Subscribers" : "You need subscribers to publish"}</button>
            </form>
            <h3 style={{position: "absolute", bottom: "10px", right: "10px"}}>{memo.length}/500</h3>
            {done && <h3 style={{marginTop: "10px"}}>Your content is being published. It should be included in the next few ZEC blocks.</h3>}
        </div>
        </>
    )
}