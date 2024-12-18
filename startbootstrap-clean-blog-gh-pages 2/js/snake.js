const canvas = document.getElementById("gameCanvas");
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restartButton");

const ctx = canvas.getContext("2d");

if (!ctx) {
  console.error("Canvas context not available! Check browser compatibility.");
}

const boxSize = 20;
let direction;
let gameInterval;
let snake;

// Initial setup for the game
function initializeGame() {
  // Reset game state
  direction = "RIGHT";  // Initial direction
  snake = [
    { x: 80, y: 80 }, // Snake body part 1
    { x: 60, y: 80 }, // Snake body part 2
    { x: 40, y: 80 }  // Snake body part 3
  ];
  scoreDisplay.textContent = "Score: 0"; // Reset score
  clearInterval(gameInterval); // Clear any existing game loop
  gameInterval = setInterval(gameLoop, 100);  // Restart game loop at regular intervals
}

// Event listener to change snake direction based on key press
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.key === "ArrowUp" && direction !== "DOWN") {
    direction = "UP";
  } else if (event.key === "ArrowDown" && direction !== "UP") {
    direction = "DOWN";
  } else if (event.key === "ArrowLeft" && direction !== "RIGHT") {
    direction = "LEFT";
  } else if (event.key === "ArrowRight" && direction !== "LEFT") {
    direction = "RIGHT";
  }
}

// Function to move the snake
function moveSnake() {
  let head = { ...snake[0] };

  if (direction === "UP") {
    head.y -= boxSize;
  } else if (direction === "DOWN") {
    head.y += boxSize;
  } else if (direction === "LEFT") {
    head.x -= boxSize;
  } else if (direction === "RIGHT") {
    head.x += boxSize;
  }

  snake.unshift(head); // Add new head to the snake array
  snake.pop(); // Remove the last part of the snake (tail)
}

// Function to render the game
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move snake and draw new body
  moveSnake();

  // Draw the snake
  ctx.fillStyle = "green";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);
  }

  // Additional game logic can be added here (like checking for collisions, scoring, etc.)
}

// Event listener for the restart button
restartButton.addEventListener("click", function() {
  console.log("Restart button clicked!"); // Debugging line
  initializeGame(); // Reset the game state
});

// Initialize the game on page load
initializeGame();
