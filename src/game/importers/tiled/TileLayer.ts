import * as PIXI from 'pixi.js';

import { Tile } from './Tile';
import { Tileset } from './Tileset';
import { LayerDataSchema } from './schemas/LayerDataSchema';

export class TileLayer extends PIXI.Container {

    /**
     * Find a tileset by gid
     * @param gid - Gid to use
     * @param tilesets - Tileset pool to search from
     */
    private static findTileset(gid: number, tilesets: Tileset[]): Tileset {
        let tileset: Tileset;
        for (let i = tilesets.length - 1; i >= 0; i--) {
            tileset = tilesets[i];
            if (tileset.firstGid && tileset.firstGid <= gid){
                break;
            }
        }

        return tileset;
    }

    public layer: LayerDataSchema;
    public tilesets: Tileset[];
    public tiles: Tile[];

    /**
     * Constructor
     * @param layer - Layer data 
     * @param tilesets - Tileset pool
     */
    constructor(layer: LayerDataSchema, tilesets: Tileset[]) {
        super();

        this.layer = layer;
        this.tilesets = tilesets;
        this.alpha = layer.opacity;
        this.tiles = [];

        Object.assign(this.layer);
        this.create();
    }

    /**
     * Create this layer
     */
    public create(): void {
        for (let y = 0; y < this.layer.map.height; y++) {
            for (let x = 0; x < this.layer.map.width; x++) {
                const i: number = x + y * this.layer.map.width;
                if (
                    this.layer.tiles[i] &&
                    this.layer.tiles[i].gid &&
                    this.layer.tiles[i].gid !== 0
                ) {
                    const tileset = TileLayer.findTileset(
                        this.layer.tiles[i].gid,
                        this.tilesets
                    );
                    if (tileset) {
                        const tile = new Tile(
                            this.layer.tiles[i],
                            tileset,
                            this.layer.horizontalFlips[i],
                            this.layer.verticalFlips[i],
                            this.layer.diagonalFlips[i]
                        );

                        tile.x = x * this.layer.map.tileWidth;
                        tile.y = y * this.layer.map.tileHeight + (this.layer.map.tileHeight - (tile.textures[0] as PIXI.Texture).height);
                        tile.xPos = x;
                        tile.yPos = y;

                        if (tileset.tileOffset) {
                            tile.x += tileset.tileOffset.x;
                            tile.y += tileset.tileOffset.y;
                        }

                        if (tile.textures.length > 1) {
                            tile.animationSpeed = 1000 / 60 / tile.animations[0].duration;
                            tile.gotoAndPlay(0);
                        }

                        this.tiles.push(tile);
                        this.addChild(tile);
                    }
                }
            }
        }
    }
}