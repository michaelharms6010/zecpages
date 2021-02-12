import React from "react";
import copyicon from "../icons/zecpagescopyicondaymode01.png"
import copyicondark from "../icons/bignightcopy.png"
import copyiconb from "../icons/copyiconb.png"
import {copyTextToClipboard} from "../utils/copy"
import {UserContext} from "../contexts/UserContext";
export default function CopyIcon({value}) {
    const {darkMode} = React.useContext(UserContext)
    const flagClickedIcon = e => {
        document.querySelector(".copy-icon.icon").classList.add('clicked')
    }
    
    const flagUnClickedIcon = e => {
        document.querySelector(".copy-icon.icon").classList.remove('clicked')
    }
    const showCopyTooltip = e => {
        document.querySelector(".copied-tooltip").classList.add('visible')
        setTimeout(_ => document.querySelector(".copied-tooltip").classList.remove('visible'), 1000)
    }

    const showCopyTooltipById = (id) => {
        document.querySelector(`.copied-tooltip-${id}`).classList.add('visible')
        setTimeout(_ => document.querySelector(`.copied-tooltip-${id}`).classList.remove('visible'), 1000)
    }

    return(
        <span className="copy-icon icon" onMouseDown={flagClickedIcon} onMouseLeave={flagUnClickedIcon} onMouseUp={flagUnClickedIcon} onClick={_ => {copyTextToClipboard(value); showCopyTooltip();}}><img alt="copy" title="Copy to Clipboard" src={darkMode ? copyicondark : copyicon}></img><span className='copied-tooltip'>Copied!</span></span>
    )
}