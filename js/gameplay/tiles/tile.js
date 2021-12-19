import Entity from "../../core/entity.js";
import Config from "../data/config.js";

export default class Tile extends Entity {
  constructor(game) {
    super(game);

    this._view = null;

    this._init();
  }

  _init() {
    this._initView();
    this.addInput();
  }

  _initView() {
    const size = Config.TileSize;
    const view = this.game.create.rectangle(size, size, 'green');
    this._view;
    this.add(view);
  }
}
