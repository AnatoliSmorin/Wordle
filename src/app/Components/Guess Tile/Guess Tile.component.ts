import { CommonModule, NgStyle } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input} from '@angular/core';
import { GuessWordComponent } from '../Guess Word/Guess Word.component';
import { GuessService } from '../../Services/Guess.service';
import { Guess } from '../../Interfaces/Guess';
import { Observable, ObservableInput, filter, map, mergeMap, pairwise } from 'rxjs';
import { AnimationService } from '../../Services/Animation.service';
import { AnimationPlayer, animate, state, style, transition, trigger } from '@angular/animations';


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
            transition('open => closed', [
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
    
                 



    // private _animationAddLetter!:AnimationPlayer;
    
    // animationDeleteLetter!:AnimationPlayer;
    // animationCorrectLetter!:AnimationPlayer;
    // animationCorrectPosition!:AnimationPlayer;
    // animationIncorrect!:AnimationPlayer;

    constructor(private _data:GuessService, private _animator:AnimationService, private _elRef:ElementRef){
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
