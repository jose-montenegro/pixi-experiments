import { BaseState } from "./BaseState";
import { Howl, Howler } from 'howler';

export class HowlerSoundState extends BaseState {
    public update(deltaTime: number): void {
        
    }    
    
    public enter(): void {
        const bgm: Howl = new Howl({
            src: ['assets/audio/bgm.ogg'],
            autoplay: true,
            loop: false,
            volume: 1,
            onend: function() {
              this.game.stateManager.changeTo('empty');
            }
          });
    }

    public exit(): void {
        Howler.unload();
    }

}