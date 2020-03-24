import * as PIXI from 'pixi.js';

import { Game } from '../Game';
import { Camera } from './camera/Camera';

/**
 * World where all objects in the game live
 */
export class World extends PIXI.Container {

    /**
     * Game instance
     */
    private _game: Game;
    /**
     * Bounds of the world. Any object outside world bounds
     * is not considered to be on the world
     */
    private _worldBounds: PIXI.Rectangle;
    /**
     * Main world camera
     */
    private _camera: Camera = null;

    /**
     * Constructor
     * @param game - Game instance 
     */
    constructor(game: Game) {
        super();

        this._game = game;
        this._worldBounds = new PIXI.Rectangle(0, 0, game.width, game.height);
    }

    /**
     * Initialize the world
     */
    public init(): void {
        this._camera = new Camera(this._game, 0, 0, 0, this._game.width, this._game.height);
        this._game.app.stage.addChild(this);
        this._camera.init();
    }

    /**
     * Set the world bounds
     * @param x - x origin
     * @param y - y origin
     * @param width - world width
     * @param height - world heightx
     */
    public setBounds(x: number, y: number, width: number, height: number): void {
        this._worldBounds.width = width;
        this._worldBounds.height = height;
        this._worldBounds.x = x;
        this._worldBounds.y = y;

        console.log(width);

        if (this._camera.bounds) {
            this._camera.bounds.x = x;
            this._camera.bounds.y = y;
            this._camera.bounds.width = width;
            this._camera.bounds.height = height;
        }
    }
}