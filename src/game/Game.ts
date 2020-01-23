import * as PIXI from "pixi.js";
import { StateManager } from "./fsm/StateManager";
import { ResourceManager } from "./resources/ResourceManager";
import { World } from "./framework/World";
import { Camera } from "./framework/Camera";
import { KeyboardManager } from "./framework/input/KeyboardManager";

/**
 * Main game app class
 */
export class Game {
    /**
     * Viewport width
     */
    private readonly _width: number;
    public get width(): number {
        return this._width;
    }
    /**
     * Viewport height
     */
    private readonly _height: number;
    public get height(): number {
        return this._height;
    }

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

    private readonly _keyboardManager: KeyboardManager;
    public get keyboardManager(): KeyboardManager {
        return this._keyboardManager;
    }

    /**
     * Game world
     */
    private readonly _world: World;
    public get world(): World {
        return this._world;
    }

    /**
     * Main camera
     */
    private _camera: Camera;
    public get camera(): Camera {
        return this._camera;
    }
    public set camera(camera: Camera) {
        this._camera = camera;
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
        this._keyboardManager = new KeyboardManager(this);

        this._keyboardManager.init();

        this._world = new World(this);
        this._world.init();

        Game._instance = this;
    }

    /**
     * Run the game
     */
    public run(): void {
        this._updateLoop = () => {
            const delta: number = this._app.ticker.elapsedMS / 1000.0;
            this._camera.update(delta);
            this._stateManager.update(delta);
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