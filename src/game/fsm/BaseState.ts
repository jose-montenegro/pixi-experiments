import { Game } from "../Game";

/**
 * Base game state
 */
export abstract class BaseState {

    /**
     * Game instance
     */
    private readonly _game: Game;
    protected get game(): Game {
        return this._game;
    }

    /**
     * Constructor
     * @param game - The game instance 
     */
    public constructor(game: Game) {
        this._game = game;
    }

    /**
     * Gets called on every tick
     * @param deltaTime - The time delta
     */
    public abstract update(deltaTime: number): void;
    /**
     * Gets called when this state is entered
     */
    public abstract enter(): void;
    /**
     * Gets called when this state is exited
     */
    public abstract exit(): void;
}