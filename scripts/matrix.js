const state = {
    fps: 10,
    color: "#0f0",
    charset: "0123456789ABCDEF",
    font: 30
};
var matrixWindow = document.querySelector(".terminal-window#Matrix")
const matrixItemBar = document.querySelector("#Item_Matrix")
let MatrixgreenButton = matrixWindow.firstElementChild.childNodes[1];

MatrixgreenButton.onclick = () => {
    matrixWindow.classList.toggle("minimize")
    matrixItemBar.classList.toggle("glow")
}


let Matrixcanvas = document.getElementById("matrixCLI");
let Matrixctx = Matrixcanvas.getContext("2d");

let w, h, p;
const resize = () => {
    Matrixcanvas = document.getElementById("matrixCLI");
    Matrixctx = Matrixcanvas.getContext("2d");

    w = Matrixcanvas.width = innerWidth;
    h = Matrixcanvas.height = innerHeight;

    p = Array(Math.ceil(w / (state.font))).fill(0);

    for (let i = 0; i < p.length; i++)
        p[i] = Math.floor(Math.random() * h)
};

var ro = new ResizeObserver(entries => {
  for (let entry of entries) {
      resize()
  }
});

// Observe one or multiple elements
ro.observe(document.getElementById("Matrix"));
resize()

const random = (items) => items[Math.floor(Math.random() * items.length)];

const draw = () => {
    Matrixctx.fillStyle = "rgba(0,0,0,.2)";
    Matrixctx.fillRect(0, 0, w, h);
    Matrixctx.fillStyle = state.color;
    Matrixctx.font = `${state.font}px Verdana`;

    for (let i = 0; i < p.length; i++) {
        let v = p[i];
        Matrixctx.fillText(random(state.charset), i * (state.font), v);
        p[i] = v >= h || v >= Math.floor(Math.random() * (h - 0.5*h) ) + 0.5*h ? 0 : v + state.font;
    }
};

let interval = setInterval(draw, 1000 / state.fps);