import { LayerDataSchema } from "./LayerDataSchema";
import { TilesetDataSchema } from "./TilesetDataSchema";

/**
 * Data schema for TMX maps
 */
export type TMXDataSchema = {
    version: string;
    orientation: string;
    width: number;
    height: number;
    tileWidth: number;
    tileHeight: number;
    backgroundColor?: string;
    layers: LayerDataSchema[];
    properties: {};
    tileSets: TilesetDataSchema[];
}