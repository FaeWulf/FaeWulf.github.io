const size = 30;
const stage = document.querySelector(".bg .rotate");

const setting = document.querySelector("#Setting")
let enabled = true

setting.addEventListener('click', () => {
    let animated = document.getElementById("setting_anibackground")
    let blur = document.getElementById("setting_blurbackground")

    enabled = animated.checked

    if(blur.checked)
        document.querySelector(".bg").classList.add("blur")
    else
        document.querySelector(".bg").classList.remove("blur")
})

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

setInterval(() => {
    if(stage.childNodes.length <= size && enabled)
	    makeNeon();

    if(randInt(0,5) == 2) {
        var num = Math.floor(Math.random() * (stage.childNodes.length - 1)) + 1
        var node = stage.childNodes[num]
        node.style.opacity = "0"
        setTimeout(() => {
           node.remove()
        }, 1100); 
    }
}, 100)


function makeNeon() {
	let span = document.createElement("span");
	span.classList.add("s" + randInt(1,4));
    span.style.height = `${randInt(25,550)}px`
    span.style.width = `${randInt(1,12)}px`
    span.style.top = `${randInt(0,window.innerHeight * 0.5)}px`
    span.style.left = `${randInt(0,window.innerWidth)}px`
    span.style.opacity = "0"

    span.style.animation = `move ${randInt(7,20)}s linear infinite`


    setTimeout(() => {
        span.style.opacity = "1.0"
    }, randInt(1,20) * 100);
	stage.appendChild(span);
}