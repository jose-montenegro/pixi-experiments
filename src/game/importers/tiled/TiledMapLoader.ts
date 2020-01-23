import * as PIXI from 'pixi.js';
import * as tmx from 'tmx-parser';

import { TMXDataSchema } from './schemas/TMXDataSchema';
import { TilesetDataSchema } from './schemas/TilesetDataSchema';
import { Game } from '~game/Game';

/**
 * PIXI loader for tiled maps
 */
export class TiledMapLoader implements PIXI.ILoaderPlugin {

    private static TILESET_ROUTE: string = 'assets/tilesets/maps';

    /**
     * The loader to use
     */
    public loader: PIXI.Loader = new PIXI.Loader;

    /**
     * Function to use when loading
     * @param resource - Resource to load
     * @param next - Callback for when the loading the next resource
     */
    public use(resource: PIXI.LoaderResource, next: () => void) {
        this.loader = Game.instance.resourceManager.loader;
        if (
            !resource.data || !resource.xhr ||
            resource.type !== PIXI.LoaderResource.TYPE.XML ||
            !resource.data.children ||
            !resource.data.children[0].getElementsByTagName('tileset')
        ){
            return next();
        }

        const loadOptions = {
            crossOrigin: resource.crossOrigin,
            parentResource: resource
        };

        const resourcePath = new URL(TiledMapLoader.TILESET_ROUTE, this.loader.baseUrl || window.location.href).href;

        tmx.parse(
            resource.xhr.responseText,
            resourcePath,
            (err: Error, map: TMXDataSchema) => {
                if (err) {
                    throw err;
                }

                map.tileSets.forEach((tileset: TilesetDataSchema) => {
                    if (!(tileset.image.source in this.loader.resources)) {
                        this.loader.add(
                            tileset.image.source,
                            `${resourcePath}/${tileset.image.source}`,
                            loadOptions
                        );
                    }
                })
                resource.data = map;
                next();
            }
        )
    }
}