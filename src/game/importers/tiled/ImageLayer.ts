import * as PIXI from 'pixi.js';
import { LayerDataSchema } from './schemas/LayerDataSchema';
import { ObjectFactory } from '~game/framework/factories/ObjectFactory';

/**
 * Image layer for tiled maps
 */
export class ImageLayer extends PIXI.Container {
    constructor(layer: LayerDataSchema, route: string) {
        super();

        Object.assign(this, layer);
        this.alpha = layer.opacity;

        if (layer.image && layer.image.source) {
            this.addChild(ObjectFactory.createSpriteFrom(`${route}/${layer.image.source}`).sprite);
        }
    }
}