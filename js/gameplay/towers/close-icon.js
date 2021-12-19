import Entity from "../../core/entity.js";
import EventEmitter from "../../core/events/event-emitter.js";

export default class CloseIcon extends Entity {
  constructor(game) {
    super(game);

    this.events = new EventEmitter();
    this._frame = null;

    this._init();
  }

  _init() {
    this._initFrame();
    this._setupEvents();
  }

  _initFrame() {
    const frame = this.game.create.rectangle(40, 40, 'red');
    this._frame = frame;
    this.add(frame);
    frame.alignAnchor();
    frame.addInput();
  }

  _setupEvents() {
    this._frame.input.events.on('down', this._onFrameDown, this);
  }

  _onFrameDown(x, y, entity, event) {
    this.events.emit('down', 'close');
    event.cancel = true;
  }
}
