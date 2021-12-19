import Entity from "../../core/entity.js";

export default class Tower extends Entity {
  constructor(game) {
    super(game);

    this.type = this._getType();
    this._view = null;

    this._init();
  }

  _init() {
    this._initView();
  }

  _initView() {
    const view = this._createView();
    this._view = view;
    this.add(view);
  }

  _getType() {
    throw new Error('Abstract method.');
  }

  _createView() {
    throw new Error('Abstract method.');
  }
}

const Type = {
  Archer: 'Archer',
  Bomber: 'Bomber',
  Slower: 'Slower',
};

Tower.Type = Type;
