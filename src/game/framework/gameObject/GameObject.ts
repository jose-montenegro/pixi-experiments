import * as PIXI from 'pixi.js';
import { Component } from '../components/Component';
import { ComponentConstructor } from '../components/ComponentConstructor'
import { Sprite } from '../components/Sprite';
import { Game } from '~game/Game';

/**
 * GameObject class
 */
export class GameObject extends PIXI.Container {
    private _components: Component[];

    private _children: GameObject[];

    private _game: Game;
    public get game(): Game {
        return this._game;
    }

    constructor(game: Game) {
        super();
        this._components = []
        this._children = []
        this._game = game;
    }

    public addComponent<T extends Component>(ctor: ComponentConstructor): T {
        const component: T = new ctor() as T;
        this._components.push(component);
        component.gameObject = this;
        component.init();
        return component;
    }

    public findComponent<T extends Component>(ctor: ComponentConstructor): T {
        for(let i: number = 0; i < this._components.length; ++i){
            if(this._components[i] instanceof ctor) {
                return this._components[i] as T;
            }
        }
        return null;
    }

    public addChildObject(child: GameObject): void {
        super.addChild(child);
        this.children.push(child);
    } 

    public destroy() {
        this._children.forEach((child: GameObject) => {
            child.destroy();
        });
        this._components.forEach((component: Component) => {
            component.destroy();
        });
    }

    public update() {
        this._components.forEach((component: Component) => {
            component.update();
        })
        this._children.forEach((child: GameObject) => {
            child.update();
        });
    }
}