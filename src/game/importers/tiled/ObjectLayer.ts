import { LayerDataSchema } from './schemas/LayerDataSchema';
import { TMXObjectDataSchema } from './schemas/TMXObjectDataSchema';

/**
 * Class for Tiled object layers
 */
export class ObjectLayer {
    /**
     * Data schema of the layer
     */
    public objects: TMXObjectDataSchema[];
    public opacity: number;
    public visible: boolean;
    public properties: any;

    constructor(layer: LayerDataSchema, objects: TMXObjectDataSchema[]) {
        this.opacity = layer.opacity;
        this.visible = layer.visible;
        this.properties = layer.properties;
        this.objects = objects;
    }

    public getObjectsOfType(type: string): TMXObjectDataSchema[] {
        return this.objects.filter((obj: TMXObjectDataSchema) => {
            obj.type === type;
        })
    }
}