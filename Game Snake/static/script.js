// script.js

document.addEventListener('DOMContentLoaded', () => {
  const gameBoard = document.getElementById('game-board');
  const gridSize = 20;
  const snakeSpeed = 150; // Adjust snake speed as needed

  let snake = [{ x: 10, y: 10 }];
  let food = getRandomFoodPosition();
  let direction = 'right';
  let gameInterval;

  function getRandomFoodPosition() {
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * gridSize);
    return { x, y };
  }

  function draw() {
    gameBoard.innerHTML = '';

    // Draw Snake
    snake.forEach(segment => {
      const snakeElement = document.createElement('div');
      snakeElement.style.gridColumnStart = segment.x + 1;
      snakeElement.style.gridRowStart = segment.y + 1;
      snakeElement.classList.add('snake');
      gameBoard.appendChild(snakeElement);
    });

    // Draw Food
    const foodElement = document.createElement('div');
    foodElement.style.gridColumnStart = food.x + 1;
    foodElement.style.gridRowStart = food.y + 1;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
  }

  function move() {
    const head = { ...snake[0] };

    switch (direction) {
      case 'up':
        head.y = (head.y - 1 + gridSize) % gridSize;
        break;
      case 'down':
        head.y = (head.y + 1) % gridSize;
        break;
      case 'left':
        head.x = (head.x - 1 + gridSize) % gridSize;
        break;
      case 'right':
        head.x = (head.x + 1) % gridSize;
        break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      food = getRandomFoodPosition();
    } else {
      snake.pop();
    }
  }

  function checkCollision() {
    const head = snake[0];
    if (
      head.x < 0 ||
      head.x >= gridSize ||
      head.y < 0 ||
      head.y >= gridSize ||
      snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
      clearInterval(gameInterval);
      alert('Game Over! You collided with the wall or yourself.');
      resetGame();
    }
  }

  function resetGame() {
    snake = [{ x: 10, y: 10 }];
    food = getRandomFoodPosition();
    direction = 'right';
    document.querySelector('button').style.display = 'block';
    document.getElementById('game-board').style.display = 'none';
  }

  function handleKeyPress(event) {
    switch (event.key) {
      case 'ArrowUp':
        direction = 'up';
        break;
      case 'ArrowDown':
        direction = 'down';
        break;
      case 'ArrowLeft':
        direction = 'left';
        break;
      case 'ArrowRight':
        direction = 'right';
        break;
    }
  }

  function startGame() {
    document.getElementById('game-board').style.display = 'grid';
    document.querySelector('button').style.display = 'none';

    document.addEventListener('keydown', handleKeyPress);

    gameInterval = setInterval(() => {
      move();
      checkCollision();
      draw();
    }, snakeSpeed);
  }

  // Attach startGame function to the button click
  document.querySelector('button').addEventListener('click', startGame);
});
