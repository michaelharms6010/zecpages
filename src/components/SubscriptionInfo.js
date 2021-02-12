import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axiosWithAuth from "../utils/AxiosWithAuth";
import qricon from "../icons/qr.png"
import qricondark from "../icons/qrdark.png"
import QRCode from "qrcode.react";
import {UserContext} from "../contexts/UserContext"
import URLSafeBase64 from 'urlsafe-base64';
import {copyTextToClipboard} from "../utils/copy"
import CopyIcon from "./CopyIcon"
var Buffer = require('buffer/').Buffer

const BOARD_ZADDR = "zs1j29m7zdhhyy2eqrz89l4zhk0angqjh368gqkj2vgdyqmeuultteny36n3qsm47zn8du5sw3ts7f"

export default function SubscriptionInfo(props) {
    const [subscribers, setSubscribers] = useState([])
    const [subscriptions, setSubscriptions] = useState([])
    const [user, setUser] = useState({username: ""})
    const [qrVis, setQrVis] = useState(false)
    const {darkMode} = React.useContext(UserContext)

    const [uri, setUri] = useState("")

    


    useEffect( _ => {
        axiosWithAuth().get("https://be.zecpages.com/users/getsubscriptions")
        .then(r => setSubscriptions(r.data))
        .catch(err => console.log(err))
        axiosWithAuth().get("https://be.zecpages.com/users/getsubs")
        .then(r => setSubscribers(r.data))
        .catch(err => console.log(err))

        axiosWithAuth().get("https://be.zecpages.com/users/me")
        .then(res => { if (res.data) localStorage.setItem("user_id", res.data.id); setUser(res.data)})
        .catch(err => console.error(err))

    },[])

    useEffect( _ => {
        if (user) {
            setUri(`zcash:${BOARD_ZADDR}?amount=0.001&memo=${URLSafeBase64.encode(Buffer.from(`https://zecpages.com/${user.username}`))}`)
        }
    },[user])

    return (
        <>
        <div className="zaddr-card subscription-explainer">
            <h1>Subscriptions</h1>
            <h3>ZECpages allows users to monetize their content and publish to subscribers via Zcash memo. Subscribing to a user costs .06{"\xa0"}ZEC/month. (.05 goes to creator, .01 ZECpages fee)
            </h3>
            <h3>Users can subscribe via your user shortlink:<br/><Link to={`/${user.username}`}>https://zecpages.com/{user.username}</Link></h3>
            <h3>Share to the board: <img style={{marginLeft: "5px", cursor: "pointer", width: "25px", height: "25px"}} src={darkMode? qricondark: qricon} onClick={_ => setQrVis(!qrVis)} /></h3>
            
            {qrVis && <div>
                <p style={{marginBottom: "0"}}>{`zcash:${BOARD_ZADDR}&amount=0.001&memo=${URLSafeBase64.encode(Buffer.from(`https://zecpages.com/${user.username}`))}`}<CopyIcon value={uri} /></p>
                <QRCode bgColor={darkMode ? "#111111" : '#0a5e55'} fgColor={darkMode ? "#087f73" : '#bec0fe'} includeMargin={true} size={256} value={uri} /> 
            </div>}
            <hr/>
            <h3>Publish to your subscribers using the <Link to="/publish" >ZECpages publishing interface.</Link></h3>
            
        </div>
        <div className="subscription-info-container">

            <div className="subscription-panel subscribed-to-panel">
                <h3 style={{marginTop: "6px", marginBottom: "11px"}}>Subscriptions</h3>
                <hr/>
                {!!subscriptions.length && <table width="100%">
                <tbody>
                    <tr>
                        <th width="30%">User</th>
                        <th width="30%">Total Amount</th>
                        <th width="40%">End Date</th>
                    </tr>
                {subscriptions.map(subscription  => {
                    return(
                        <tr>
                           <td><Link to={`/${subscription.username}`}> {subscription.username}</Link></td> 
                           <td>{subscription.amount}</td> 
                           <td>{new Date(subscription.cutoff_date).toUTCString()}</td> 
                        </tr>
                    )
                })}
                </tbody>
                </table>}
            </div>
            <div className="subscription-panel subscribers-panel">
                <h3 style={{marginTop: "0px", marginBottom: "0px"}}>Subscribers{!!subscribers.length && <Link to="/publish"><button>Publish</button></Link>}</h3>
                <hr/>
                {!!subscribers.length && <table width="100%">
                    <tbody>
                    <tr>
                        <th width="30%">User</th>
                        <th width="30%">Total Amount</th>
                        <th width="40%">End Date</th>
                    </tr>
                {subscribers.map(subscriber  => {
                    return(
                        <tr>
                           <td><Link to={`/${subscriber.username}`}>{subscriber.username}</Link></td> 
                           <td>{subscriber.amount}</td> 
                           <td>{new Date(subscriber.cutoff_date).toUTCString()}</td> 
                        </tr>
                    )
                })}
                </tbody>
                </table>}
            </div>
        </div>
        </>
    )

}
