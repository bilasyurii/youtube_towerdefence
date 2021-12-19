export default class InputHandler {
  constructor(entity) {
    this.enabled = true;
    this.entity = entity;
    this.entity.game.input.addHandler(this);
  }
}