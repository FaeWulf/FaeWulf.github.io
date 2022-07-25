if (!isPhone()) {

    $("div#body-content>div#Projects>div.content_holder>div").mousemove(function (e) {
        let card = $(this)

        let cardHeight = card.height()
        let cardWidth = card.width()

        let heightCenter = Math.round(cardHeight / 2)
        let widthCenter = Math.round(cardWidth / 2)
        let rotateFactor = 5
        let rotX = (e.offsetY - heightCenter) / heightCenter * rotateFactor
        let rotY = (widthCenter - e.offsetX) / widthCenter * rotateFactor

        card.css({
            "transform": `scale(1.1) rotateX(${-rotX}deg) rotateY(${-rotY}deg)`,
            "transition": "none"
        })
    })

    $("div#body-content>div#Projects>div.content_holder>div").mouseout(function (e) {
        $(this).css({
            "transition": "transform 0.3s linear",
            "transform": ""
        })
    })
}

