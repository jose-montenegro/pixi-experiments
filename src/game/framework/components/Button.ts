import * as PIXI from 'pixi.js';
import { Game } from '../../Game';
import { Signal } from './Signal';

export class Button extends PIXI.Container {
    public sprite: PIXI.Sprite;
    public idleTexture: PIXI.Texture;
    public hoverTexture: PIXI.Texture;
    public text: string;
    public game: Game;

    public onClick: Signal;

    constructor(game: Game, idleKey: string, hoverKey: string, text: string) {
        super();
        this.game = game;
        this.idleTexture = game.resourceManager.getTexture(idleKey);
        this.hoverTexture = game.resourceManager.getTexture(hoverKey);
        this.sprite = new PIXI.Sprite(this.idleTexture);
        this.text = text;
        this.onClick = new Signal();
    }
}