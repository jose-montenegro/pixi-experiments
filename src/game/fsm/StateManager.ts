import { BaseState } from './BaseState';
import { Game } from '../Game';

/**
 * Class that manages game states
 */
export class StateManager {

    /**
     * State we are currently in
     */
    private _currentState: BaseState = null;

    /**
     * Available states
     */
    private readonly _states: Map<string, BaseState> = new Map<string, BaseState>();

    /**
     * The game instance
     */
    private readonly _game: Game;
    public get game(): Game {
        return this._game
    }

    /**
     * Constructor
     * @param game - The game instance 
     */
    public constructor(game: Game) {
        this._game = game;
    }

    /**
     * Change to another state
     * @param key - Key of the state to change to
     */
    public changeTo(key: string): void {
        if (!this._states.has(key)) {
            console.log(`MISSING STATE '${key}'`);
            return;
        }

        if (this._currentState) {
            this._currentState.exit();
        }
        this._currentState = this._states.get(key);
        this._currentState.enter();
    }

    /**
     * Add a state to the manager
     * @param key - State key
     * @param state - State instance
     */
    public add(key: string, state: BaseState) {
        this._states.set(key, state);
    }

    /**
     * Update the current state
     * @param deltaTime - Time delta
     */
    public update(deltaTime: number): void {
        if (this._currentState) {
            this._currentState.update(deltaTime);
        }
    }
}