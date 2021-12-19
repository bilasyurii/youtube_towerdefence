import EventEmitter from "../events/event-emitter.js";

export default class Input {
  constructor(game) {
    this.game = game;
    this.canvas = game.canvas;
    this.world = game.world;
    this.events = new EventEmitter();
    this.handlers = [];

    this._init();
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  _init() {
    this._setupEvents();
  }

  _setupEvents() {
    const canvas = this.canvas;
    canvas.addEventListener('pointerdown', (e) => this._onDown(e.offsetX, e.offsetY));
    canvas.addEventListener('pointerup', (e) => this._onUp(e.offsetX, e.offsetY));
  }

  _onDown(x, y) {
    const entity = this._hitTest(x, y);
    console.log(entity);
    this.events.emit('down', x, y);
  }

  _onUp(x, y) {
    this.events.emit('up', x, y);
  }

  _hitTest(x, y) {
    const handlers = this.handlers;
    const count = handlers.length;

    for (let i = 0; i < count; ++i) {
      const handler = handlers[i];

      if (handler.enabled === false) {
        continue;
      }

      const entity = handler.entity;
      const bounds = entity.getWorldBounds();

      if (bounds.containsXY(x, y)) {
        return entity;
      }
    }

    return null;
  }
}
