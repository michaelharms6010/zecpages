import React from 'react'

export default function BoardInfo() {
    const [showViewKey, setShowViewKey] = React.useState(false)
    const [fullNodeInstructions, setFullNodeInstructions] = React.useState(true)
    const viewKey = "zxviews1q0duytgcqqqqpqre26wkl45gvwwwd706xw608hucmvfalr759ejwf7qshjf5r9aa7323zulvz6plhttp5mltqcgs9t039cx2d09mgq05ts63n8u35hyv6h9nc9ctqqtue2u7cer2mqegunuulq2luhq3ywjcz35yyljewa4mgkgjzyfwh6fr6jd0dzd44ghk0nxdv2hnv4j5nxfwv24rwdmgllhe0p8568sgqt9ckt02v2kxf5ahtql6s0ltjpkckw8gtymxtxuu9gcr0swvz"
    const boardZaddr = "zs1j29m7zdhhyy2eqrz89l4zhk0angqjh368gqkj2vgdyqmeuultteny36n3qsm47zn8du5sw3ts7f"
    return(
        <div className="z-board">
            <div className='zaddr-card board-info'>
                <p style={{wordBreak: 'normal', textAlign: 'left'}}>
                The ZECpages board is powered by Zcash transactions made to the board's Zcash address. All transaction data is publicly available using the address's "viewing key," available below.
                
                Events on ZECpages (making a post, liking a post, subscribing to a user, publishing to users) are driven by transactions on the Zcash blockchain. 

                <br/><br/>tl;dr: Because its data source is a single address on the Zcash blockchain, ZECpages's data is globally available, private, and immutable.<br/><br/>
                ZECpages currently recommends using <a target="_blank" rel="noopener noreferrer" style={{padding: '0', margin: '0'}}  href="https://zecwallet.co">ZecWallet</a> for best experience on PC, Android, and iOS.
                </p>
            </div>
            {showViewKey && 
            <p className="view-key" style={{margin: "5px auto", width: "60%", wordBreak: "break-all"}}>
                {viewKey}
                <a className="view-key-link" style={{margin: "1%", display: "block", textDecoration: "underline"}} target="_blank" rel="noopener noreferrer" href="https://electriccoin.co/blog/explaining-viewing-keys/">
                    What's a viewing key?</a> 
                    <button onClick={_ => setFullNodeInstructions(!fullNodeInstructions)}>{fullNodeInstructions ? "See light wallet instructions" : "See full node instructions"}</button>
                {fullNodeInstructions 
                ? <>
                    <h2>How to duplicate/audit ZECpages (Full node):</h2>
                    <h4>1. Import ZECpages key:</h4>
                    <div className="code-snippet"><code>zcash-cli z_importviewingkey "{viewKey}" whenkeyisnew 419200</code></div>
                    <br/>
                    <h4>2. See raw post data:</h4>
                    <div className="code-snippet"><code>zcash-cli z_listreceivedbyaddress "{boardZaddr}"</code></div>
                  </>
                : <>
                    <h2>How to duplicate/audit ZECpages (light wallet):</h2>
                    <h4>1. Import ZECpages key:</h4>
                    <div className="code-snippet"><code>zecwallet-cli import {viewKey} 419200</code></div>
                    <br/>
                    <h4>2. See raw post data:</h4>
                    <div className="code-snippet"><code>zecwallet-cli list</code></div>
                  </>}
                
            </p>}
            <button style={{marginBottom: "18px"}} onClick={_ => setShowViewKey(!showViewKey)} >{showViewKey ? "Hide View Key" : "Show View Key"}</button><br/>

        </div>
    )
}