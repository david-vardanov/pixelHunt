export function createAnimation(text, x, y) {
  const animation = document.createElement("div");
  animation.className = "animation";
  animation.style.left = `${x}px`;
  animation.style.top = `${y}px`;
  animation.textContent = text;
  document.body.appendChild(animation);

  animation.addEventListener("animationend", () => {
    document.body.removeChild(animation);
  });
}

export function createBlowEffect(ctx, x, y, color) {
  const particles = [];
  for (let i = 0; i < 10; i++) {
    particles.push({
      x: x,
      y: y,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 8,
      speedY: (Math.random() - 0.5) * 8,
      color: color,
      life: 20,
    });
  }

  return particles;
}

export function updateBlowEffect(ctx, particles) {
  particles.forEach((particle, index) => {
    ctx.fillStyle = particle.color;
    ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    particle.life--;
    if (particle.life <= 0) {
      particles.splice(index, 1);
    }
  });
}
