import React, {useState, useEffect} from "react"
import axios from "axios"
import Countdown from 'react-countdown';
import logo from "../icons/shieldicon.gif"

export default function HalvingCountdown() {
    const [blockHeight, setBlockHeight] = useState(null)
    const [secondsToHalving, setSecondsToHalving] = useState(null)
    const halvingBlock = 2726400


    // Random component
    const Completionist = () => <span>The halving is now!!</span>;

    // Renderer callback with condition
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a completed state
        return <Completionist />;
    } else {
        // Render a countdown
        return  (
                    <div className="countdown-container">
                        <CountdownContainer title="Days" value={days}/>
                        <CountdownContainer title="Hours" value={hours}/>
                        <CountdownContainer title="Minutes" value={minutes}/>
                        <CountdownContainer title="Seconds" value={seconds}/>
                    </div>
                )

    }
    };

    function CountdownContainer({title, value}) {
        return (
            <div className="countdown-container-number">
                <h3>{title}</h3>
                <h2 className="countdown-number">{value}</h2>
            </div>
        )
    }


    useEffect(_ => {
        axios.get("https://api.zcha.in/v2/mainnet/network")
            .then(({data}) => setBlockHeight(data.blockNumber))
            .catch(console.error)
    },[])

    useEffect(_ => {
        if (blockHeight) {
            setSecondsToHalving((halvingBlock - blockHeight) * 75)
        }
    }, [blockHeight])

    return(
        <div className="halving-countdown">
            <img height={200} width={173} src={logo}></img>
            <div className="countdown-header">
                <h2>Zcash's next halving will take place at  <br/>~{new Date(Date.now() + secondsToHalving * 1000).toLocaleString()}</h2>
                <h2>Halving block: {halvingBlock}</h2>            
                {!!blockHeight && <h2>Current block: {blockHeight} ({halvingBlock - blockHeight} blocks to go)</h2>}
            </div>
            {!!secondsToHalving && 
                <Countdown
                date={Date.now() + secondsToHalving * 1000}
                renderer={renderer}
                />
            }
        </div>
        
    )
}