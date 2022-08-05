

// jbonsai

let config = {
    live: 0,
    infinite: 0,
    verbosity: 0,
    lifeStart: 32,
    multiplier: 5,
    baseType: 1,
    seed: "random",
    stop: false,

    timeWait: 4,
    timeStep: 30, //milisec
    totalTime: 0,

    leavesSize: 3,
    leaves: ["&", "%", "#"]
}

let setTimeOuts = []

function seed(seed) {
    Math.seedrandom(seed)
}

function rand() {
    return Math.floor(Math.random() * 10000)
}

function rollDice(base) {
    return (rand() % base) + 1
}

function chooseColor(type) {
    switch (type) {
        case "trunk":
        case "shootLeft":
        case "shootRight":
            if (rand() % 2 == 0) return "Brown2"; //bold later
            else return "Brown1";

        case "dying":
            if (rand() % 10 == 5) return "Dying3" //bold 
            if (rand() % 5 == 2) return "Dying2" //bold 
            else return "Dying1"

        case "dead":
            if (rand() % 3 == 0) return "Green2" //bold 
            else return "Green1"
    }

    return "Text"
}

function chooseString(type, life, dx, dy) {
    let branchStr = "?";

    if (life < 4) type = "dying";

    switch (type) {
        case "trunk":
            if (dy == 0) branchStr = "/~"
            else if (dx < 0) branchStr = "\\|"
            else if (dx == 0) branchStr = "/|\\"
            else if (dx > 0) branchStr = "|/"
            break;
        case "shootLeft":
            if (dy > 0) branchStr = "\\"
            else if (dy == 0) branchStr = "\\_"
            else if (dx < 0) branchStr = "\\|"
            else if (dx == 0) branchStr = "/|"
            else if (dx > 0) branchStr = "/"
            break;
        case "shootRight":
            if (dy > 0) branchStr = "/"
            else if (dy == 0) branchStr = "_/"
            else if (dx < 0) branchStr = "\\|"
            else if (dx == 0) branchStr = "/|"
            else if (dx > 0) branchStr = "/"
            break;
        case "dying":
        case "dead":
            branchStr = config.leaves[rand() % config.leavesSize]
    }

    return branchStr;
}

function setDeltas(type, life, age, multiplier = 5) {
    let dx = 0;
    let dy = 0;
    let dice;
    switch (type) {
        case "trunk": // trunk

            // new or dead trunk
            if (age <= 2 || life < 4) {
                dy = 0;
                dx = (rand() % 3) - 1;
            }
            // young trunk should grow wide
            else if (age < (multiplier * 3)) {

                // every (multiplier * 0.8) steps, raise tree to next level
                if (age % Math.floor(multiplier * 0.5) == 0) dy = -1;
                else dy = 0;

                dice = rollDice(10);
                if (dice >= 0 && dice <= 0) dx = -2;
                else if (dice >= 1 && dice <= 3) dx = -1;
                else if (dice >= 4 && dice <= 5) dx = 0;
                else if (dice >= 6 && dice <= 8) dx = 1;
                else if (dice >= 9 && dice <= 9) dx = 2;
            }
            // middle-aged trunk
            else {
                dice = rollDice(10);
                if (dice > 2) dy = -1;
                else dy = 0;
                dx = (rand() % 3) - 1;
            }
            break;

        case "shootLeft": // left shoot: trend left and little vertical movement
            dice = rollDice(10);
            if (dice >= 0 && dice <= 1) dy = -1;
            else if (dice >= 2 && dice <= 7) dy = 0;
            else if (dice >= 8 && dice <= 9) dy = 1;

            dice = rollDice(10);
            if (dice >= 0 && dice <= 1) dx = -2;
            else if (dice >= 2 && dice <= 5) dx = -1;
            else if (dice >= 6 && dice <= 8) dx = 0;
            else if (dice >= 9 && dice <= 9) dx = 1;
            break;

        case "shootRight": // right shoot: trend right and little vertical movement
            dice = rollDice(10);
            if (dice >= 0 && dice <= 1) dy = -1;
            else if (dice >= 2 && dice <= 7) dy = 0;
            else if (dice >= 8 && dice <= 9) dy = 1;

            dice = rollDice(10);
            if (dice >= 0 && dice <= 1) dx = 2;
            else if (dice >= 2 && dice <= 5) dx = 1;
            else if (dice >= 6 && dice <= 8) dx = 0;
            else if (dice >= 9 && dice <= 9) dx = -1;
            break;

        case "dying": // dying: discourage vertical growth(?); trend left/right (-3,3)
            dice = rollDice(10);
            if (dice >= 0 && dice <= 1) dy = -1;
            else if (dice >= 2 && dice <= 8) dy = 0;
            else if (dice >= 9 && dice <= 9) dy = 1;

            dice = rollDice(15);
            if (dice >= 0 && dice <= 0) dx = -3;
            else if (dice >= 1 && dice <= 2) dx = -2;
            else if (dice >= 3 && dice <= 5) dx = -1;
            else if (dice >= 6 && dice <= 8) dx = 0;
            else if (dice >= 9 && dice <= 11) dx = 1;
            else if (dice >= 12 && dice <= 13) dx = 2;
            else if (dice >= 14 && dice <= 14) dx = 3;
            break;

        case "dead": // dead: fill in surrounding area
            dice = rollDice(10);
            if (dice >= 0 && dice <= 2) dy = -1;
            else if (dice >= 3 && dice <= 6) dy = 0;
            else if (dice >= 7 && dice <= 9) dy = 1;
            dx = (rand() % 3) - 1;
            break;
    }

    return { dx, dy }
}

