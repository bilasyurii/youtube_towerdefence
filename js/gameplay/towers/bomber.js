import Tower from "./tower.js";

export default class Bomber extends Tower {
  _getType() {
    return Tower.Type.Bomber;
  }

  _createView() {
    const view = this.game.create.circle(10, 'cyan');
    return view;
  }
}
