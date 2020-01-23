import { Game } from "~game/Game";

/**
 * Keyboard input manager
 */
export class KeyboardManager {

    private _game: Game;
    private _keys: Map<string, boolean>;

    constructor(game: Game) {
        this._game = game;
        this._keys = new Map<string, boolean>();
    }

    public init(): void {
        window.addEventListener("keydown", (event: KeyboardEvent) => {
            this.onKeyDown(event.key);
        });
        window.addEventListener("keyup", (event: KeyboardEvent) => {
            this.onKeyUp(event.key);
        });
    }

    public onKeyDown(key: string): void {
        this._keys.set(key, true);
    }

    public onKeyUp(key: string): void {
        this._keys.set(key, false);
    }

    public isDown(key: string): boolean {
        if (!this._keys.has(key)){
            return false;
        }
        return this._keys.get(key);
    }

    public isUp(key: string): boolean {
        if (!this._keys.has(key)){
            return true;
        }
        return !this._keys.get(key);
    }
}