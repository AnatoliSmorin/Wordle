import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GuessLetterComponent } from '../Guess Tile/Guess Tile.component';
import { GuessMatrixComponent } from '../Guess Matrix/Guess Matrix.component';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Observable, ObservableInput, filter, map, mergeMap, pairwise, tap } from 'rxjs';
import { WordStatus } from '../../Enums/Word Status'
import { GuessService } from '../../Services/Guess.service';


@Component({
    selector: 'app-guess-word',
    standalone: true,
    imports: [
        CommonModule,
        GuessLetterComponent,
        GuessMatrixComponent
    ],
    templateUrl: './Guess Word.component.html',
    styleUrl: './Guess Word.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations:[
        trigger('wordValidityState',[
            state('empty',style({})),
            state('invalid',style({})),
            state('valid',style({})),
            transition('* => valid',[
                animate('2000ms', keyframes([
                    style({
                        opacity:'0',
                        backgroundColor: 'blue',
                        offset: 0.5
                    }),
                    style({
                        opacity:'0',
                        backgroundColor: 'blue',
                        offset: 1})
                ]))
            ]),
            transition('* => invalid',[
                style({
                    opacity:'0',
                    backgroundColor: 'blue',
                    offset: 0.5
                }),
                style({
                    opacity:'0',
                    backgroundColor: 'blue',
                    offset: 1})
            ])
        ])
    ],
})
export class GuessWordComponent {
    @Input() wordIndex!:number;

    validityState$:Observable<string> = this._service.wordStatus$.pipe(
        mergeMap<WordStatus[],ObservableInput<WordStatus>>(data =>
            data.filter((value, index) => index == this.wordIndex)),
        pairwise(),
        filter(value => value[0] != value[1]),
        tap(value => console.log(value[0] + " - " + value[1])),
        map(value => value[1] == 0 ? 'empty' : ( value[1] == 1 ? 'invalid' : 'valid')));

    /**
     *
     */
    constructor(private _service:GuessService) {
        
     }
 }
