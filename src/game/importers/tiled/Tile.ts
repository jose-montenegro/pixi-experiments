import * as PIXI from 'pixi.js';

import { Tileset } from './Tileset';
import { AnimationDataSchema } from './schemas/AnimationDataSchema';
import { TileDataSchema } from './schemas/TileDataSchema';

/**
 * Class for tiled map tiles
 */
export class Tile extends PIXI.AnimatedSprite {
    /**
     * Get textures for the tile
     * @param tile - Tile data
     * @param tileset - Tileset
     */
    private static getTextures(tile: TileDataSchema, tileset: Tileset): PIXI.Texture[] {
        const textures: PIXI.Texture[] = [];

        if (tile.animations.length) {
            tile.animations.forEach((frame: AnimationDataSchema) => {
                textures.push(tileset.textures[frame.tileId]);
            });
        } else {
            textures.push(tileset.textures[tile.gid - tileset.firstGid]);
        }

        return textures;
    }

    public animations: AnimationDataSchema[] = [];
    public gid: number = 0;
    public xPos: number = 0;
    public yPos: number = 0;
    public tile: TileDataSchema;
    public tileset: Tileset;
    public horizontalFlip: boolean;
    public verticalFlip: boolean;
    public diagonalFlip: boolean;

    /**
     * Constructor
     * @param tile - Tile data 
     * @param tileset - Tileset
     * @param horizontalFlip - Horizontal flip
     * @param verticalFlip - Vertical flip
     * @param diagonalFlip - Diagonal flip
     */
    constructor(tile: TileDataSchema, tileset: Tileset, horizontalFlip: boolean, verticalFlip: boolean, diagonalFlip: boolean) {
        super(Tile.getTextures(tile, tileset));

        this.textures = Tile.getTextures(tile, tileset);
        this.tile = tile;
        this.tileset = tileset;
        this.horizontalFlip = horizontalFlip;
        this.verticalFlip = verticalFlip;
        this.diagonalFlip = diagonalFlip;

        Object.assign(this, tile);
        this.flip();
    }

    /**
     * Flip the tile around based on properties
     */
    private flip(): void {
        if (this.horizontalFlip) {
            this.anchor.x = 1;
            this.scale.x = -1;
        }

        if (this.verticalFlip) {
            this.anchor.y = 1;
            this.scale.y = -1;
        }

        if (this.diagonalFlip) {
            if (this.horizontalFlip) {
                this.anchor.x = 0;
                this.scale.x = 1;
                this.anchor.y = 1;
                this.scale.y = 1

                this.rotation = PIXI.DEG_TO_RAD * 90;
            }
            if (this.verticalFlip) {
                this.anchor.x = 1;
                this.scale.x = 1;
                this.anchor.y = 0;
                this.scale.y = 1;

                this.rotation = PIXI.DEG_TO_RAD * -90;
            }
        }
    }
}