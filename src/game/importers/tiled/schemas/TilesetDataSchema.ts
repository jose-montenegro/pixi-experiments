
import { ImageDataSchema } from "./ImageDataSchema";
import { TileDataSchema } from "./TileDataSchema";

/**
 * Data schema for a Tiled map tileset
 */
export type TilesetDataSchema = {
    firstGid: number;
    source: string;
    name: string;
    tileWidth: number;
    tileHeight: number;
    spacing?: number;
    margin?: number;
    tileOffset: {
        x: number;
        y: number;
    };
    properties: {};
    image: ImageDataSchema;
    tiles: TileDataSchema[];
    terrainTypes: [];
}