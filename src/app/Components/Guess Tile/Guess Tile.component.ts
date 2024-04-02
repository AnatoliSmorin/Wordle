import { CommonModule, NgStyle } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input} from '@angular/core';
import { GuessWordComponent } from '../Guess Word/Guess Word.component';
import { GuessService } from '../../Services/Guess.service';
import { Guess } from '../../Interfaces/Guess';
import { Observable, ObservableInput, every, filter, last, map, mergeMap, pairwise } from 'rxjs';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { GuessStatus } from '../../Enums/Guess Status';


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
                animate('200ms', keyframes([
                    style({
                        opacity: '0',
                        borderColor: 'var(--border-filled)',
                        offset: 0.01
                    }),
                    style({
                        opacity: '1',
                        transform: 'scale(1.1,1.1)',
                        offset: 0.8
                    }),
                    style({
                        transform: 'scale(1,1)',
                        offset: 1
                    })
                ]))
            ]),
            transition('full => empty',[
                animate('200ms')
            ])
        ]),
        trigger('guessEvaluated',[
            state('incorrect', style({
                    backgroundColor: 'var(--dark-grey)',
                    borderColor: 'var(--dark-grey)'
            })),
            state('wrong-place', style({
                backgroundColor: 'var(--right-letter-color)',
                borderColor: 'var(--right-letter-color)'
            })),
            state('right-place', style({
                backgroundColor: 'var(--right-position-color)',
                borderColor: 'var(--right-position-color)'
            })),
            transition('* => incorrect', 
            animate('200ms {{delay}}ms',
                keyframes([
                    style({
                        transform: 'scaleY(0%)',
                        backgroundColor: 'var(--background-color)',
                        borderColor: 'var(--dark-grey)',
                        offset:0.5
                    }),
                    style({
                        backgroundColor: 'var(--dark-grey)',
                        borderColor: 'var(--dark-grey)',
                        offset:0.51
                    }),
                    style({
                        transform: 'scaleY(100%)',
                        offset:1
                    })
            ]))
            ),
            transition('* => wrong-place', 
                animate('200ms {{delay}}ms',
                    keyframes([
                        style({
                            transform: 'scaleY(0%)',
                            backgroundColor: 'var(--background-color)',
                            borderColor: 'var(--dark-grey)',
                            offset:0.5
                        }),
                        style({
                            backgroundColor: 'var(--right-letter-color)',
                            borderColor: 'var(--right-letter-color)',
                            offset:0.51
                        }),
                        style({
                            transform: 'scaleY(100%)',
                            offset:1
                        })
                ]))
            ),
            transition('* => right-place', 
            animate('200ms {{delay}}ms',
                keyframes([
                    style({
                        transform: 'scaleY(0%)',
                        backgroundColor: 'var(--background-color)',
                        borderColor: 'var(--dark-grey)',
                        offset:0.5
                    }),
                    style({
                        backgroundColor: 'var(--right-position-color)',
                        borderColor: 'var(--right-position-color)',
                        offset:0.51
                    }),
                    style({
                        transform: 'scaleY(100%)',
                        offset:1
                    })
            ]))
        )
        ]),
        trigger('successfulGuess',[
            transition('false => true', 
            animate('200ms {{delay}}ms',
            keyframes([
                style({
                    transform: 'translateY(20px)',
                    offset: 0.25
                }),
                style({
                    transform: 'translateY(0)',
                    offset: 0.5
                }),
                style({
                    transform: 'translateY(10px)',
                    offset: 0.75
                }),
                style({
                    transform: 'translateY(0)',
                    offset: 1
                })
            ])))
        ])
    ]
})
export class GuessLetterComponent
{
    @Input() tileIndex:number = 0;
    @Input() wordIndex:number = 0;
    @Input() delay:number = 0;

    Guess$!:Observable<Guess>;
    isLetter$!:Observable<boolean>;
    isSuccess$!:Observable<boolean>;

    constructor(private _data:GuessService){
        const rootObs$ = this._data.guesses$.pipe(
            mergeMap<Guess[],ObservableInput<Guess>>(data => 
                data.filter(value => value.Word == this.wordIndex)));
        this.Guess$ = rootObs$.pipe(
            filter(value => value.LetterIndex == this.tileIndex))
        this.isLetter$ = this.Guess$.pipe(
                pairwise(),
                filter( value => value[0].Character != value[1].Character),
                map(value => value[1]),
                map(value => RegExp(/[a-zA-Z]/).test(value.Character)));
        this.isSuccess$ = rootObs$.pipe(
            every(value => value.Status == GuessStatus.RightLetterRightPlace));
    }
}
