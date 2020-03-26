import { BaseState } from "./BaseState";
import * as PIXI from 'pixi.js';
import 'pixi-sound';

export class PixiSoundState extends BaseState {

    public bgm: PIXI.sound.Sound;
    public voice1: PIXI.sound.Sound;
    public voice2: PIXI.sound.Sound;

    public update(deltaTime: number): void {

    }
    
    public enter(): void {
        this.bgm = this.game.resourceManager.getSound('bgm');
        this.voice1 = this.game.resourceManager.getSound('voice1');
        this.voice2 = this.game.resourceManager.getSound('voice2');

        this.voice1.play({
            complete: () => {
                this.voice2.play({
                    complete: () => {
                        this.bgm.play({
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
        this.bgm.destroy();
        this.voice1.destroy();
        this.voice2.destroy();
    }

}