function branch(y, x, type, life) {

    let age = 0;
    let shootCooldown = config.multiplier //multiplier;

    while (life > 0) {

        // quit if a key pressed
        if (config.stop) {
            setTimeOuts.forEach(E => clearTimeout(E))
            setTimeOuts = []
            return
        }



        life--;		// decrement remaining life counter
        age = config.lifeStart - life;

        let { dx, dy } = setDeltas(type, life, age, config.multiplier)

        if (dy > 0 && y > (maxY - 2)) dy--; // reduce dy if too close to the ground

        // near-dead branch should branch into a lot of leaves
        if (life < 3)
            branch(y, x, "dead", life);

        // dying trunk should branch into a lot of leaves
        else if (type == 0 && life < (config.multiplier + 2))
            branch(y, x, "dying", life);

        // dying shoot should branch into a lot of leaves
        else if ((type == "shootLeft" || type == "shootRight") && life < (config.multiplier + 2))
            branch(y, x, "dying", life);

        // trunks should re-branch if not close to ground AND either randomly, or upon every <multiplier> steps
        /* else if (type == 0 && ( \ */
        /* 		(rand() % (conf.multiplier)) == 0 || \ */
        /* 		(life > conf.multiplier && life % conf.multiplier == 0) */
        /* 		) ) { */
        else if (type == "trunk" && (((rand() % 3) == 0) || (life % config.multiplier == 0))) {

            // if trunk is branching and not about to die, create another trunk with random life
            if ((rand() % 8 == 0) && life > 7) {
                shootCooldown = config.multiplier * 2;	// reset shoot cooldown
                branch(y, x, "trunk", life + (rand() % 5 - 2));
            }

            // otherwise create a shoot
            else if (shootCooldown <= 0) {
                shootCooldown = config.multiplier * 2;	// reset shoot cooldown

                let shootLife = (life + config.multiplier);

                //if (config.verbosity) mvwprintw(objects->treeWin, 4, 5, "shoots: %02d", myCounters->shoots);

                // create shoot

                let chooseBranch = [
                    "shootLeft",
                    "shootRight",
                    //"trunk",
                ]
                branch(y, x, chooseBranch[rollDice(2) - 1], shootLife);
            }
        }
        shootCooldown--;

        /*
        if (config.verbosity > 0) {
            mvwprintw(objects->treeWin, 5, 5, "dx: %02d", dx);
            mvwprintw(objects->treeWin, 6, 5, "dy: %02d", dy);
            mvwprintw(objects->treeWin, 7, 5, "type: %d", type);
            mvwprintw(objects->treeWin, 8, 5, "shootCooldown: % 3d", shootCooldown);
        }
        */

        // move in x and y directions
        x += dx;
        y += dy;

        let color = chooseColor(type);

        // choose string to use for this branch
        let branchStr = chooseString(type, life, dx, dy);

        //make function in setTimeOut works normally
        let t_x = x,
            t_y = y,
            t_type = type


        // print, but ensure wide characters don't overlap
        //console.log("draw " + branchStr + " at " + x + ";" + y)

        setTimeOuts.push(
            setTimeout(() => {
                if (getAt(t_x, t_y) == " " || config.leaves.includes(branchStr)) {

                    if (config.leaves.includes(branchStr) && config.leaves.includes(getAt(t_x, t_y)) && t_type != "dead")
                        return

                    drawAt(Math.floor(t_x), t_y, branchStr, color)

                }
            }, config.totalTime += config.timeStep)
        )



        // if live, update screen

        /*
        if (config.live && !(config.load && myCounters->branches < config.targetBranchCount))
            updateScreen(config.timeStep);
            */
    }
}

function drawBase(baseType = 1) {
    let x = Math.floor(maxX / 2),
        y = Math.floor(maxY - 4)
    // draw base art
    switch (baseType) {
        case 1: {
            // vase size 32x4

            //first line
            drawAt(x - 16, y, ":", "Text")
            drawAt(x - 15, y, "___________", "Green")
            drawAt(x - 4, y, "./~~~\\.", "Red")
            drawAt(x + 3, y, "___________", "Green")
            drawAt(x + 14, y++, ":", "Text")

            //other lines
            drawAt(x - 16, y++, " \\                           / ", "Text")
            drawAt(x - 16, y++, "  \\_________________________/ ", "Text")
            drawAt(x - 16, y, "  (_)                     (_)", "Text")
            break;
        }

        case 2: {
            // vase size 32x4
            drawAt(x - 7, y, "(", "Text")
            drawAt(x - 6, y, "---", "Green")
            drawAt(x - 3, y, "./~~~\\.", "Red")
            drawAt(x + 4, y, "---", "Green")
            drawAt(x + 7, y++, ")", "Text")

            drawAt(x - 7, y++, " (           ) ", "Text")
            drawAt(x - 7, y++, "  (_________)  ", "Text")
            break;
        }
    }
}

function growTree() {

    console.log(maxX +" x " + maxY)

    if(config.seed != "random") {
        seed(config.seed)
    }

    config.stop = false
    drawBase(rollDice(2))
    branch(maxY - 5, Math.floor(maxX / 2), "trunk", config.lifeStart);

    let t_time = config.totalTime + 2000
    config.totalTime = 0

    setTimeOuts.push(
        setTimeout(() => {
            ready2Grow = true
            setTimeOuts = []
        }, t_time)
    )

}

function b_stop() {
    setTimeOuts.forEach(E => clearTimeout(E))
    setTimeOuts = []
    config.stop = true
    ready2Grow = true
    $("#drawBuffer.active").removeClass("active")
}

function getConfig() {
    return config
}