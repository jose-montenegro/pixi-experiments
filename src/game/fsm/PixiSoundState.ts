import { BaseState } from "./BaseState";
import * as PIXI from 'pixi.js';
import 'pixi-sound';

export class PixiSoundState extends BaseState {

    public update(deltaTime: number): void {

    }
    
    public enter(): void {
        const bgm: PIXI.sound.Sound = this.game.resourceManager.getSound('bgm');
        const voice1: PIXI.sound.Sound = this.game.resourceManager.getSound('voice1');
        const voice2: PIXI.sound.Sound = this.game.resourceManager.getSound('voice2');

        voice1.play({
            complete: () => {
                voice2.play({
                    complete: () => {
                        bgm.play({
                            complete: () => {
                                this.game.stateManager.changeTo('empty');
                            }
                        });
                    }
                });
            }
        });
    }

    public exit(): void {
        console.log(PIXI);
        PIXI.sound.remove('bgm');
        PIXI.sound.remove('voice1');
        PIXI.sound.remove('voice2');
    }

}