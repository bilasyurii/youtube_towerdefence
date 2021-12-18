export default class ScreenManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = 600;
    this.height = 500;

    this.updateCanvas();
  }

  updateCanvas() {
    const canvas = this.canvas;
    canvas.width = this.width;
    canvas.height = this.height;
  }
}