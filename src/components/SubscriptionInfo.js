import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axiosWithAuth from "../utils/AxiosWithAuth";

export default function SubscriptionInfo(props) {
    const [subscribers, setSubscribers] = useState([])
    const [subscriptions, setSubscriptions] = useState([])
    useEffect( _ => {
        // axiosWithAuth().get("https://be.zecpages.com/")
    },[])

    return (
        <>
        <div className="zaddr-card subscription-explainer">
            <h1>ZECstack Subscriptions</h1>
            <h3>ZECpages allows users to monetize their content and publish to subscribers via Zcash memo. Subscribing to a user costs .06{"\xa0"}ZEC/month. (.05 goes to creator, .01 ZECpages fee)</h3>
            <hr/>
            <h3>Publish to your subscribers using the <Link to="/publish" >ZECpages publishing interface.</Link></h3>
        </div>
        <div className="subscription-info-container">

            <div className="subscription-panel subscribed-to-panel">
                <h3 style={{marginTop: "6px", marginBottom: "11px"}}>Subscriptions</h3>
                <hr/>
            </div>
            <div className="subscription-panel subscribers-panel">
                <h3 style={{marginTop: "0px", marginBottom: "0px"}}>Subscribers<Link to="/publish"><button>Publish</button></Link></h3>
                <hr/>
            </div>
        </div>
        </>
    )

}
