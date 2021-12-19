import Tower from "./tower.js";

export default class Archer extends Tower {
  _getType() {
    return Tower.Type.Archer;
  }

  _createView() {
    const view = this.game.create.circle(10, 'blue');
    return view;
  }
}
