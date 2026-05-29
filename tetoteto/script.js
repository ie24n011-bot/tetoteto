const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ROW = 20;
const COL = 10;
const SIZE = 30;

const board = [];

for (let y = 0; y < ROW; y++) {
    board[y] = [];

    for (let x = 0; x < COL; x++) {
        board[y][x] = 0;
    }
}

// ■ブロック
const tetrominos = [

    // I
    [
        [1,1,1,1]
    ],

    // O
    [
        [1,1],
        [1,1]
    ],

    // T
    [
        [0,1,0],
        [1,1,1]
    ],

    // L
    [
        [1,0],
        [1,0],
        [1,1]
    ],

    // J
    [
        [0,1],
        [0,1],
        [1,1]
    ],

    // S
    [
        [0,1,1],
        [1,1,0]
    ],

    // Z
    [
        [1,1,0],
        [0,1,1]
    ]
];
let tetromino =
    tetrominos[
        Math.floor(Math.random() * tetrominos.length)
    ];

let blockX = 4;
let blockY = 0;


// 描画
function drawBlock(x, y, color="cyan") {

    ctx.fillStyle = color;

    ctx.fillRect(
        x * SIZE,
        y * SIZE,
        SIZE,
        SIZE
    );

    ctx.strokeStyle = "black";

    ctx.strokeRect(
        x * SIZE,
        y * SIZE,
        SIZE,
        SIZE
    );
}

// 全体描画
function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 固定ブロック
    for (let y = 0; y < ROW; y++) {
        for (let x = 0; x < COL; x++) {

            if (board[y][x]) {
                drawBlock(x, y, "orange");
            }
        }
    }

    // 落下中ブロック
    for (let y = 0; y < tetromino.length; y++) {
        for (let x = 0; x < tetromino[y].length; x++) {

            if (tetromino[y][x]) {

                drawBlock(
                    blockX + x,
                    blockY + y
                );
            }
        }
    }
}

// 衝突判定
function collision() {

    for (let y = 0; y < tetromino.length; y++) {
        for (let x = 0; x < tetromino[y].length; x++) {

            if (!tetromino[y][x]) continue;

            let newX = blockX + x;
            let newY = blockY + y + 1;

            // 下端
            if (newY >= ROW) {
                return true;
            }

            // 固定ブロック
            if (board[newY][newX]) {
                return true;
            }
        }
    }

    return false;
}

// 固定
function merge() {

    for (let y = 0; y < tetromino.length; y++) {
        for (let x = 0; x < tetromino[y].length; x++) {

            if (tetromino[y][x]) {

                board[blockY + y][blockX + x] = 1;
            }
        }
    }
}

// ライン削除
function clearLines() {

    for (let y = ROW - 1; y >= 0; y--) {

        let full = true;

        for (let x = 0; x < COL; x++) {

            if (board[y][x] === 0) {
                full = false;
            }
        }

        if (full) {

            // 一段下げる
            for (let yy = y; yy > 0; yy--) {

                for (let x = 0; x < COL; x++) {
                    board[yy][x] = board[yy - 1][x];
                }
            }

            // 一番上を空に
            for (let x = 0; x < COL; x++) {
                board[0][x] = 0;
            }

            y++;
        }
    }
}

// 更新
function update() {

    if (!collision()) {

        blockY++;
    }
    else {

        merge();

        clearLines();

        blockX = 4;
        blockY = 0;

        tetromino =
    tetrominos[
        Math.floor(Math.random() * tetrominos.length)
    ];

        // ゲームオーバー
        if (collision()) {

            alert("GAME OVER");

            for (let y = 0; y < ROW; y++) {
                for (let x = 0; x < COL; x++) {
                    board[y][x] = 0;
                }
            }
        }
    }

    draw();
}

// キー操作
document.addEventListener("keydown", (e) => {

    // 左
    if (e.key === "ArrowLeft") {

        if (blockX > 0) {
            blockX--;
        }
    }

    // 右
    if (e.key === "ArrowRight") {

        if (blockX < COL - tetromino[0].length) {
            blockX++;
        }
    }

    // 下
    if (e.key === "ArrowDown") {

        if (!collision()) {
            blockY++;
        }
    }

    draw();
});

setInterval(update, 500);

draw();