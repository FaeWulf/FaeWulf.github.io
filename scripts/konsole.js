let maxX = 0, maxY = 0
let ready2Grow = true

function checkOverflow(el) {
    var curOverflow = el.style.overflow;

    if (!curOverflow || curOverflow === "visible")
        el.style.overflow = "hidden";

    var isOverflowing = el.clientWidth < el.scrollWidth
        || el.clientHeight < el.scrollHeight;

    el.style.overflow = curOverflow;
    return isOverflowing;
}

function clearScreen() {
    for (var i = 0; i < maxY; i++)
        for (var j = 0; j < maxX; j++) {
            let pixel = $(`#Konsole_${j}_${i}`)
            pixel.removeClass()
            pixel.text(" ")
        }
}

function getAt(x, y) {
    let el = $(`#Konsole_${x}_${y}`)
    if (el)
        return el.text()

    return ""
}

function drawAt(x, y, char, color) {

    if (x < 0 || x >= maxX || y < 0 || y >= maxY)
        return console.log("[Error] Konsole: cannot draw " + char + "at (" + x + ";" + y + ")")

    //y = maxY - 1 - y

    if (char.length == 1) {
        let el = $(`#Konsole_${x}_${y}`)
        el.text(char)
        el.removeClass()
        el.addClass(`theme_text_${color}`)
    }
    else {
        for (let index = 0; index < char.length; index++) {

            let el = $(`#Konsole_${x + index}_${y}`)

            if (!el)
                continue

            el.text(char[index])
            el.removeClass()
            el.addClass(`theme_text_${color}`)
        }
    }
}

$(".tiling_window#Console").ready(function () {
    let Konsole = $(".tiling_window#Console")

    //get konsole max size
    while (!checkOverflow(Konsole[0])) {
        if(isPhone() || maxY > 100) {
            maxY = 26
            break
        }   

        Konsole.append("<pre>-</pre>")
        maxY++
    }
    maxY--

    $(".tiling_window#Console>pre").remove()
    let dummy = ""

    Konsole.append(`<pre id="flowTest">${dummy}</pre>`)
    while (!checkOverflow(Konsole[0])) {

        if(isPhone() || maxX > 100) {
            maxX = 56
            break
        }

        dummy += "-"
        $("#flowTest").text(dummy)
        maxX++
    }
    maxX--
    $(".tiling_window#Console>pre").remove()

    for (let y = 0; y < maxY; y++) {
        let dummyEl = ""
        for (let x = 0; x < maxX; x++) {
            dummyEl += `<span class="theme_text_Red" id="Konsole_${x}_${y}"> </span>`
        }
        Konsole.append(`<pre>${dummyEl}</pre>`)
    }
    //ready

    //bonsai

    clearScreen()
    growTree()

    /*
    let x = 0, y = 0
    let checkScreen = setInterval(() => {
        if (x == maxX) {
            y++
            x = 0
        }
        if (y == maxY) {
            clearInterval(checkScreen)
            return
        }
        drawAt(x, y, "-", "Red")
        x++
    }, 1)
    */
})