root = `<span style="color: #b2e5dd">Faewulf</span>@<span style="color: lightgreen">openGiaLam</span> <span style="color: dodgerblue">~</span>$<span style="color: #ff7a93">></span> `
input = ""
memmory = []
memmoryIndex = -1
cursor = `<span class="typed-cursor">_</span>`

cmds = [
    {
        "name": "neofetch",
        "description": "a command-line system information tool",
        "output": `
<div>&nbsp;</div>
<div>&nbsp;</div>
<div>_____/\\\\\\\\\\\\\\\\\\\\\\\\__/\\\\\\_____________&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="_cyan">Faewulf</span>@<span class="_green">OpenGiaLam</span></div>
<div>&nbsp;___/\\\\\\//////////__\\/\\\\\\_____________&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-------------</div>
<div>&nbsp;&nbsp;__/\\\\\\_____________\\/\\\\\\_____________&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="_gold">"Sofa, Run, away Crocodile,..."</span></div>
<div>&nbsp;&nbsp;&nbsp;_\\/\\\\\\____/\\\\\\\\\\\\\\_\\/\\\\\\_____________&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="_green b1">OS:</span> HTML, JavaScript, CSS </div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;_\\/\\\\\\___\\/////\\\\\\_\\/\\\\\\_____________&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="_green b1">Host:</span> Your Browser </div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_\\/\\\\\\_______\\/\\\\\\_\\/\\\\\\_____________&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="_green b1">Terminal:</span> Ferminal </div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_\\/\\\\\\_______\\/\\\\\\_\\/\\\\\\_____________&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="_green b1">Email:</span> ngolamaz3@gmail.com </div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_\\//\\\\\\\\\\\\\\\\\\\\\\\\/__\\/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\_&nbsp;&nbsp;&nbsp;&nbsp;<span class="_green b1">Discord:</span> <a class="tlink" href=\"https://discord.com\" target='_blank'>FaeWulf#6969</a> </div>
<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__\\////////////____\\///////////////__&nbsp;&nbsp;&nbsp;<span class="_green b1">Github:</span><a class="tlink" href=\"https://github.com/FaeWulf\" target='_blank'> FaeWulf</a></div>
<div>&nbsp;</div>
<div>&nbsp;</div>
<div>type "help" for "help"?!</div>
<div>&nbsp;</div>`
    },
    {
        "name": "help",
        "output": `
        <div>&nbsp;</div>
        Available commands: neofetch, help, social, git, lmao.
        <div>&nbsp;</div>
        `
    },
    {
        "name": "social",
        "output": `
<div>&nbsp;</div>
<div>My social stuffs</div>
<div><span class="_green b1">Email:</span> ngolamaz3@gmail.com</div>
<div><span class="_green b1">Facebook:</span> <a class="tlink" href=\"https://www.facebook.com/ForestOfCorn/\" target='_blank'> ForestOfCorn </a></div>
<div><span class="_green b1">Discord:</span> <a class="tlink" href=\"https://discord.com/\" target='_blank'> ForestOfCorn </a></div>
<div><span class="_green b1">Youtube:</span> <a class="tlink" href=\"https://www.youtube.com/channel/UC20U4ou9cuZBH9atdMvUa6Q\" target='_blank'>Faewulf</a></div>
<div>&nbsp;</div>
        `
    },
    {
        "name": "lmao",
        "output": `<div>FuckHCH</div>`
    },
    {
        "name": "git",
        "output": `
        <img align="center" src="https://github-readme-stats.vercel.app/api?username=faewulf&show_icons=true&theme=dracula&locale=en" alt="faewulf" />
        <div>&nbsp;</div>
        `
    }
]

const terminal_window = document.querySelector(".terminal-window#Terminal")
const terminal = terminal_window.lastElementChild
const itemBar = document.querySelector("#Item_terminal")
const greenbutton = terminal_window.firstElementChild.childNodes[1];

greenbutton.onclick = () => {
    terminal_window.classList.toggle("minimize")
    itemBar.classList.toggle("glow")
}

document.addEventListener("keydown", function (e) {
    e || window.event;
    const key = e.key;

    if (!terminal_window.classList.contains("activated") || terminal_window.classList.contains("minimize"))
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
                if (input.length !== 0) {
                    const args = input.trim().split(' ');
                    let cmd = null;
                    if (args.length > 1) {
                        cmd = args.join(' ')?.toString();
                    } else {
                        cmd = args.shift()?.toString();
                    }

                    succeed = false
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
                terminal.scrollTop = terminal.scrollHeight - terminal.clientHeight;
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

function bufferer() {
    document.querySelector(".currentLine").innerHTML = root + input + cursor;
}

function printLine(str) {
    document.querySelector(".currentLine").remove()
    terminal.innerHTML += `<div>${root} ${input}</div>`
    terminal.innerHTML += str
    terminal.innerHTML += `<div class="currentLine">${root}${cursor}</div>`
}


//init
input = "neofetch"
cmds.forEach(e => {
    if (e.name == input) {
        printLine(e.output)
    }
})
input = ""

