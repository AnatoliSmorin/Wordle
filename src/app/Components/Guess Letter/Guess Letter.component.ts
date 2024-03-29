import { CommonModule, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Signal, WritableSignal, signal} from '@angular/core';
import { GuessWordComponent } from '../Guess Word/Guess Word.component';
import { GuessService } from '../../Services/Guess.service';
import { Guess } from '../../Interfaces/Guess';
import { Observable, ObservableInput, elementAt, filter, first, map, mergeMap } from 'rxjs';


@Component({
    selector: 'app-guess-letter',
    standalone: true,
    imports: [
        CommonModule, GuessWordComponent, NgStyle
    ],
    templateUrl: './Guess Letter.component.html',
    styleUrl: './Guess Letter.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuessLetterComponent 
{
    @Input() indexL:number = 0;
    @Input() indexW:number = 0;
    dummy$:Observable<Guess[]> = this._data.guesses$.pipe(
        map(data => data.filter(value =>
            value.Index == this.indexL &&
            value.Word == this.indexW
            ))
    );
    guess$:Observable<Guess> = this._data.guesses$.pipe(
        mergeMap<Guess[],ObservableInput<Guess>>(data => 
            data.filter(value =>
                value.Index == this.indexL &&
                value.Word == this.indexW
            )));

    constructor(private _data:GuessService){}
}
