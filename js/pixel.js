export class Pixel {
  constructor(x, y, size, color, speed, isCircle = false, isStar = false) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speed = speed;
    this.isCircle = isCircle;
    this.isStar = isStar;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    if (this.isCircle) {
      ctx.beginPath();
      ctx.arc(
        this.x + this.size / 2,
        this.y + this.size / 2,
        this.size / 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    } else if (this.isStar) {
      ctx.save();
      ctx.shadowColor = "rgba(255, 255, 0, 0.8)";
      ctx.shadowBlur = 10;
      this.drawStar(
        ctx,
        this.x + this.size / 2,
        this.y + this.size / 2,
        5,
        this.size / 2,
        this.size / 4
      );
      ctx.restore();
    } else {
      ctx.fillRect(this.x, this.y, this.size, this.size);
    }
  }

  drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
  }

  update(isFrozen) {
    if (!isFrozen) {
      this.y += this.speed;
    }
  }
}
