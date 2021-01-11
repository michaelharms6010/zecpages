import React from 'react';
import DrawingBoard from 'react-drawing-board';
// import $ from 'jquery';
import './Drawing.scss'

function initialize() {
    // const idsToHide = ["Select", "Text T", "Image", "Eraser", "Clear", "100%"]
    // const labels = $('.drawing-board-toolbar-container .drawing-board-toolbar-icon label')
    // const labelText = []
    // for ( let i = 0 ; i < labels.length ; i ++) {
    //     console.log(labels[i])
    //     if (idsToHide.includes(labels[i].textContent)) {
    //         labels[i].parentElement.style.display = "none"
    //     }
    // }
    // console.log(labels)

    
}

export default function Drawing() {
    const [operations, setOperations] = React.useState([])

    React.useEffect( _ => {
        initialize()
    }, [])
    return (
        <DrawingBoard 
        onChange={(newoperation, afteroperation) => console.log(newoperation)}
        operations={operations} />
    )
}