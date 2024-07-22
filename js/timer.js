export class Timer {
  constructor(duration, displayElement) {
    this.duration = duration;
    this.displayElement = displayElement;
    this.startTime = Date.now();
    this.endTime = this.startTime + this.duration;
    this.isFrozen = false;
    this.freezeEndTime = 0;
  }

  start() {
    this.update();
  }

  update() {
    if (!this.isFrozen) {
      const remainingTime = Math.round((this.endTime - Date.now()) / 1000);
      this.displayElement.textContent = `Time: ${remainingTime}`;
      if (remainingTime <= 0) {
        this.displayElement.textContent = "Time: 0";
        return false; // Indicates the timer has ended
      }
    }
    return true; // Indicates the timer is still running
  }

  freeze(freezeDuration) {
    this.isFrozen = true;
    this.freezeEndTime = Date.now() + freezeDuration;
  }

  checkFreeze() {
    if (this.isFrozen && Date.now() > this.freezeEndTime) {
      this.isFrozen = false;
    }
  }
}
