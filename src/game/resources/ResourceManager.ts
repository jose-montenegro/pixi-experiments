import * as PIXI from "pixi.js";
import { TiledMapLoader } from "~game/importers/tiled/TiledMapLoader";

/**
 * The resource manager
 */
export class ResourceManager {

    /**
     * The PIXI loader
     */
    private _loader: PIXI.Loader;
    public get loader() : PIXI.Loader {
        return this._loader;
    }

    /**
     * Cached resources
     */
    private readonly _cache: {} = {};

    /**
     * Resources to load
     */
    private readonly _loadBuffer: Map<string, string> = new Map<string, string>();

    /**
     * Plugin for tmx
     */
    private readonly _tmxPlugin: TiledMapLoader;

    /**
     * Constructor
     */
    public constructor() {
        this._loader = PIXI.Loader.shared;
        this._tmxPlugin = new TiledMapLoader();
    }

    /**
     * Add a resource
     * @param key - Resource key
     * @param url - Resource location url
     */
    public add(key: string, url: string): ResourceManager {
        this._loadBuffer.set(key, url);
        return this;
    }

    /**
     * Load assets
     * @param onComplete - Callback for when assets are loaded 
     */
    public load(onComplete: () => void): void {
        PIXI.Loader.registerPlugin(this._tmxPlugin);
        this._loader = new PIXI.Loader();
        this._loadBuffer.forEach((value: string, key: string) => {
            this._loader.add(key, value);
        });
        this._loadBuffer.clear();
        this._loader.on("complete", onComplete);
        this._loader.load();
    }

    /**
     * Get a texture
     * @param name - Ket to search for
     */
    public getTexture(name: string): PIXI.Texture {
        if (!this.hasTexture(name)) {
            this._cache[name] =  new PIXI.Texture(PIXI.Texture.from(name).baseTexture);
        }
        return this._cache[name] as PIXI.Texture;
    }

    /**
     * Determine if the manager has a texture in cache
     * @param name - The key to search for
     */
    public hasTexture(name: string): boolean {
        return this._cache.hasOwnProperty(name);
    }

    /**
     * Get a loader resource
     * @param resourceUrl - The url of the resource
     */
    public getResource(resourceUrl: string): PIXI.LoaderResource {
        return this._loader.resources[resourceUrl];
    }
}