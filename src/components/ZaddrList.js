import React, {useState, useEffect, useContext} from "react";
import {ZaddrContext} from "../contexts/ZaddrContext"
import ZaddrCard from "./ZaddrCard";
import axiosWithAuth from "../utils/AxiosWithAuth";
import logo from "../zcash-icon.png"

export default function ZaddrList (props) {
    const { zaddrs, setZaddrs, copied, setCopied } = useContext(ZaddrContext);    
    const [results, setResults] = useState(zaddrs);
    const [search, setSearch] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect( _ => {
        setTimeout( () => setLoaded(true), 1000 )
    },[])

  

    useEffect( _ => {
        setResults(zaddrs)
    }, [zaddrs])


    useEffect( _ => {
        if (search) {
            setResults(zaddrs.filter(item => 
                {
                    if (item.twitter){
                        return item.username.toLowerCase().includes(search.toLowerCase()) || item.twitter.toLowerCase().includes(search.toLowerCase())
                    } else {
                        return item.username.toLowerCase().includes(search.toLowerCase())
                    }
                }
            ))
        } else {
            setResults(zaddrs)
        }

    }, [search])

    return(
        <div className="zaddr-list">
            <h2 className="main-header">Z-address Directory </h2>
            
           
            {loaded 
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
            <p className="dev-disclaimer">This site is still under development! If you encounter issues while using it, please let me know on <a target="_new" href="https://twitter.com/michaelharms70">Twitter</a> or <a target="_new" href="https://github.com/michaelharms6010/fe-zeitpages">Github.</a></p>
            </>
            : <>
            <img id="spinner" src={logo} />
            <h2>Loading . . .</h2>
            </>
        }
            
            
        </div>
     )

}