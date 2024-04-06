import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { KeyboardMatrixComponent } from '../Keyboard Matrix/Keyboard Matrix.component';
import { KeyboardInputService } from '../../../Services/KeyboardInput.service';
import { Observable, ObservableInput, map, mergeMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { GuessService } from '../../../Services/Guess.service';
import { GuessStatus } from '../../../Enums/Guess Status';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Guess } from '../../../Interfaces/Guess';

@Component({
    selector: 'app-keyboard-button',
    standalone: true,
    imports: [
        CommonModule,KeyboardMatrixComponent,AsyncPipe
    ],
    templateUrl: './Keyboard Button.component.html',
    styleUrl: './Keyboard Button.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        // TODO: implement dynamic delay
        trigger('guessEvaluated', [
            state('incorrect', style({backgroundColor: 'var(--dark-grey)'})),
            state('wrong-place', style({backgroundColor: 'var(--right-letter-color)'})),
            state('right-place', style({backgroundColor: 'var(--right-position-color)'})),
            transition('* => incorrect',[
                animate('10ms 800ms')
            ]),
            transition('* => wrong-place',[
                animate('10ms 800ms')
            ]),
            transition('* => right-place',[
                animate('10ms 800ms')
            ])
        ])
    ],
})
export class KeyboardButtonComponent {
    @Input() label!:string;
    @Input() largeKey:Boolean = false;
    
    keyState$:Observable<GuessStatus>;
    // TODO: should delay also be piped from observable?
    delay:number = 2000;

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

    constructor(private _input:KeyboardInputService, private _data:GuessService){
        this.keyState$ = this._data.guesses$.pipe(
            mergeMap<Guess[],ObservableInput<Guess>>(data =>
                data.filter(value => value.Character == this.label)),
            map(value => value.Status)
        )
    }
 }
