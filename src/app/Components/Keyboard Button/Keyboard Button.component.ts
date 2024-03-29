import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { KeyboardMatrixComponent } from '../Keyboard Matrix/Keyboard Matrix.component';
import { KeyboardInputService } from '../../Services/KeyboardInput.service';
import { Observable, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { GuessService } from '../../Services/Guess.service';
import { GuessStatus } from '../../Interfaces/Guess Status';

@Component({
    selector: 'app-keyboard-button',
    standalone: true,
    imports: [
        CommonModule,KeyboardMatrixComponent,AsyncPipe
    ],
    templateUrl: './Keyboard Button.component.html',
    styleUrl: './Keyboard Button.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardButtonComponent {
    @Input() label!:string;
    @Input() largeKey:Boolean = false;
    private _keyStatusData:Observable<GuessStatus[]> = this._data.guesses$.pipe(
        map(data => data.filter(value => value.Character == this.label)),
        map(data => data.map(value => value.Status))
    );
    isRightPosition$:Observable<boolean> = this._keyStatusData.pipe(
        map(data => data.includes(GuessStatus.RightLetterRightPlace))
    );
    isRightLetter$:Observable<boolean> = this._keyStatusData.pipe(
        map(data => data.includes(GuessStatus.RightLetterWrongPlace))
    );
    isWrong$:Observable<boolean> = this._keyStatusData.pipe(
        map(data => data.includes(GuessStatus.Incorrect))
    );

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
    constructor(private _input:KeyboardInputService, private _data:GuessService){}
 }
