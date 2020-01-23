import { AnimationDataSchema } from "./AnimationDataSchema";
import { ImageDataSchema } from "./ImageDataSchema";

/**
 * Data schema for Tiled map tiles
 */
export type TileDataSchema = {
    animations: AnimationDataSchema[];
    gid: number;
    id: number;
    image?: ImageDataSchema;
    objectGroups: [];
    probability?: number;
    properties: {};
    terrain: [];
}