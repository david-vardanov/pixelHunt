import { Pixel } from "./pixel.js";
import { getRandomColor, spawnPixel } from "./utils.js";
import {
  createAnimation,
  createBlowEffect,
  updateBlowEffect,
} from "./animations.js";
import { Timer } from "./timer.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const freezeTimerDisplay = document.getElementById("freezeTimer");
const gameOverDisplay = document.getElementById("gameOver");
const finalScoreDisplay = document.getElementById("finalScore");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pixels = [];
const blowEffects = [];
let score = 0;
const maxPixels = 25;
const gameDuration = 30000; // 30 seconds
const gameTimer = new Timer(gameDuration, timerDisplay);

function updatePixels() {
  for (let i = pixels.length - 1; i >= 0; i--) {
    pixels[i].update(gameTimer.isFrozen);
    pixels[i].draw(ctx);

    // Remove pixels that have fallen off the screen
    if (pixels[i].y > canvas.height) {
      pixels.splice(i, 1);
    }
  }
}

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;

  for (let i = pixels.length - 1; i >= 0; i--) {
    const pixel = pixels[i];
    if (
      clickX >= pixel.x - pixel.size / 2 &&
      clickX <= pixel.x + pixel.size * 1.5 &&
      clickY >= pixel.y - pixel.size / 2 &&
      clickY <= pixel.y + pixel.size * 1.5
    ) {
      if (pixel.isCircle) {
        if (score > 10) {
          score -= 10;
          createAnimation("-10", pixel.x, pixel.y);
          blowEffects.push(
            ...createBlowEffect(ctx, pixel.x, pixel.y, pixel.color)
          );
        } else {
          score = 0;
        }
      } else if (pixel.isStar) {
        gameTimer.freeze(5000);
        createAnimation("Freeze!", pixel.x, pixel.y);
        blowEffects.push(
          ...createBlowEffect(ctx, pixel.x, pixel.y, pixel.color)
        );
      } else {
        score++;
        createAnimation("+1", pixel.x, pixel.y);
        blowEffects.push(
          ...createBlowEffect(ctx, pixel.x, pixel.y, pixel.color)
        );
      }
      pixels.splice(i, 1);
      updateScore();
      break;
    }
  }
});

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

function endGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  finalScoreDisplay.textContent = score;
  gameOverDisplay.style.display = "block";
}

function gameLoop() {
  if (!gameTimer.update()) {
    endGame();
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gameTimer.checkFreeze();
  if (pixels.length < maxPixels) {
    pixels.push(spawnPixel(canvas.width, canvas.height, Pixel));
  }
  updatePixels();
  updateBlowEffect(ctx, blowEffects);
  requestAnimationFrame(gameLoop);
}

gameTimer.start();
gameLoop();
