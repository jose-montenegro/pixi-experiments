import { BaseState } from "./BaseState";

export class EmptyState extends BaseState {

    public update(deltaTime: number): void {

    }
    
    public enter(): void {
        console.log("Got into an empty state");
    }

    public exit(): void {

    }

}