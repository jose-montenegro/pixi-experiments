export type TMXObjectDataSchema = {
    name: string,
    type: string,
    x: number,
    y: number,
    width: number,
    height: number,
    rotation: number,
    properties: any,
    gid?: number,
    visible: boolean,
    ellipse: boolean
};