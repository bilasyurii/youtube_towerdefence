import EventEmitter from "../events/event-emitter.js";

export default class Input {
  constructor(game) {
    this.game = game;
    this.canvas = game.canvas;
    this.world = game.world;
    this.events = new EventEmitter();
    this.handlers = [];
    this.event = {
      cancel: false,
    };

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
    this.events.emit('down', x, y);
    this._hitTestAll(Type.Down, x, y);
  }

  _onUp(x, y) {
    this.events.emit('up', x, y);
    this._hitTestAll(Type.Up, x, y);
  }

  _hitTestAll(type, x, y) {
    const event = this.event;
    const handlers = this.handlers;
    const hit = [];
    let count = handlers.length;

    for (let i = 0; i < count; ++i) {
      const handler = handlers[i];

      if (handler.enabled === false) {
        continue;
      }

      const entity = handler.entity;

      if (entity.worldVisible === false) {
        continue;
      }

      const bounds = entity.getWorldBounds();

      if (bounds.containsXY(x, y)) {
        hit.push(handler);
      }
    }

    count = hit.length;
    const events = this.events;

    for (let i = 0; i < count; ++i) {
      const handler = hit[i];
      const entity = handler.entity;

      event.cancel = false;

      switch (type) {
        case Type.Down:
          handler.onDown(x, y, entity, event);
          break;
        case Type.Up:
          handler.onUp(x, y, entity, event);
          break;
      }

      if (event.cancel === true) {
        break;
      }

      events.emit(type, x, y, entity, event);

      if (event.cancel === true) {
        break;
      }
    }
  }
}

const Type = {
  Down: 'Down',
  Up: 'Up',
};

Input.Type = Type;
