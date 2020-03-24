import { GameObject } from "../gameObject/GameObject";
import { Game } from "~game/Game";

/**
 * Base class for components that attach to gameObjects
 */
export abstract class Component {
    protected _gameObject: GameObject;
    public get gameObject(): GameObject{
        return this._gameObject;
    }
    public set gameObject(gameObject: GameObject) {
        this._gameObject = gameObject;
    }

    public get game(): Game {
        return this._gameObject.game;
    }

    protected _enabled: boolean;
    public get enabled(): boolean {
        return this._enabled;
    }
    public set enabled(enabled: boolean) {
        this._enabled = enabled;
    }

    public update(): void {};
    public init(): void {};
    public destroy(): void {};
}