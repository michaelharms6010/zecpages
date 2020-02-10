import React from "react";


export default function ZaddrCard ({user}) {

    return(
        <div className="zaddr-card">
            <h2>{user.username}</h2>
            <p>{user.zaddr}</p>
            {user.proofposturl ? <a href={user.proofposturl}>Proof</a> : null}
            {user.website ? <a href={user.website}>Website</a> : null}
            {user.twitter ? <a href={`https://twitter.com/${user.twitter}`}>Twitter: {user.twitter}</a> : null}
            {user.email ? <span>{user.email}</span> : null}

        </div>
    )

}