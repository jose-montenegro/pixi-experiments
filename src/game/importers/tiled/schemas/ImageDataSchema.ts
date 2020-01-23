/**
 * Data schema for an image in a tiled map
 */
export type ImageDataSchema = {
    format?: string;
    height: number;
    source: string;
    trans?: boolean;
    width: number;
}