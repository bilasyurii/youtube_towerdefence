import EventEmitter from "../events/event-emitter.js";

export default class InputHandler {
  constructor(entity) {
    this.enabled = true;
    this.events = new EventEmitter();
    this.entity = entity;
    this.entity.game.input.addHandler(this);
  }

  onDown(x, y, entity, event) {
    this.events.emit('down', x, y, entity, event);
  }

  onUp(x, y, entity, event) {
    this.events.emit('up', x, y, entity, event);
  }
}