import Tower from "./tower.js";

export default class Slower extends Tower {
  _getType() {
    return Tower.Type.Slower;
  }

  _createView() {
    const view = this.game.create.circle(10, 'orange');
    return view;
  }
}
