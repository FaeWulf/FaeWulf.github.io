console.log($(window).height() + " x " + $(window).width())
console.log("mobile? " + isPhone())

function update() {
    $(".main_window, section.visual").css({
        "width": "80%",
        "height": "80%",
        "min-width": "500px",
        "max-width": "800px"
    });

    $(".main_window, section.visual").css({
        "top": ($(window).height() / 2 - $(".main_window").height() / 2) + "px",
        "left": ($(window).width() / 2 - $(".main_window").width() / 2) + "px",
        "width": "80%",
    });


    if (_isPhone) {
        $(".main_window, section.visual").css({
            "width": "90%",
            "height": "90%",
            "min-width": "250px",
            "max-width": "500px"
        });

        $(".main_window, section.visual").css({
            "top": ($(window).height() / 2 - $(".main_window").height() / 2) + "px",
            "left": ($(window).width() / 2 - $(".main_window").width() / 2) + "px",
        });
    }

}

function projectPageInit() {
    projects.forEach(E => {
        let div = "<div>"

        if(E.name)
            div += `<div class="b1">${E.name}</div>`

        if(E.des)
            div += `<div>${E.des}</div>`

        if(E.link)
            div += `<a class="tlink source" href="${E.link}" target="_blank">
    <i class="fas fa-external-link-alt" ></i>
</a>`
       
        if(E.pic)
            div += `<img src="${E.pic}" "></img>`

        div += "</div>"

        $("div#project>div.holder").append(div)
    })
}

const _isPhone = isPhone()

$(document).ready(function () {
    //setTimeout(function () { body_resize() });
    update()

    if (window.location.hash == "#projects") {
        $("#project").show()
        $("section.terminal, a.toProjectButton").hide()
    }

    if (window.location.hash == "") {
        $("#project").hide()
        $("section.terminal, a.toProjectButton").show()
        console.log("ad")
    }

    projectPageInit()
});

window.onhashchange = () => {

    console.log(window.location.hash)

    if (window.location.hash == "#projects") {
        $("#project").show()
        $("section.terminal, a.toProjectButton").hide()
    }

    if (window.location.hash == "") {
        $("#project").hide()
        $("section.terminal, a.toProjectButton").show()
    }
}

$(window).on('resize', function () {
    update()
    //setTimeout(function () { body_resize() });
});