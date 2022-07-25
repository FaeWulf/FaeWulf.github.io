$("#audioInput").change(function () {
    var files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audio.play();
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    var canvas = document.getElementById("visualizer");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 4096;

    var bufferLength = analyser.frequencyBinCount;

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;


    var barWidth = 100;
    var barHeight;
    var x = 0;

    function renderFrame() {
        requestAnimationFrame(renderFrame);
        x = 0;
        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = "#000";
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        let jumpSize = Math.floor(bufferLength / barWidth)

        for (var i = 0; i < bufferLength; i += jumpSize ) {
            barHeight = dataArray[i] * 2;

            var r = 198;
            var g = 160;
            var b = 246;

            ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

            x += barWidth + 50;
        }
    }

    audio.play();
    renderFrame();
});

//init
$("#premusic").click(function() {

    audio.src = "./assests/music.mp3"
    audio.load();
    audio.play();
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    var canvas = document.getElementById("visualizer");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 4096;

    var bufferLength = analyser.frequencyBinCount;

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;


    var barWidth = 100;
    var barHeight;
    var x = 0;

    function renderFrame() {
        requestAnimationFrame(renderFrame);
        x = 0;
        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = "#000";
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        let jumpSize = Math.floor(bufferLength / barWidth)

        for (var i = 0; i < bufferLength; i += jumpSize ) {
            barHeight = dataArray[i] * 2;

            var r = 198;
            var g = 160;
            var b = 246;

            ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

            x += barWidth + 50;
        }
    }

    audio.play();
    renderFrame();
})