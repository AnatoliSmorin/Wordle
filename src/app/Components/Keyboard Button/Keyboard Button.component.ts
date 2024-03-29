import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { KeyboardMatrixComponent } from '../Keyboard Matrix/Keyboard Matrix.component';
import { KeyboardInputService } from '../../Services/KeyboardInput.service';
import { AlreadyPressedPipe } from '../../Pipes/alreadyPressed.pipe';
import { Observable, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-keyboard-button',
    standalone: true,
    imports: [
        CommonModule,KeyboardMatrixComponent, AlreadyPressedPipe
    ],
    templateUrl: './Keyboard Button.component.html',
    styleUrl: './Keyboard Button.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardButtonComponent {
    @Input() label!:string;
    @Input() largeKey:Boolean = false;
    isAlreadyGuessed$:Observable<boolean> = this._input.currentGuessedLetters$.pipe(map((data) => data.includes(this.label)));

    onClick():void
    {
        if(this.label.toUpperCase() == "ENTER") {
            this._input.onEnter();
        }
        else if(this.label.toUpperCase() == "DELETE") {
            this._input.onBackspace();
        }
        else {
            this._input.onKeyUp(this.label);
        }
    }
    constructor(private _input:KeyboardInputService){}
 }
