export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function spawnPixel(canvasWidth, canvasHeight, Pixel) {
  const size = Math.floor(Math.random() * 25) + 8; // Size between 8 and 32 pixels
  const x = Math.random() * (canvasWidth - size);
  const y = -size;
  const color = getRandomColor();
  const speed = Math.random() * 3 + 1; // Speed between 1 and 4
  const isCircle = Math.random() < 0.15; // 15% chance to be a circle
  const isStar = Math.random() < 0.05; // 5% chance to be a star
  return new Pixel(x, y, size, color, speed, isCircle, isStar);
}
