import * as PIXI from 'pixi.js';

import { TilesetDataSchema } from './schemas/TilesetDataSchema';
import { Game } from '../../Game';

/**
 * Tileset class for tiled maps
 */
export class Tileset {
    public firstGid: number = 0;
    public baseTexture: PIXI.BaseTexture;
    public textures: PIXI.Texture[];
    public margin: number = 0;
    public spacing: number = 0;
    public tileHeight: number = 0;
    public tileWidth: number = 0;
    public image: {
        source: string;
        height: number;
        width: number;
    } = {
        height: 0,
        source: '',
        width: 0
    };
    public tileOffset?: {
        x: number,
        y: number
    };

    /**
     * Constructor
     * @param route - Base path 
     * @param tileset - Tileset to use
     */
    constructor(route: string, tileset: TilesetDataSchema) {
        Object.assign(this, tileset);

        const texture: PIXI.Texture = Game.instance.resourceManager.getTexture(`${route}/${this.image.source}`);
        console.log(route);
        this.baseTexture = texture.baseTexture;
        this.textures = [];

        for (let y: number = this.margin; y < this.image.height; y += this.tileHeight + this.spacing) {
            for (let x: number = this.margin; x < this.image.width; x += this.tileWidth + this.spacing) {
                this.textures.push(
                    new PIXI.Texture(this.baseTexture, new PIXI.Rectangle(x, y, this.tileWidth, this.tileHeight))
                )
            }
        }
    }
}