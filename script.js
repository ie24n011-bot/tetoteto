const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ROW = 20;
const COL = 10;
const SIZE = 30;

let blockX = 4;
let blockY = 0;

function drawBlock(x, y, color = "cyan") {
    ctx.fillStyle = color;
    ctx.fillRect(x * SIZE, y * SIZE, SIZE, SIZE);

    ctx.strokeStyle = "black";
    ctx.strokeRect(x * SIZE, y * SIZE, SIZE, SIZE);
}

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // グリッド
    for (let y = 0; y < ROW; y++) {
        for (let x = 0; x < COL; x++) {

            ctx.strokeStyle = "#333";
            ctx.strokeRect(x * SIZE, y * SIZE, SIZE, SIZE);
        }
    }

    // ブロック描画
    drawBlock(blockX, blockY);
}

document.addEventListener("keydown", (e) => {

    if (e.key === "ArrowLeft" && blockX > 0) {
        blockX--;
    }

    if (e.key === "ArrowRight" && blockX < COL - 1) {
        blockX++;
    }

    if (e.key === "ArrowDown" && blockY < ROW - 1) {
        blockY++;
    }
});

function update() {

    blockY++;

    if (blockY >= ROW) {
        blockY = 0;
    }

    draw();
}

setInterval(update, 500);

draw();