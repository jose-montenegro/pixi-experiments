import * as PIXI from 'pixi.js';
import { Game } from "~game/Game";

/**
 * Camera class. This class is a viewport into the game world
 */
export class Camera {
    /**
     * Game instance
     */
    private readonly _game: Game;
    public get game(): Game {
        return this._game;
    }
    /**
     * Id for this camera. For multicamera use
     */
    private readonly _id: number;

    /**
     * Camera view
     */
    private readonly _view: PIXI.Rectangle;
    public get view(): PIXI.Rectangle {
        return this._view
    } 
    /**
     * Rectangle that bounds the camera position
     */
    private readonly _bounds: PIXI.Rectangle;
    public get bounds(): PIXI.Rectangle {
        return this._bounds;
    }

    /**
     * Determines if the boundary of the camera will be kept to integer values
     */
    private _roundPx: boolean;
    public get roundPx(): boolean {
        return this._roundPx;
    }
    public set roundPx(roundPx: boolean) {
        this._roundPx = roundPx;
    }

    /**
     * Determines if the camera is at the bound limits
     */
    private readonly _atLimit: { x: boolean, y: boolean };
    public get atLimit(): { x: boolean, y: boolean } {
        return this._atLimit;
    }

    /**
     * The container where all objects are attached to
     */
    private _container: PIXI.Container = null;
    public container(): PIXI.Container {
        return this._container;
    }

    /**
     * The scale of the main container
     */
    private _scale: PIXI.IPoint = null;

    /**
     * Constructor
     * @param game - Game instance 
     * @param id - Id of this camera. For multicamera use
     * @param x - x position
     * @param y - y position
     * @param width - viewport width
     * @param height - viewport height;
     */
    constructor(game: Game, id: number, x: number, y: number, width: number, height: number) {
        this._game = game;
        this._id = id;
        this._view = new PIXI.Rectangle(x, y, width, height);
        this._bounds = new PIXI.Rectangle(x, y, width, height);
        this._roundPx = true;
        this._atLimit = { x: false, y: false };
    }

    public init(): void {
        this._container = this._game.world;
        this._scale = this._game.world.scale;
        this._game.camera = this;
    }

    /**
     * Update the camera
     * @param deltaTime - Time since last frame
     */
    public update(deltaTime: number): void {
        this._container.position.x = -this._view.x;
        this._container.position.y = -this._view.y;
    }

    /**
     * Set the camera position
     * @param x - x position
     * @param y - y position
     */
    public setPosition(x: number, y: number): void {
        this._view.x = x;
        this._view.y = y;

        if (this._bounds) {
            this.checkBounds();
        }
    }

    /**
     * Modify camera position
     * @param x - x delta
     * @param y - y delta
     */
    public modifyPosition(x: number, y: number): void {
        this._view.x += x;
        this._view.y += y;

        if (this._bounds){
            this.checkBounds();
        }
    }

    /**
     * Set the camera size
     * @param width - camera width
     * @param height - camera height
     */
    public setSize(width: number, height: number) {
        this._view.width = width;
        this._view.height = height;
    }

    /**
     * Reset the camera
     */
    public reset(): void {
        this._view.x = 0;
        this._view.y = 0;
    }

    /**
     * Check bounds to ensure the camera does not go out of them
     */
    private checkBounds(): void {
        this._atLimit.x = false;
        this._atLimit.y = false;

        let vx: number = this._view.x;
        let vw: number = this._view.right;
        let vy: number = this._view.y;
        let vh: number = this._view.bottom;

        if (vx <= this._bounds.x * this._scale.x) {
            this._atLimit.x = true;
            this._view.x = this._bounds.x * this._scale.x;
        }

        if (vw >= this._bounds.right * this._scale.x) {
            this._atLimit.x = true;
            this._view.x = (this._bounds.right * this._scale.x) - this._view.width;
        }

        if (vy <= this._bounds.top * this._scale.y) {
            this._atLimit.y = true;
            this._view.y = this._bounds.y * this._scale.y;
        }

        if (vh >= this._bounds.bottom * this._scale.y) {
            this._atLimit.y = true;
            this._view.y = (this._bounds.bottom * this._scale.y) - this._view.height;
        }
    }
}