import React, {useEffect, useContext} from "react";
import {ZaddrContext} from "../contexts/ZaddrContext"
import ZaddrCard from "./ZaddrCard";
import axiosWithAuth from "../utils/AxiosWithAuth";


export default function ZaddrList (props) {
    const { zaddrs, setZaddrs } = useContext(ZaddrContext);

    useEffect(_ => {
        axiosWithAuth().get("https://zeitpages-staging.herokuapp.com/users")
          .then(res => setZaddrs(res.data.sort( (a, b) => a.id-b.id)))
          .catch(err => console.error(err));
      },[])

    return(
        <div className="zaddr-list">
            <h2>Zeitpages: A Public, Open-Source Zaddr Directory</h2>
            
            {zaddrs.length > 0 
            ? zaddrs.map(item => 
                item.zaddr 
                    ? <ZaddrCard key={item.id} user={item} /> 
                    : null
            )
            : <h3>A stylish loading animation</h3>
        }
            <p className="dev-disclaimer">This site is still under development! If you encounter issues while testing, please let me know on <a href="https://twitter.com/michaelharms70">Twitter</a> or <a href="https://github.com/michaelharms6010/fe-zeitpages">Github.</a></p>
        </div>
     )

}