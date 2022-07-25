let c_maxX = 0, c_maxY = 0
let konvas = $(".tiling_window>canvas#Konsole")[0]
let ctx = konvas.getContext("2d")
const font_size = 15
const offsetY = 0
const offsetX = 0.2

$(".tiling_window>canvas#Konsole").ready(function () {

    konvas.width = konvas.clientWidth
    konvas.height = konvas.clientHeight

    c_maxX = Math.floor(konvas.width / (font_size * 0.75)) - 2
    c_maxY = Math.floor(konvas.height / (font_size * 1.2)) - 1

    //console.log(konvas.clientWidth + "x" + konvas.clientHeight)
    //console.log(c_maxX + "x" + c_maxY)


    let x = 0,
        y = 0

    function step(F) {

        if ($(".tiling_window>canvas#Konsole").hasClass("active")) {
            if (x == 1) x = 0
            if (y == 1) y = 0

            k_clearScreen()
            donutRender(x, y)
            x += 0.02
            y += 0.01

        }
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);


})

$(window).on('resize', function () {
    let konvas = $(".tiling_window>canvas#Konsole")[0]
    konvas.width = konvas.clientWidth
    konvas.height = konvas.clientHeight

    c_maxX = Math.floor(konvas.width / (font_size * 0.75)) - 2
    c_maxY = Math.floor(konvas.height / (font_size * 1.2)) - 1
});

function k_clearScreen() {
    ctx.clearRect(0, 0, konvas.width, konvas.height);
    /*
    for (let x = 0; x <= c_maxX; x++) {
        for (let y = 0; y <= c_maxY; y++) {
            ctx.clearRect(x * 15, (y + 0.1) * 15, font_size, font_size)
        }
    }
    */
}

function k_clearAt(x, y) {
    ctx.clearRect(x * font_size * 0.75 + 7, y * font_size * 1.2, font_size + 1, font_size + 5)
}

function k_setFont() {
    ctx.font = `${font_size}px bold Courier New`
}

function k_testScreen(char = "_", bg = false, clear = false) {

    let x = 0, y = 0

    let run = setInterval(() => {
        if (bg) {
            ctx.fillStyle = "red";
            ctx.fillRect(x * font_size * 0.75 + 8, y * font_size * 1.2, font_size, font_size);
        }

        k_setFont()
        ctx.fillStyle = 'white';
        ctx.fillText(char, x * font_size * 0.75 + 8, (y + offsetY) * font_size * 1.2 + 13);

        x++
        if (x > c_maxX) {
            x = 0
            y++
        }

        if (y > c_maxY) {
            clearInterval(run)

            x = 0, y = 0

            if (clear) {
                let run = setInterval(() => {
                    k_clearAt(x, y)
                    console.log(x + ":" + y)

                    x++
                    if (x > c_maxX) {
                        x = 0
                        y++
                    }
                    if (y > c_maxY)
                        clearInterval(run)
                }, 10)
            }

        }

    }, 10);

    //ctx.beginPath();
    //ctx.strokeStyle = 'red';
    //ctx.rect(x * 15, (y + offsetY) * 15, font_size, font_size);
    //ctx.stroke();

}

function k_drawAt(x, y, char, color = "white") {

    if (x < 0 || x > c_maxX || y < 0 || y > c_maxY)
        return console.log("[Error] Konsole: cannot draw " + char + "at (" + x + ";" + y + ")")

    //y = maxY - 1 - y

    if (char.length == 1) {
        //ctx.clearRect(x * font_size, (y + offsetY) * font_size, font_size, font_size);
        k_clearAt(x, y)

        k_setFont()
        ctx.fillStyle = color;
        ctx.fillText(char, x * font_size * 0.75 + 8, (y + offsetY) * font_size * 1.2 + 13);
        ctx.fillStyle = 'white';
    }
    else {
        for (let index = 0; index < char.length; index++) {
            k_clearAt(x, y)

            k_setFont()
            ctx.fillStyle = color;
            ctx.fillText(char[index], (x + index) * font_size * 0.75 + 8, (y + offsetY) * font_size * 1.2 + 13);
            ctx.fillStyle = 'white'
        }
    }
}
