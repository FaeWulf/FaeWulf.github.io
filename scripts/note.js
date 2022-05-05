var NoteWindow = document.querySelector(".terminal-window#Note")
const NoteItemBar = document.querySelector("#Item_Note")
let NotegreenButton = NoteWindow.firstElementChild.childNodes[1];

NotegreenButton.onclick = () => {
    NoteWindow.classList.toggle("minimize")
    NoteItemBar.classList.toggle("glow")
}