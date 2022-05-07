Array.from(document.getElementsByClassName("terminal-window")).forEach(e => {
    e.addEventListener('pointerdown', () => {
        Array.from(document.getElementsByClassName("terminal-window")).forEach(te => {
            te.classList.remove("activated")
            te.style.zIndex = "1"
        })
        e.classList.add("activated")
        e.style.zIndex = "10"
    })

    dragElement(e)
    console.log(e.children)
})

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    var titlebar = elmnt.firstElementChild;
    var resizeBarH = elmnt.children[1]
    var resizeBarW = elmnt.children[2]
    var resizeBarWH = elmnt.children[3]
    if (titlebar) {
        titlebar.onpointerdown = dragMouseDown;
        resizeBarH.onpointerdown =  dragMouseDownResizeH; 
        resizeBarW.onpointerdown = dragMouseDownResizeW;
        resizeBarWH.onpointerdown = dragMouseDownResizeWH;
    }

    function dragMouseDownResizeWH(e) {
        e = e || window.event;
        //disable becasue need to highlight texts
        // e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onpointerup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onpointermove = (e) => {
            e = e || window.event;
            e.preventDefault();

            var rect = elmnt.getBoundingClientRect();

            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:

            var sizeX = (rect.width - pos1)
            var sizeY = (rect.height - pos2)

            if ((sizeY + rect.y < window.innerHeight) && (sizeX + rect.x < window.innerWidth)) {
                elmnt.style.width = sizeX + "px"
                elmnt.style.height = sizeY + "px"
            }
        };
    }

    function dragMouseDownResizeH(e) {
        e = e || window.event;
        //disable becasue need to highlight texts
        // e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onpointerup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onpointermove = (e) => {
            e = e || window.event;
            e.preventDefault();

            var rect = elmnt.getBoundingClientRect();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:

            var sizeX = (rect.width - pos1)
            var sizeY = (rect.height - pos2)

            if ((sizeY + rect.y < window.innerHeight) && (sizeX + rect.x < window.innerWidth)) {
                elmnt.style.height = sizeY + "px"
            }
        };
    }

    function dragMouseDownResizeW(e) {
        e = e || window.event;
        //disable becasue need to highlight texts
        // e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onpointerup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onpointermove = (e) => {
            e = e || window.event;
            e.preventDefault();

            var rect = elmnt.getBoundingClientRect();

            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:

            var sizeX = (rect.width - pos1)
            var sizeY = (rect.height - pos2)

            if ((sizeY + rect.y < window.innerHeight) && (sizeX + rect.x < window.innerWidth)) {
                elmnt.style.width = sizeX + "px"
            }
        };
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onpointerup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onpointermove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        var rect = elmnt.getBoundingClientRect();
        //console.log(`element ${rect.x} ${rect.y} | windows ${window.innerHeight} ${window.innerWidth}`)
        //console.log(rect)

        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:

        var posX = (elmnt.offsetLeft - pos1)
        var posY = (elmnt.offsetTop - pos2)

        if ((posX >= 0 && posY >= 35) && (posY + rect.height < window.innerHeight) && (posX + rect.width < window.innerWidth)) {
            elmnt.style.top = posY + "px"
            elmnt.style.left = posX + "px"
        }
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onpointerup = null;
        document.onpointermove = null;
    }
}