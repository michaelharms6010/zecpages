import React, {useState, useEffect} from "react"
import axios from "axios"
import Countdown from 'react-countdown';
import logo from "../../icons/shieldicon.gif"
import "../Board.scss"

export default function HalvingCountdown({role, location}) {
    const search = location.search;
    const params = new URLSearchParams(search);
    const bgColor = params.get('bgcolor');
    const [styles, setStyles] = useState({foreground: {}, background: {background: bgColor || 'white'}})
    const [windowHeight, setWindowHeight] = useState(`${window.innerHeight}px`)
    const [loading, setLoading] = useState(true)
    useEffect(_ => {

        const fgColor = params.get('fgcolor');
        const fontColor = params.get('fontcolor')
        const noLogo = params.get('nologo')
        setStyles({
            logo: {
                display: noLogo ? "none" : "inline"
            },
            foreground: {
                color: fontColor || 'black',
                background: fgColor || 'white',
                borderColor: fgColor || "black"

            },
            background: {
                background: bgColor || 'white',
            }
        
        })
        
        
        
    },[])
    
    const [blockHeight, setBlockHeight] = useState(null)
    const [secondsToHalving, setSecondsToHalving] = useState(null)
    const halvingBlock = 2726400

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
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
            <div style={styles.foreground} className="countdown-container-number">
                <h3 style={styles.foreground}>{title}</h3>
                <h2 style={styles.foreground} className="countdown-number">{value}</h2>
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
            setTimeout(_ => setLoading(false), 50)
        }
    }, [blockHeight])

    return(
        <div style={{minHeight: windowHeight, ...styles.background}} className="halving-countdown halving-countdown-widget">
            {!loading && blockHeight && <div>

            <img style={styles.logo} height={200} width={173} src={logo}></img>
            <div style={styles.foreground} className="countdown-header">
                <h2 style={styles.foreground}>Zcash's next halving will take place at  <br/>~{new Date(Date.now() + secondsToHalving * 1000).toLocaleString()}</h2>
                <h2 style={styles.foreground}>Halving block: {halvingBlock}</h2>            
                {!!blockHeight && <h2 style={styles.foreground}>Current block: {blockHeight} ({halvingBlock - blockHeight} blocks to go)</h2>}
            </div>
            {!!secondsToHalving && 
                <Countdown
                date={Date.now() + secondsToHalving * 1000}
                renderer={renderer}
                />
            }
            </div>}
        </div>
        
        
    )
}