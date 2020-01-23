import * as PIXI from 'pixi.js';
import { Game } from '../Game';

/**
 * Class to describe sprites
 */
export class Sprite {
    /**
     * The sprite being described
     */
    private readonly _sprite: PIXI.Sprite;

    /**
     * Get the sprite x position
     * @returns The sprite x
     */
    public get x(): number {
        return this._sprite.x;
    }

    /**
     * Set the sprite x
     * @param x - The new x to use
     */
    public set x(x: number) {
        this._sprite.x = x;
    }

    /**
     * Get the sprite y position
     * @returns The sprite y
     */
    public get y(): number {
        return this._sprite.y;
    }

     /**
     * Set the sprite y
     * @param y - The new y to use
     */
    public set y(y: number) {
        this._sprite.y = y;
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
    public constructor(textureName: string, container: PIXI.Container = null) {
        const texture: PIXI.Texture = textureName ? Game.instance.resourceManager.getTexture(textureName) : undefined;
        this._sprite = new PIXI.Sprite(texture);
        if (container) {
            container.addChild(this._sprite);
        }
    }

    /**
     * Destroy this instance
     */
    public destroy(): void {
        this._sprite.destroy();
    }

    /**
     * Set the sprite texture
     * @param texture - The texture to use
     */
    public setTexture(texture: PIXI.Texture) {
        this._sprite.texture = texture;
    }
}