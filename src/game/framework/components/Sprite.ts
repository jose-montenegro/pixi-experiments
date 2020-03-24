import * as PIXI from 'pixi.js';
import { Game } from '../../Game';
import { Component } from './Component';

/**
 * Class to describe sprites
 */
export class Sprite extends Component {
    /**
     * The sprite being described
     */
    private readonly _sprite: PIXI.Sprite;
    public get sprite(): PIXI.Sprite {
        return this._sprite;
    }

    /**
     * Get the sprite width
     * @returns The sprite width
     */
    public get width(): number {
        return this._sprite.width;
    }

    /**
     * Get the sprite height
     * @returns The sprite height
     */
    public get height(): number {
        return this._sprite.height;
    }

    /**
     * Constructor
     * @param textureName - Key of the texture the sprite will use
     * @param container - Container the sprite will be under
     */
    public constructor() {
        super();
        this._sprite = new PIXI.Sprite();
    }

    /**
     * Set the sprite texture
     * @param texture - The texture to use
     */
    public setTexture(texture: PIXI.Texture) {
        this._sprite.texture = texture;
    }

    /**
     * Destroy this instance
     */
    public destroy(): void {
        this._sprite.destroy();
    }

    public update(): void {

    }

    public init(): void {
        this._gameObject.addChild(this._sprite);
    }
}