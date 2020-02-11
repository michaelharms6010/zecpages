import React, {useEffect, useContext} from "react";
import {ZaddrContext} from "../contexts/ZaddrContext"
import ZaddrCard from "./ZaddrCard";
import axiosWithAuth from "../utils/AxiosWithAuth";


export default function ZaddrList (props) {
    const { zaddrs, setZaddrs } = useContext(ZaddrContext);

    useEffect(_ => {
        axiosWithAuth().get("https://zeitpages-staging.herokuapp.com/users")
          .then(res => setZaddrs(res.data))
          .catch(err => console.error(err));
      },[])

    return(
        <div className="zaddr-list">
            {zaddrs.map(item => 
                item.zaddr 
                    ? <ZaddrCard key={item.id} user={item} /> 
                    : null
            )}
        </div>
     )

}