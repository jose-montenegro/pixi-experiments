import { BaseState } from "./BaseState"
import { Game } from "../Game";
import { Constants } from "../Constants";
import { ObjectFactory } from "../framework/factories/ObjectFactory";
import { TiledMap } from "~game/importers/tiled/TiledMap";
import { KeyCode } from "../framework/input/KeyCode";

/**
 * Map display state
 */
export class MapState extends BaseState {

    private _speed: number = 60;
    
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
    public update(delta: number) {
        const right: boolean = this.game.keyboardManager.isDown(KeyCode.ARROW_RIGHT);
        const left: boolean = this.game.keyboardManager.isDown(KeyCode.ARROW_LEFT);
        const up: boolean = this.game.keyboardManager.isDown(KeyCode.ARROW_UP);
        const down: boolean = this.game.keyboardManager.isDown(KeyCode.ARROW_DOWN);


        const baseSpeed: number = this._speed * delta;
        const x: number = (right ? 1 : (left ? -1 : 0)) * baseSpeed;
        const y: number = (down ? 1 : (up ? -1 : 0)) * baseSpeed;

        this.game.camera.modifyPosition(x, y);
    }
}