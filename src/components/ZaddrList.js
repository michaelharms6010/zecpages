import React, {useState, useEffect, useContext} from "react";
import {ZaddrContext} from "../contexts/ZaddrContext"
import ZaddrCard from "./ZaddrCard";
import logo from "../zcash-icon.png"
import {copyTextToClipboard } from "../utils/copy";
import axios from "axios"

export default function ZaddrList (props) {
    const { copied, setCopied, loaded, setLoaded} = useContext(ZaddrContext);    
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [zaddrs, setZaddrs] = useState([])
    const [userCount, setUserCount] = useState(0)
    const [filters, setFilters] = useState({
        needs_twitter: false,
        needs_proof: false,
        needs_website: false,
        needs_email: false,
    })

    const fetchZaddrs = page => {
        axios.get(`https://be.zecpages.com/users/page/${page}`)
        .then(res => {
            setZaddrs(res.data.users.sort( (a, b) => b.id-a.id))
            setUserCount(+res.data.count)
        })
        .catch(err => console.error(err));
    }

    useEffect( _ => {
        
        fetchZaddrs(1)
    },[])

    useEffect( _ => {
        
        fetchZaddrs(page)
    },[page])

    useEffect( _ => {
        
    }, [zaddrs])

    useEffect( _ => {      
        // if (search) {
        //     setResults(zaddrs.filter(item => 
        //         {
        //             let searchable = String(item.zaddr + item.twitter + item.username + item.description).split("null").join("").toLowerCase()
        //             return searchable.includes(search.toLowerCase())
        //         }
        //     ))
        // } else {
        //     setResults(applyFilters(zaddrs))
        // }

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
            {/* <p className="dev-disclaimer">Zecpages is now running a lightwalletd node! Connect your light wallet to https://lightwalletd.zecpages.com:443 <br/> Or via cli with <code> ./zecwallet-cli.exe --server https://lightwalletd.zecpages.com:443</code></p> */}
            <h2 className="main-header">Zcash Z-address Directory</h2>
            <div className="top-buttons">
                <a className="export-button" href="https://be.zecpages.com/users" target="_new"><button>Export All User Zaddr Data</button></a>
                <button className="export-button" onClick={handleCopyAll}>Copy all filtered zaddrs to clipboard (comma-separated)</button>
            </div>
            {loaded && zaddrs.length > 0
            ? 
            <>
                <label>Search:</label>
                <form className="search-form">
                <input
                className="search-input"
                value={search}
                onChange={e => setSearch(e.target.value)}
                />
                <button type="submit">Search</button>
                    </form>
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
                {results.length ? <p className="results-count">{results.length} results</p> : null}
            <div className="zaddr-page-buttons">
                <button disabled={page !== 1 ? "" : "disabled"} onClick={_ => setPage(page -1) }className="zaddr-previous">Previous</button> 
                <button className="page-number" disabled="disabled">{page} </button>
                <button disabled={page * 25 < userCount ? "" : "disabled"} onClick={_ => setPage(page +1 )} className="zaddr-next">Next</button>      
            </div>
                {zaddrs.map(item => 
                    item.zaddr 
                        ? <ZaddrCard key={item.id} user={item} copied={copied} setCopied={setCopied} /> 
                        : null
                )}
                <p>This humble directory contains {userCount} 🦓 people! Help us grow!</p>
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