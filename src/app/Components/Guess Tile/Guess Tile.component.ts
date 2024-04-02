import { CommonModule, NgStyle } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input} from '@angular/core';
import { GuessWordComponent } from '../Guess Word/Guess Word.component';
import { GuessService } from '../../Services/Guess.service';
import { Guess } from '../../Interfaces/Guess';
import { Observable, ObservableInput, filter, map, mergeMap, pairwise } from 'rxjs';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';


@Component({
    selector: 'app-guess-tile',
    standalone: true,
    imports: [
        CommonModule, GuessWordComponent, NgStyle
    ],
    templateUrl: './Guess Tile.component.html',
    styleUrl: './Guess Tile.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations:[
        trigger('letterAdded', [
            state('empty', style({
                borderColor: 'var(--dark-grey)'
            })),
            state('full', style ({
                borderColor: 'var(--border-filled)'
            })),
            transition('empty => full', [
                // TODO: ensure number is not initially visible
                // TODO: other tiles should not move - maybe switch to table?
                // TODO: will flex-grow solve our issue?
                animate('200ms', keyframes([
                    style({
                        opacity: '0',
                        borderColor: 'var(--border-filled)',
                        margin: '3px',
                        offset: 0.01
                    }),
                    style({
                        opacity: '1',
                        height: '62px',
                        width: '60px',
                        margin: '1px',
                        offset: 0.8
                    }),
                    style({
                        height: '60px',
                        width: '58px',
                        margin: '3px',
                        offset: 1
                    })
                ]))
            ]),
            transition('empty => full',[
                animate('200ms')
            ])
        ])
    ]
})
export class GuessLetterComponent
{
    @Input() tileIndex:number = 0;
    @Input() wordIndex:number = 0;

    guess$!:Observable<Guess>;
    isLetter$!:Observable<boolean>;

    constructor(private _data:GuessService, private _elRef:ElementRef){
        // this._animationAddLetter = this._animator.setAnimationAddLetter(this._elRef.nativeElement);
        this.guess$ = this._data.guesses$.pipe(
            mergeMap<Guess[],ObservableInput<Guess>>(data => 
                data.filter(value =>
                    value.LetterIndex == this.tileIndex &&
                    value.Word == this.wordIndex)));
        this.isLetter$ = this.guess$
            .pipe(
                pairwise(),
                filter( value => value[0].Character != value[1].Character),
                map(value => value[1]),
                map(value => RegExp(/[a-zA-Z]/).test(value.Character)));
    }
}
