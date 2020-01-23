import { Sprite } from "./Sprite";
import { TiledMap } from "~game/importers/tiled/TiledMap";
import { Game } from "~game/Game";

export class ObjectFactory {
    public static createMapFrom(mapKey: string): TiledMap {
        const map: TiledMap = new TiledMap();
        map.load(Game.instance.resourceManager.getResource(mapKey));
        return map;
    }

    /**
     * Create a new sprite
     * @param key - Key for the sprite texture
     */
    public static createSpriteFrom(key: string, container: PIXI.Container = null): Sprite {
        return new Sprite(key, container);
    }
}