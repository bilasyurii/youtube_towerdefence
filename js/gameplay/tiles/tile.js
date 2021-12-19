import Entity from "../../core/entity.js";
import EventEmitter from "../../core/events/event-emitter.js";
import Config from "../data/config.js";

export default class Tile extends Entity {
  constructor(game) {
    super(game);

    this.events = new EventEmitter();
    this.tower = null;
    this._view = null;

    this._init();
  }

  _init() {
    this._initView();
    this.addInput();
    this._setupEvents();
  }

  _initView() {
    const size = Config.TileSize;
    const view = this.game.create.rectangle(size, size, 'green');
    this._view;
    this.add(view);
  }

  _setupEvents() {
    this.input.events.on('down', this._onDown, this);
  }

  _onDown() {
    this.events.emit('down', this);
  }
}
