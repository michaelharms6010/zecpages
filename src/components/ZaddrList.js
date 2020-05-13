import React, {useState, useEffect, useContext} from "react";
import {ZaddrContext} from "../contexts/ZaddrContext"
import ZaddrCard from "./ZaddrCard";
import logo from "../zcash-icon.png"
import {copyTextToClipboard } from "../utils/copy";

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
            setResults(applyFilters(zaddrs))
        }

    }, [search, zaddrs, filters])


    const handleCopyAll = _ => {
        copyTextToClipboard(results.filter(item => item.zaddr).reduce((acc, val) => acc + val.zaddr + ",\n", ""))
    }

    const applyFilters = zaddrArray => {
        let output = zaddrArray
        if (filters.needs_twitter) {
            output = output.filter(item => item.twitter)
        } if (filters.needs_proof) {
            output = output.filter(item => item.proofposturl)
        }
        return output
    }

    const handleFilterChange = e => {
        setFilters({...filters, [e.target.name]: e.target.checked})
    }

    return(
        <div className="zaddr-list">
            
            <h2 className="main-header">Zcash Z-address Directory</h2>
            <div className="top-buttons">
                <a className="export-button" href="https://be.zecpages.com/users" target="_new"><button>Export All User Data / Zaddrs (Better Privacy)</button></a>
                <button className="export-button" onClick={handleCopyAll}>Copy all filtered zaddrs to clipboard (comma-separated)</button>
            </div>
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
                    <span>Filter:  {"  "}</span>
                    <label>Users with Proof
                    <input 
                        type="checkbox" 
                        name="needs_proof"
                        checked={filters.needs_proof}
                        onChange={handleFilterChange}
                    /></label>
                    <label>Users with Twitter
                    <input 
                        type="checkbox" 
                        name="needs_twitter"
                        checked={filters.needs_twitter}
                        onChange={handleFilterChange}
                    /></label>
  
                </div>
                {results.length !== zaddrs.length ? <p className="results-count">{results.length} results</p> : null}
                {results.map(item => 
                    item.zaddr 
                        ? <ZaddrCard key={item.id} user={item} copied={copied} setCopied={setCopied} /> 
                        : null
                )}
                <p>This humble directory contains {zaddrs.filter(item => item.zaddr ).length} 🦓 people! Help us grow!</p>
                {/* <FilterBar results={results} setResults={setResults} /> */}
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