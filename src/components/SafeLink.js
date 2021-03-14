import React from "react";

export default function SafeLink({href, text}) {
    return (
        <a target="_blank" rel="noopener noreferrer" href={href} >{text || href}</a>
    )
}