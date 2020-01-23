import * as PIXI from "pixi.js";
import { StateManager } from "./fsm/StateManager";
import { ResourceManager } from "./resources/ResourceManager";

/**
 * Main game app class
 */
export class Game {
    /**
     * Viewport width
     */
    private readonly _width: number;
    /**
     * Viewport height
     */
    private readonly _height: number;

    /**
     * Callback for each tick
     */
    private _updateLoop: () => void;

    /**
     * PIXI app that is managed by this class
     */
    private readonly _app: PIXI.Application;
    public get app(): PIXI.Application {
        return this._app;
    }

    /**
     * Static game instance
     */
    private static _instance: Game;
    public static get instance(): Game {
        return Game._instance;
    }

    /**
     * The State Manager
     */
    private readonly _stateManager: StateManager;
    public get stateManager(): StateManager {
        return this._stateManager;
    }

    /**
     * The resource manager
     */
    private readonly _resourceManager: ResourceManager;
    public get resourceManager(): ResourceManager {
        return this._resourceManager;
    }

    /**
     * Constructor
     * @param width - Viewport width 
     * @param height - Viewport height
     * @param backgroundColor - Background color
     */
    public constructor(width: number, height: number, backgroundColor: number = 0x0) {
        this._app = new PIXI.Application({
            backgroundColor, width, height
        });

        this._width = width;
        this._height = height;
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;

        document.body.appendChild(this._app.view);

        this.onResize();
        window.addEventListener('resize', this.onResize.bind(this));

        this._stateManager = new StateManager(this);
        this._resourceManager = new ResourceManager();

        Game._instance = this;
    }

    /**
     * Run the game
     */
    public run(): void {
        this._updateLoop = () => {
            this._stateManager.update(this._app.ticker.elapsedMS / 1000.0);
        }

        this._app!.ticker.add(this._updateLoop);
    }

    /**
     * Callback for when the window resizes
     */
    private onResize(): void {
        if (!this._app) {
            return;
        }

        this._app.renderer.resize(window.innerWidth, window.innerHeight);
        this._app.stage.scale.x = window.innerWidth / this._width;
        this._app.stage.scale.y = window.innerHeight / this._height;
    }
}