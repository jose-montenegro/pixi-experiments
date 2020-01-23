import { BaseState } from "./BaseState"
import { Game } from "../Game";
import { Constants } from "../Constants";
import { ObjectFactory } from "../framework/ObjectFactory";
import { TiledMap } from "~game/importers/tiled/TiledMap";

/**
 * Map display state
 */
export class MapState extends BaseState {
    
    /**
     * Constructor
     * @param game - Game instance 
     */
    public constructor(game: Game) {
        super(game);
    }

    /**
     * Load the map on entry
     */
    public enter() {
        const map: TiledMap = ObjectFactory.createMapFrom(Constants.MAP_CASTLE)
        map.scale.set(0.1);
        console.log(map.localWidth);
        this.game.world.setBounds(map.x, map.y, map.width, map.height);
        this.game.world.addChild(map);
    }

    /**
     * Exit callback
     */
    public exit() {

    }

    /**
     * Update callback
     */
    public update() {
        this.game.camera.modifyPosition(1, 0.1);
    }
}