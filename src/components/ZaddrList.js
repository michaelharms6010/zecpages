import React, {useState, useEffect, useContext} from "react";
import {ZaddrContext} from "../contexts/ZaddrContext"
import ZaddrCard from "./ZaddrCard";
import logo from "../zcash-icon.png"

export default function ZaddrList (props) {
    const { zaddrs, copied, setCopied, loaded, setLoaded} = useContext(ZaddrContext);    
    const [results, setResults] = useState(zaddrs);
    const [search, setSearch] = useState("");
    

    useEffect( _ => {
        setTimeout( () => setLoaded(true), 1000 )
    },[])

    useEffect( _ => {
        setResults(zaddrs)
        setTimeout( () => setLoaded(true), 1000 )
    }, [zaddrs])

    useEffect( _ => {      
        if (search) {
            setResults(zaddrs.filter(item => 
                {
                    let searchable = String(item.twitter + item.username + item.description).split("null").join("").toLowerCase()
                    return searchable.includes(search.toLowerCase())
                }
            ))
        } else {
            setResults(zaddrs)
        }

    }, [search, zaddrs])

    return(
        <div className="zaddr-list">
            <h2 className="main-header">Zcash Z-address Directory</h2>     
            {loaded && zaddrs.length > 0
            ? 
            <>
                <label>Search:</label>
                <input
                className="search-input"
                value={search}
                onChange={e => setSearch(e.target.value)}
                />
                {results.map(item => 
                    item.zaddr 
                        ? <ZaddrCard key={item.id} user={item} copied={copied} setCopied={setCopied} /> 
                        : null
                )}
                <p>This humble directory contains {zaddrs.filter(item => item.zaddr ).length} 🦓 people! Help us grow!</p>
            </>
            : 
            <>
                <img id="spinner" alt="spinning zcash logo" src={logo} />
                <h2>Loading . . .</h2>
            </>
        }    
        </div>
     )
}