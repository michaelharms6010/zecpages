const flagClickedIcon = e => {
    document.querySelector(".copy-icon.icon").classList.add('clicked')
}

const flagUnClickedIcon = e => {
    document.querySelector(".copy-icon.icon").classList.remove('clicked')
}
const showCopyTooltip = (value) => {

    const copyIcon = value ? document.querySelector(`.${value}-tooltip`) : document.querySelector(".copied-tooltip")
    

    copyIcon.classList.add('visible')
    setTimeout(_ => copyIcon.classList.remove('visible'), 1000)
}

module.exports = {
    flagClickedIcon,
    flagUnClickedIcon,
    showCopyTooltip
}