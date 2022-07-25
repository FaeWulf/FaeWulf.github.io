let display = []
let buffer = []
// 69x23
// x = 69
// y = 23
const maxX = 70
const maxY = 24


$(".tiling_window#Console>pre").each(function (i, obj) {
    display.push($(this))
})

display.forEach(E => {
    let axisX = ("                                                                      ")
    let row = []
    E.text("                                                                      ")

    for (var i = 0; i <= axisX.length; i++) {
        row.push({
            "char": axisX.charAt(i),
            "color": "Text"
        })
    }

    buffer.push(row)
})

function render() {

    for (var i = 0; i < buffer.length; i++) {
        let innerHTML = ""
        let victim = buffer[i]
        for (var j = 0; j < victim.length; j++) {
            innerHTML += `<span class="theme_text_${victim[j].color}">${victim[j].char}</span>`
        }
        display[i].html(innerHTML)
    }

}

function setAt(x, y, char = " ", color = "Text") {
    if (x > maxX || x < 0 || y > maxY || y < 0)
        return

    buffer[23 - y][x] = {
        "char": char,
        "color": color
    }
}

//0 -> 69
//0 -> 23

/*
for(var i = 0; i < maxY; i++) {
    for(var j = 0; j < maxX; k++) {
        setAt(i,j,"-", "Red")
        render()
    }        
}
*/






