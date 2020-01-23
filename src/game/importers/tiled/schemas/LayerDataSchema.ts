import { TMXDataSchema } from "./TMXDataSchema";
import { ImageDataSchema } from "./ImageDataSchema";
import { TileDataSchema } from "./TileDataSchema";

/**
 * Data schema for a layer on a tiled map
 */
export type LayerDataSchema = {
    map: TMXDataSchema;
    type: string;
    name: string;
    image: ImageDataSchema;
    opacity: number;
    visible: boolean;
    properties: {};
    tiles: TileDataSchema[];
    horizontalFlips: boolean[];
    verticalFlips: boolean[];
    diagonalFlips: boolean[];
}