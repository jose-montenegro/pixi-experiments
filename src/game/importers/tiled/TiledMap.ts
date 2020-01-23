import * as PIXI from 'pixi.js';
import * as path from 'path';

import { ImageLayer } from './ImageLayer';
import { TiledMapLoader } from './TiledMapLoader';
import { TileLayer } from './TileLayer';
import { Tileset } from './Tileset'

/**
 * Tiled map
 */
export class TiledMap extends PIXI.Container {
    public tilesets: Tileset[] = [];
    public layers: { [index: string]: TileLayer } = {};
    public background: PIXI.Graphics = new PIXI.Graphics();
    public tileWidth: number = 0;
    public tileHeight: number = 0;
    public localWidth?: number;
    public localHeight?: number;
    public resourceUrl: string;

    /**
     * Constructor
     * @param resourceUrl - Url with the resources to load
     */
    constructor() {
        super();
    }

    /**
     * Load this map
     * @param resource - Preloaded resource to use
     */
    public load(resource: PIXI.LoaderResource): void {
        const route = 'assets/tilesets/maps'
        const { data } = resource;

        this.background.beginFill(0xFFF000, 1);
        this.background.drawRect(
            0, 0,
            (this.localWidth || 0) * (this.tileWidth || 0),
            (this.localHeight || 0) * (this.tileHeight || 0)
        );
        this.background.endFill();
        this.addChild(this.background);

        data.tileSets.forEach((tileset: any) => {
            this.tilesets.push(new Tileset(route, tileset))
        })

        data.layers.forEach((layerData: any) => {
            switch (layerData.type) {
                case 'tile': {
                    const tileLayer: TileLayer = new TileLayer(layerData, this.tilesets);
                    this.layers[layerData.name] = tileLayer;
                    this.addChild(tileLayer);
                    break;
                }

                case 'image': {
                    const imageLayer: ImageLayer = new ImageLayer(layerData, route);
                    this.layers[layerData.name] = imageLayer as TileLayer;
                    this.addChild(imageLayer);
                    break;
                }
            }
        });
    }
}