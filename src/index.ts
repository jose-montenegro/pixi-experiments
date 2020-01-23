import { Game } from './game/Game';
import { Constants } from './game/Constants';
import { MapState } from './game/fsm/MapState';

/**
 * Main entry point of the application
 */
export class Main {
    private _game: Game;

    /**
     * Constructor
     */
    public constructor() {
        window.onload = (): void => {
            this.startGame();
        };
    }

    /**
     * Starts the game
     */
    public startGame(): void {
        this._game = new Game(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        this._game.resourceManager
            .add(Constants.TILESET_MAP_CASTLE, 'assets/tilesets/maps/castle.png')
            .add(Constants.MAP_CASTLE, 'assets/maps/castle.tmx')
            .load(this.onAssetsLoaded.bind(this));
    }

    /**
     * Callback for when assets finish loading
     */
    private onAssetsLoaded(): void {
        this._game.stateManager.add(Constants.STATE_MAP, new MapState(this._game))
        this._game.stateManager.changeTo(Constants.STATE_MAP);
        this._game.run();
    }
}

new Main();
