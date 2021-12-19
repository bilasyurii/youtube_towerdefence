import Entity from "../../core/entity.js";
import EventEmitter from "../../core/events/event-emitter.js";
import Archer from "./archer.js";
import Bomber from "./bomber.js";
import CloseIcon from "./close-icon.js";
import Slower from "./slower.js";
import TowerIcon from "./tower-icon.js";

export default class TowerSelector extends Entity {
  constructor(game) {
    super(game);

    this.events = new EventEmitter();
    this._icons = [];

    this._init();
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  _init() {
    this.visible = false;
    this._initFrame();
    this._initTowerIcons();
    this._initCloseIcon();
    this._setupEvents();
  }

  _initFrame() {
    const frame = this.game.create.rectangle(200, 50, 'grey');
    this.add(frame);
    frame.alignAnchor();
  }

  _initTowerIcons() {
    const towerClasses = [
      Archer,
      Bomber,
      Slower,
    ];
    const count = towerClasses.length;
    const icons = this._icons;

    for (let i = 0; i < count; ++i) {
      const icon = new TowerIcon(this.game, towerClasses[i]);
      this.add(icon);
      icons.push(icon);
      icon.position.x = (i - 1.5) * 50;
    }
  }

  _initCloseIcon() {
    const close = new CloseIcon(this.game);
    this.add(close);
    this._icons.push(close);
    close.position.x = 75;
  }

  _setupEvents() {
    const icons = this._icons;
    const count = icons.length;

    for (let i = 0; i < count; ++i) {
      icons[i].events.on('down', this._onIconDown, this);
    }
  }

  _onIconDown(type) {
    if (type === 'close') {
      this.events.emit('close');
    } else {
      this.events.emit('towerSelected', type);
    }
  }
}
