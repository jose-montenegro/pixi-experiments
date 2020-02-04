import * as PIXI from 'pixi.js';

import { ImageLayer } from './ImageLayer';
import { TileLayer } from './TileLayer';
import { Tileset } from './Tileset'
import { ObjectLayer } from './ObjectLayer';

/**
 * Tiled map
 */
export class TiledMap extends PIXI.Container {
    private static TILESET_ROUTE: string = 'assets/tilesets/maps';

    public tilesets: Tileset[] = [];
    public layers: { [index: string]: TileLayer } = {};
    public objectLayers: { [index: string]: ObjectLayer }= {};
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
            this.tilesets.push(new Tileset(TiledMap.TILESET_ROUTE, tileset))
        })

        data.layers.forEach((layerData: any) => {
            switch (layerData.type) {
                case 'tile': {
                    const tileLayer: TileLayer = new TileLayer(layerData, this.tilesets);
                    this.layers[layerData.name] = tileLayer;
                    this.addChild(tileLayer);
                    break;
                }
                case 'object': {
                    const objLayer: ObjectLayer = new ObjectLayer(layerData, layerData.objects);
                    this.objectLayers[layerData.name] = objLayer;
                    break;
                }
                case 'image': {
                    const imageLayer: ImageLayer = new ImageLayer(layerData, TiledMap.TILESET_ROUTE);
                    this.layers[layerData.name] = imageLayer as TileLayer;
                    this.addChild(imageLayer);
                    break;
                }
            }
        });
        console.log(this.objectLayers["Objects"]);
    }
}