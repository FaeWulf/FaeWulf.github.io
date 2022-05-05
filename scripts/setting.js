let settingWindow = document.querySelector(".terminal-window#Setting")
let settingGreenButton = settingWindow.firstElementChild.childNodes[1];
let settingIcon = document.querySelector("#navBarSetting")

settingIcon.onclick = () => {
    settingWindow.classList.toggle("minimize")
}

settingGreenButton.onclick = () => {
    settingWindow.classList.toggle("minimize")
}