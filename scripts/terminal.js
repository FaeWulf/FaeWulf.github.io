let root = `<span class="theme_text_Teal">Faewulf</span>@<span class="theme_text_Green">openGiaLam</span> <span class="theme_text_Blue">~</span>$<span class="theme_text_Red">></span> `
let memmory = []
let memmoryIndex = -1
let cursor = `<span class="typed-cursor">_</span>`

//for clearing last bonsai interval
let growLoop

let cmds = [
    {
        "name": "help",
        "description": "Show commands list",
    },
    {
        "name": "reboot",
        "description": "Restart OS",
    },
    {
        "name": "neofetch",
        "description": "a command-line system information tool",
        "output": `
<div>&nbsp;</div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;██████╗&nbsp;&nbsp;&nbsp;██╗&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="theme_text_Teal">Faewulf</span>@<span class="theme_text_Green">OpenGiaLam</span></div>
<div>&nbsp;██╔════╝&nbsp;&nbsp;&nbsp;██║&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- - - - - - - - - - - - - - - - - - -</div></div>
<div>&nbsp;██║&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;███╗██║&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="theme_text_Green b1">Datetime:</span> ${new Date().toLocaleTimeString()}</div>
<div>&nbsp;██║&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;██║██║&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="theme_text_Green b1">OS:</span> HTML x JavaScript</div>
<div>&nbsp;╚██████╔╝███████╗&nbsp;<span class="theme_text_Green b1">Kernel:</span>  v2.01</div>
<div>&nbsp;</div>
        `
    },
    {
        "name": "sysfetch",
        "description": "My current pc spec",
        "output": `
<div>&nbsp;</div>
<pre><span class="theme_text_Teal">System</span> <> <span class="theme_text_Green">Fetcher</span></pre>
<pre><span class="theme_text_Teal b1">-------------</span></pre>
<pre><span class="theme_text_Teal b1">Host: </span>LENOVO 82AU</pre>
<pre><span class="theme_text_Teal b1">Kernel: </span>10.0.22000.0</pre>
<pre><span class="theme_text_Teal b1">Motherboard: </span>LENOVO LNVNB161216</pre>
<pre><span class="theme_text_Teal b1">Resolution: </span>1920x1080</pre>
<pre><span class="theme_text_Teal b1">CPU: </span>Intel i7-10750H 2.60GHz</pre>
<pre><span class="theme_text_Teal b1">GPU: </span>NVIDIA GeForce GTX 1650</pre>
<pre><span class="theme_text_Teal b1">Memory: </span>16 GiB</pre>
<div>&nbsp;</div>
        `
    },
    {
        "name": "contact",
        "description": "My ultimate contact",
        "output": `
<div>&nbsp;</div>
<div>&nbsp;Behold: </div>
<pre>                 ${website}</pre>
<pre>                   ^</pre>
<pre>                   |</pre>
<pre>              +----+----+</pre>
<pre>              |         |</pre>
<pre>      contact@faewulf.xyz</pre>
<pre>      |          |      |</pre>
<pre>      +---+------+------+</pre>
<pre>          |      |</pre>
<pre>          v      | +---------+</pre>
<pre>        ${email}    +>|${github}   |</pre>
<pre>                   |${discord}  |</pre>
<pre>                   |${steam}    |</pre>
<pre>                   |${minecraft}|</pre>
<pre>                   |${youtube}  |</pre>
<pre>                   +---------+</pre>
<div>&nbsp;</div>
<pre>Extra</pre>
<pre>&nbsp;&nbsp;&nbsp;<span class="theme_text_Green b1">Facebook:</span> <a class="tlink" href=\"https://www.facebook.com/ForestOfCorn/\" target='_blank'>ForestOfCorn</a></pre>
<pre>&nbsp;</pre>
        `
    },

    {
        "name": "lmao",
        "description": "bad joke warning",
        "output": `<div>F*ckHCH</div>`
    },
    {
        "name": "git",
        "description": "Github status",
        "output": `
        <div>&nbsp;</div>
        <img align="center" src="https://github-readme-stats.vercel.app/api?username=faewulf&show_icons=true&theme=dracula&locale=en" alt="faewulf" />
        <div>&nbsp;</div>
        `
    },
    {
        "name": "bonsai",
        "description": "ported cbonsai, use bonsai -h",
    },
    {
        "name": "donut",
        "description": "Spawn donut.c",
    },
]

