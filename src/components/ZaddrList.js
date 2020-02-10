import React, {useContext} from "react";
import {ZaddrContext} from "../contexts/ZaddrContext"
import ZaddrCard from "./ZaddrCard"

export default function ZaddrList (props) {
    const {zaddrs, setZaddrs} = useContext(ZaddrContext);


    return(
        <div className="zaddr-list">
            {zaddrs.map(item => {
                item.zaddr 
                    ? <ZaddrCard user={item} /> 
                    : null
            })}
        </div>
     )

}