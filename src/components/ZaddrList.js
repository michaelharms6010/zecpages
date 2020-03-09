import React, {useState, useEffect, useContext} from "react";
import {ZaddrContext} from "../contexts/ZaddrContext"
import ZaddrCard from "./ZaddrCard";
import logo from "../zcash-icon.png"
import FilterBar from "./FilterBar"

export default function ZaddrList (props) {
    const { zaddrs, copied, setCopied, loaded, setLoaded} = useContext(ZaddrContext);    
    const [results, setResults] = useState(zaddrs);
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
        needs_twitter: false,
        needs_proof: false,
        needs_website: false,
        needs_email: false,
    })
    

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

    const handleFilterChange = e => {
        setFilters({...filters, [e.target.name]: e.target.checked})
        console.log(filters)
    }

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
                <div className="filter-checkboxes">
                    <label>Twitter
                    <input 
                        type="checkbox" 
                        name="needs_twitter"
                        checked={filters.needs_twitter}
                        onChange={handleFilterChange}
                    /></label>
                    <label>Proof
                    <input 
                        type="checkbox" 
                        name="needs_proof"
                        checked={filters.needs_proof}
                        onChange={handleFilterChange}
                    /></label>
                </div>
                {results.map(item => 
                    item.zaddr 
                        ? <ZaddrCard key={item.id} user={item} copied={copied} setCopied={setCopied} /> 
                        : null
                )}
                <p>This humble directory contains {zaddrs.filter(item => item.zaddr ).length} 🦓 people! Help us grow!</p>
                <FilterBar results={results} setResults={setResults} />
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