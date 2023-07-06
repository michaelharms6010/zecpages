import React, {useState, useEffect} from "react"
import axios from "axios"
import Countdown from 'react-countdown';
import logo from "../icons/shieldicon.gif"

export default function HalvingCountdown() {
    const [blockHeight, setBlockHeight] = useState(null)
    const [secondsToHalving, setSecondsToHalving] = useState(((new Date("2024-11-15")).getTime() - Date.now() + (3600000 * 6)) / 1000)
    const halvingBlock = 2726400
    const body = {
        "id": "blockNumber",
        "jsonrpc": "2.0",
        "method": "getblockchaininfo"
        }

    // Random component
    const Completionist = () => <span>The halving is now!!</span>;

    // Renderer callback with condition
    const renderer = ({ days, hours, minutes, seconds, completed }) => {

        // Render a countdown
        return  (
                    !completed
                    ?    <div className="countdown-container">
                            <CountdownContainer title="Days" value={days}/>
                            <CountdownContainer title="Hours" value={hours}/>
                            <CountdownContainer title="Minutes" value={minutes}/>
                            <CountdownContainer title="Seconds" value={seconds}/>
                        </div>
                    : <div className="countdown-container-complete">Zcash has halved! 🎉</div>
                    
                )

    
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
        axios.post("https://zec.getblock.io/62c2e4dd-3012-4127-91cf-70ab813bd22b/mainnet/", body)
            .then(({data}) => {
                console.log(data)
                setBlockHeight(+data.result.blocks)
                
            })
            .catch(e => console.log(e.response))
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