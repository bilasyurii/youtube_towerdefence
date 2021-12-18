export default class Time {
  constructor(game) {
    this.game = game;
    this.dt = 1 / 60;
    this.dtMs = 1000 / 60;
    this.time = Date.now();
  }

  update() {
    const time = Date.now();
    const dtMs = time - this.time;
    this.time = time;
    this.dtMs = dtMs;
    this.dt = dtMs * 0.001;
  }
}