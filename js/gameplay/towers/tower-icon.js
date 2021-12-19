import Entity from "../../core/entity.js";
import EventEmitter from "../../core/events/event-emitter.js";

export default class TowerIcon extends Entity {
  constructor(game, towerClass) {
    super(game);

    this.events = new EventEmitter();
    this._frame = null;
    this._view = null;
    this._towerClass = towerClass;
    this._tower = null;

    this._init();
  }

  _init() {
    this._initFrame();
    this._initView();
    this._setupEvents();
  }

  _initFrame() {
    const frame = this.game.create.rectangle(40, 40, 'white');
    this._frame = frame;
    this.add(frame);
    frame.alignAnchor();
    frame.addInput();
  }

  _initView() {
    const TowerClass = this._towerClass;
    const tower = new TowerClass(this.game);
    this._tower = tower;
    this.add(tower);
  }

  _setupEvents() {
    this._frame.input.events.on('down', this._onFrameDown, this);
  }

  _onFrameDown(x, y, entity, event) {
    this.events.emit('down', this._tower.type);
    event.cancel = true;
  }
}
