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

module.exports = {
    flagClickedIcon,
    flagUnClickedIcon,
    showCopyTooltip
}