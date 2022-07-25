
setInterval(() => {

    let date = new Date()

    $("div.menu>pre.clock").text(date.getHours() + (date.getSeconds() % 2 == 0 ? ':' : ' ') + (date.getMinutes()<10?'0':'') + date.getMinutes())
}, 1000)


$("#OSbutton").click(function() {
    $(".menu_background").show()
    $(".menu").slideDown(500)
})

$(".menu_background").click(function() {
    $(this).hide()
    $(".menu").slideUp(500)
})

$("div.menu>div.widget>div.row>div.item#Darkmode").click(function() {
    let string = $("link#theme").attr("href")

    if(string.split("/").pop() == "catppuccin-macchiato.css")
        $("link#theme").attr("href", "/styles/themes/catppuccin-latte.css")
    else
        $("link#theme").attr("href", "/styles/themes/catppuccin-macchiato.css")
})


$("div.menu>div.widget>div.row>div.item").each(function(i, obj) {
    $(this).click(function() {
        $(this).toggleClass("active")
    })
})

setInterval(() => {
    $("progress.stats").each(function(i, obj){
        if(Math.floor(Math.random() * 3) == 2)
            $(this).attr("value", Math.floor(Math.random() * (90 - 30) ) + 30)
    })
}, 2000)