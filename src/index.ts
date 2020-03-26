import { Game } from './game/Game';
import { Constants } from './game/Constants';
import { MapState } from './game/fsm/MapState';
import { PixiSoundState } from '~game/fsm/PixiSoundState';
import { EmptyState } from '~game/fsm/EmptyState';
import { HowlerSoundState } from '~game/fsm/HowlerSoundState';

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
            .add('bgm', 'assets/audio/bgm.ogg')
            .add('voice1', 'assets/audio/voice1.ogg')
            .add('voice2', 'assets/audio/voice2.ogg')
            .load(this.onAssetsLoaded.bind(this));
    }

    /**
     * Callback for when assets finish loading
     */
    private onAssetsLoaded(): void {
        this._game.stateManager.add(Constants.STATE_MAP, new MapState(this._game));
        this._game.stateManager.add('pixiSound', new PixiSoundState(this._game));
        this._game.stateManager.add('howlerSound', new HowlerSoundState(this._game));
        this._game.stateManager.add('empty', new EmptyState(this._game));
        this._game.stateManager.changeTo('pixiSound');
        this._game.run();
    }
}

new Main();
