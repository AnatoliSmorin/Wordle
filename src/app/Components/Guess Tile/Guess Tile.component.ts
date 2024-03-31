import { CommonModule, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { GuessWordComponent } from '../Guess Word/Guess Word.component';
import { GuessService } from '../../Services/Guess.service';
import { Guess } from '../../Interfaces/Guess';
import { Observable, ObservableInput, map, mergeMap } from 'rxjs';


@Component({
    selector: 'app-guess-tile',
    standalone: true,
    imports: [
        CommonModule, GuessWordComponent, NgStyle
    ],
    templateUrl: './Guess Tile.component.html',
    styleUrl: './Guess Tile.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuessLetterComponent 
{
    @Input() tileIndex:number = 0;
    @Input() wordIndex:number = 0;
    dummy$:Observable<Guess[]> = this._data.guesses$.pipe(
        map(data => data.filter(value =>
            value.LetterIndex == this.tileIndex &&
            value.Word == this.wordIndex
            ))
    );
    guess$:Observable<Guess> = this._data.guesses$.pipe(
        mergeMap<Guess[],ObservableInput<Guess>>(data => 
            data.filter(value =>
                value.LetterIndex == this.tileIndex &&
                value.Word == this.wordIndex
            )));

    constructor(private _data:GuessService){}
}