//lookup command to trigger
function trigger() {
    if (input.length !== 0) {
        const args = input.toLowerCase().trim().split(' ');
        let cmd = null;
        if (args.length > 1) {
            cmd = args[0];
        } else {
            cmd = args.shift()?.toString();
        }

        succeed = false

        if (cmd == "reboot") {
            location.reload();
            succeed = true;
        }

        if (cmd == "bonsai") {

            //disable donut an clear Konvas screen
            k_clearScreen()
            $(".tiling_window>canvas#Konsole").removeClass("active")


            let vars = input.toLowerCase().trim().split(' ').slice(1)
            let stop = false
            let infGrow = false

            for (let i = 0; i < vars.length; i++) {
                switch (vars[i]) {
                    case "-h":
                        stop = true
                        printLine(`<pre>

 Argument list:
                        </pre>`)
                        printLine(`<pre>  -<span class="theme_text_Green">l value :</span> live mode (default value: 30)</pre>`, false)
                        printLine(`<pre>  -<span class="theme_text_Green">s value :</span> set seed, pass "random" for randomness</pre>`, false)
                        printLine(`<pre>  -<span class="theme_text_Green">i :</span> grow other bonsai when finished</pre>`, false)
                        printLine(`<pre> </pre>`, false)
                        break;

                    case "-l":
                        if (!isNaN(vars[i + 1])) {
                            getConfig().timeStep = parseInt(vars[i + 1])
                            i++
                        }
                        else
                            getConfig().timeStep = 30

                        break;
                    case "-s":
                        getConfig().seed = vars[i + 1] ? vars[i + 1] : NaN
                        break;
                    case "-i":
                        infGrow = true
                        break;
                }

                if (stop)
                    break
            }


            if (!stop) {
                clearInterval(growLoop)
                b_stop()

                growLoop = setInterval(() => {

                    if (!infGrow)
                        clearInterval(growLoop)


                    if (ready2Grow) {
                        clearScreen()
                        ready2Grow = false
                        growTree()
                    }

                }, 2000)
                printLine(`<pre> Growing...</pre>`)
                if (vars.length == 0)
                    printLine(`<pre> Using default settings... 
 bonsai -h for help.</pre>`, false)
            }

            succeed = true
        }

        if (cmd == "donut") {

            clearInterval(growLoop)
            b_stop()

            //konsole clear screen
            clearScreen()

            $(".tiling_window>canvas#Konsole").addClass("active")

            printLine(` 
            <div>&nbsp;</div>
            <div> Donuting...</div>
            `)

            succeed = true
        }

        if (cmd == "help" || cmd == "?") {

            printLine(` 
            <div>&nbsp;</div>
            <div>Commands list:</div>
            `)

            cmds.forEach(e => {
                printLine(`<pre>  - <span class="theme_text_Green">${e.name}</span>   ${e.description}</pre>`, false)
            })
            printLine(` <div>&nbsp;</div>`, false)
            succeed = true;
        }

        if (!succeed)
            cmds.forEach(e => {
                if (e.name == cmd) {
                    printLine(e.output)
                    succeed = true
                }
            })

        if (!succeed)
            printLine(`<div> zsh: command not found: ${cmd}</div>`);

        //prevent duplicate entered cmds
        if (memmory[memmory.length - 1] != input)
            memmory.push(String(input))

        memmoryIndex = memmory.length
        input = ""
    }
}

document.addEventListener("keydown", function (e) {
    e || window.event;
    const key = e.key;

    if ($(".nav-item.active").attr("id") != "home")
        return

    if (!ready)
        return

    if (e.ctrlKey || e.metaKey || e.altKey)
        return;

    if (String(key).length == 1) {
        input += key
        bufferer()
    }
    else
        switch (key) {
            case "Enter":
                trigger()
                break;
            case "Backspace":
                if (input.length <= 0)
                    return;
                input = input.slice(0, -1);
                bufferer()
                break;
            case "ArrowUp":
                checker = memmoryIndex - 1
                if (memmory.length === 0 || checker < 0)
                    return;

                memmoryIndex--
                input = memmory[memmoryIndex]
                bufferer()
                break;
            case "ArrowDown":
                checker = memmoryIndex + 1
                if (memmory.length === 0 || checker > memmory.length)
                    return;
                memmoryIndex++
                memmoryIndex == memmory.length ? input = "" : input = memmory[memmoryIndex]
                bufferer()
                break;
        }
    e.preventDefault();
}, false);

function bufferer(adding = "") {
    input += adding
    $(".currentLine").html(root + input + cursor);
}

function printLine(str, keepInput = true) {
    let output = $(".terminal")
    $(".currentLine").remove()
    $(".quickcmd").remove()
    if (keepInput)
        output.append(`<div>${root} ${input}</div>`)
    output.append(str)
    output.append(`<div class="currentLine">${root}${cursor}</div>`)

    let list = []
    cmds.forEach(e => list.push(`<span class="clickbox theme_Crust theme_text_Lavender">${e.name}</span>`))

    output.append(`
    <div class="quickcmd" style="">${list.join(" ")}</div> `)

    $(".clickbox").each(function (i, obj) {
        $(this).click(function () {
            input = $(this).text()
            trigger()
        })
    })
    //scroll to bottom

    $("#Terminal").animate({ scrollTop: $(".terminal").prop("scrollHeight") }, 300);
}

$("#Terminal").click(function () {
    ready = true
})


//init
$(document).ready(function () {
    bufferer();
    let strings = ["neofetch", "contact"]
    let time = 1000

    strings.forEach(string => {
        while (string.length > 0) {

            time += Math.floor(Math.random() * (200 - 100)) + 100

            let thisLoop = string[0]
            setTimeout(() => {
                bufferer(thisLoop)
            }, time);
            string = string.substring(1)
        }

        time += 500
        setTimeout(() => {
            trigger()
        }, time)

        time += 500
    })

    string = "help"
    while (string.length > 0) {

        time += Math.floor(Math.random() * (200 - 100)) + 100

        let thisLoop = string[0]
        setTimeout(() => {
            bufferer(thisLoop)
        }, time);
        string = string.substring(1)
    }

    setTimeout(() => {
        ready = true
        ready = false
    }, time);

})