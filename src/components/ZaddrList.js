import React, {useState, useEffect, useContext} from "react";
import {ZaddrContext} from "../contexts/ZaddrContext"
import ZaddrCard from "./ZaddrCard";
import logo from "../zcash-icon.png"
import {copyTextToClipboard } from "../utils/copy";
import axios from "axios"
import zcashLogo from "../zcash-icon.png"
import zcashLogoDark from "../zcash-icon-dark.png"
import {UserContext} from "../contexts/UserContext"


export default function ZaddrList (props) {
    const { copied, setCopied, loaded, setLoaded} = useContext(ZaddrContext);    
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [zaddrs, setZaddrs] = useState([])
    const [userCount, setUserCount] = useState(0)
    const [searching, setSearching] = useState(false)
    const {darkMode} = useContext(UserContext)
    const [loadingSearch, setLoadingSearch] = useState(false)
    const [filters, setFilters] = useState({
        needs_twitter: false,
        needs_proof: false,
        needs_website: false,
        needs_email: false,
    })

    const fetchZaddrs = page => {
        axios.get(`https://be.zecpages.com/users/page/${page}`)
        .then(res => {
            setZaddrs(res.data.users.filter(zaddr=> zaddr.zaddr).sort( (a, b) => b.id-a.id))
            setUserCount(+res.data.count)
        })
        .catch(err => console.error(err));
    }


    useEffect( _ => {
        
        if (!searching) {
        fetchZaddrs(1)
        }
        
    },[searching])

    useEffect( _ => {
        
        fetchZaddrs(page)
    },[page])



    const handleCopyAll = _ => {
        copyTextToClipboard(zaddrs.filter(item => item.zaddr).reduce((acc, val) => acc + val.zaddr + ",\n", ""))
    }

    const doSearch = (e, params) => {
        e.preventDefault()
        if (params.search === "") {
            fetchZaddrs(1)
            setSearching(false)
            return
        } if (params.search === "*") {
            params.search = ""
        }
        console.log(params)
        setLoadingSearch(true)
        
        axios.post("https://be.zecpages.com/users/search", params)
        .then(r => {
            setSearching(true)
            setLoadingSearch(false)
            setZaddrs(r.data.filter(zaddr=> zaddr.zaddr).sort( (a,b) =>  b.id-a.id))
        })
        .catch(err => console.log(err))
    }

    const handleFilterChange = e => {
        setFilters({...filters, [e.target.name]: e.target.checked})
    }

    return(
        <div className="zaddr-list">
            {/* <p className="dev-disclaimer">ZECpages runs a lightwalletd node. Connect your light wallet to https://lightwalletd.zecpages.com:443</p> */}
            <h2 className="main-header">Zcash Z-address Directory</h2>
            {/* <div className="top-buttons">
                <a className="export-button" href="https://be.zecpages.com/users" target="_new"><button>Export All User Zaddr Data</button></a>
                
            </div> */}
            {searching || zaddrs.length > 0
            ? 
            <> 
            <div className="zaddr-list-top-tools">
                <div className="form-container">
                <label style={{display: "none", marginRight: '5px'}}>Search:</label>
                <form onSubmit={e => doSearch(e, {search, require_proof: filters.needs_proof, require_twitter: filters.needs_twitter})} className="search-form">
                    <input
                    className="search-input"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="* = all"
                    />
                    <button className="search-button" type="submit">Search</button> 
                </form>
                <div className="filter-checkboxes">
                    <span className="filter-label">Require:  {"  "}</span>
                    <label>Proof
                        <input 
                            type="checkbox" 
                            name="needs_proof"
                            checked={filters.needs_proof}
                            onChange={handleFilterChange}
                        /></label>
                    <label>Twitter
                    <input 
                        type="checkbox" 
                        name="needs_twitter"
                        checked={filters.needs_twitter}
                        onChange={handleFilterChange}
                    /></label>
                </div>  
                </div>
                <div className="search-controls">
                    
                    {searching ? 
                    <div className="search-results-buttons">
                    <button className="copy-all-button" onClick={handleCopyAll}><span style={{position: "relative", bottom: "2px", fontSize: "16px"}}>Copy</span></button>
                    <p className="results-count">{zaddrs.length} results<br/> <span className="cancel-search-x" onClick={_=> setSearching(false)}>Clear Search</span></p> 
                    </div>
                    : loadingSearch  ? <span>Searching...</span> 
                    : null }
                    
                    {searching 
                        ? null 
                        : <div className="zaddr-page-buttons">
                            
                            <button disabled={page !== 1 ? "" : "disabled"} onClick={_ => setPage(page -1) }className="zaddr-previous">Previous</button> 
                            <button className="page-number" disabled="disabled">{page} </button>
                            <button disabled={page * 25 < userCount ? "" : "disabled"} onClick={_ => setPage(page +1 )} className="zaddr-next">Next</button>      
                    </div>}
                </div>
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
                {darkMode ? <img id="spinner" alt="spinning zcash logo" src={zcashLogoDark} /> : <img id="spinner" alt="spinning zcash logo" src={zcashLogo} />}
                
            </>
        }    
        </div>
     )
}