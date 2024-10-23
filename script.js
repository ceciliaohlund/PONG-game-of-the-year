const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

// Ball properties
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;
const ballRadius = 10;

// Paddle properties
const paddleWidth = 10;
const paddleHeight = 100;
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
const paddleSpeed = 5;

// Player control flags
let upArrowPressed = false;
let downArrowPressed = false;
let wKeyPressed = false;
let sKeyPressed = false;

// Score
let player1Score = 0;
let player2Score = 0;

// Draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

// Draw paddles
function drawPaddles() {
    // Left paddle
    ctx.fillStyle = "white";
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);

    // Right paddle
    ctx.fillStyle = "white";
    ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
}

// Draw the center divider and score
function drawCenterLine() {
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = "white";
    ctx.stroke();

    ctx.font = "30px Arial";
    ctx.fillText(player1Score, canvas.width / 4, 50);
    ctx.fillText(player2Score, 3 * canvas.width / 4, 50);
}

// Reset ball after scoring
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = 5;
}

// Ball movement and collision logic
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Wall collision (top and bottom)
    if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Paddle collision (left paddle)
    if (ballX - ballRadius < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Paddle collision (right paddle)
    if (ballX + ballRadius > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Score update
    if (ballX - ballRadius < 0) {
        player2Score++;
        resetBall();
    }
    if (ballX + ballRadius > canvas.width) {
        player1Score++;
        resetBall();
    }
}

// Paddle movement
function movePaddles() {
    if (wKeyPressed && leftPaddleY > 0) {
        leftPaddleY -= paddleSpeed;
    } else if (sKeyPressed && leftPaddleY < canvas.height - paddleHeight) {
        leftPaddleY += paddleSpeed;
    }

    if (upArrowPressed && rightPaddleY > 0) {
        rightPaddleY -= paddleSpeed;
    } else if (downArrowPressed && rightPaddleY < canvas.height - paddleHeight) {
        rightPaddleY += paddleSpeed;
    }
}

// Update game
function update() {
    moveBall();
    movePaddles();
    draw();
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddles();
    drawCenterLine();
}

// Key event listeners for controlling paddles
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            upArrowPressed = true;
            break;
        case "ArrowDown":
            downArrowPressed = true;
            break;
        case "w":
            wKeyPressed = true;
            break;
        case "s":
            sKeyPressed = true;
            break;
    }
});

document.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "ArrowUp":
            upArrowPressed = false;
            break;
        case "ArrowDown":
            downArrowPressed = false;
            break;
        case "w":
            wKeyPressed = false;
            break;
        case "s":
            sKeyPressed = false;
            break;
    }
});

// Game loop
function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
