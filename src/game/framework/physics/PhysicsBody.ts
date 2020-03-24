import { Component } from "../components/Component";

export enum FaceDirection {
    NONE,
    UP,
    DOWN,
    LEFT,
    RIGHT
}

export class PhysicsBody extends Component {
    
    private _prevPosition: PIXI.Point;
    private _collider: PIXI.Rectangle;
    private _velocity: PIXI.Point;
    private _acceleration: PIXI.Point;
    private _allowGravity: boolean;
    private _localGravity: PIXI.Point;
    private _mass: number;
    private _speed: number;
    private _facing: FaceDirection;
    private _immovable: boolean;
    private _overlapX: number;
    private _overlapY: number;
    private _embedded: boolean;
    private _touching: Map<FaceDirection, boolean>;
    private _wasTouching: Map<FaceDirection, boolean>;
    private _currentScale: PIXI.Point;
    private _sourceWidth: number;
    private _sourceHeight: number;
    /**
     * Distance traveled since the last update
     */
    private _newVelocity: PIXI.Point;

    public get halfWidth(): number {
        return this._collider.width / 2;
    }

    public get halfHeight(): number {
        return this._collider.height / 2;
    }

    public get center(): PIXI.Point {
        return new PIXI.Point(this._gameObject.x + this.halfWidth, this._gameObject.y + this.halfHeight);
    }

    constructor() {
        super();
        this._velocity = new PIXI.Point(0, 0);
        this._collider = new PIXI.Rectangle(0, 0, 0, 0);
        this._acceleration = new PIXI.Point(0, 0);
        this._allowGravity = true;
        this._localGravity = new PIXI.Point(0, 0);
        this._mass = 1;
        this._speed = 0;
        this._facing = FaceDirection.NONE;
        this._immovable = false;
        this._overlapX = 0;
        this._overlapY = 0;
        this._embedded = false;
        
        this._touching = new Map<FaceDirection, boolean>();
        this._touching.set(FaceDirection.NONE, true);
        this._touching.set(FaceDirection.UP, false);
        this._touching.set(FaceDirection.DOWN, false);
        this._touching.set(FaceDirection.LEFT, false);
        this._touching.set(FaceDirection.RIGHT, false);

        this._wasTouching = new Map<FaceDirection, boolean>();
        this._wasTouching.set(FaceDirection.NONE, true);
        this._wasTouching.set(FaceDirection.UP, false);
        this._wasTouching.set(FaceDirection.DOWN, false);
        this._wasTouching.set(FaceDirection.LEFT, false);
        this._wasTouching.set(FaceDirection.RIGHT, false);

        this._currentScale = new PIXI.Point(1, 1);
    }

    public defineCollider(x: number, y: number, width: number, height: number){
        this._collider.x = x;
        this._collider.y = y;
        this._sourceWidth = width;
        this._sourceHeight = height;
    }

    public updateBounds() {
        const asx: number = this._gameObject.scale.x;
        const asy: number = this._gameObject.scale.y;

        if (asx !== this._currentScale.x || asy !== this._currentScale.y) {
            this._collider.width = this._sourceWidth * asx;
            this._collider.height = this._sourceHeight * asy;
        }
    }

    public stop() {
        this._velocity.set(0);
        this._acceleration.set(0);
        this._speed = 0;
    }

    public resetMovementValues(): void {
        this._wasTouching.forEach((value: boolean, key: FaceDirection) => {
            this._wasTouching.set(key, this._touching.get(key));
            this._touching.set(key, key === FaceDirection.NONE ? true : false);
        });
        this._overlapX = 0;
        this._overlapY = 0;
        this._embedded = false;

        this.updateBounds();

        this._prevPosition.set(this._collider.x + this._gameObject.position.x, this._collider.y + this._gameObject.position.y);
    }

    public computeVelocity(gravity: PIXI.Point, deltaTime: number): void {
        if (this._allowGravity) {
            this._velocity.x += (gravity.x + this._localGravity.x) * deltaTime;
            this._velocity.y += (gravity.y + this._localGravity.y) * deltaTime;
        }

        this._velocity.x = this._acceleration.x * deltaTime;
        this._velocity.y = this._acceleration.y * deltaTime;
    }

    public computePosition(deltaTime: number): void {
        this._gameObject.position.x += this._velocity.x * deltaTime;
        this._gameObject.position.y += this._velocity.y * deltaTime;
    }

    public update(): void {
    }    
    
    public init(): void {
    }
    
    public destroy(): void {
    }

}