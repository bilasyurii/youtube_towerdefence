import Game from "./core/game.js";
import Gameplay from "./gameplay/gameplay.js";

const canvas = document.getElementById('gameCanvas');
const game = new Game(canvas);
game.add(new Gameplay(game));
game.start();
