import { Component } from "~game/framework/components/Component";

export class BoxCollider extends Component {
    private _bounds: PIXI.Rectangle;
    public get bounds(): PIXI.Rectangle {
        return this._bounds;
    }

    public setBounds(x: number, y: number, width: number, height: number) {
        this._bounds = new PIXI.Rectangle(x, y, width, height);
    }
}