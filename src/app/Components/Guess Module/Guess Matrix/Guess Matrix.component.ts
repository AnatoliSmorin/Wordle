import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { GuessWordComponent } from '../Guess Word/Guess Word.component';
import { BehaviorSubject, Observable, ObservableInput, filter, map, mergeMap, pairwise, tap } from 'rxjs';
import { HostBinding } from '@angular/core';
import { GridStyleService } from '../../../Services/Grid Style.service';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { WordStatus } from '../../../Enums/Word Status';
import { GuessService } from '../../../Services/Guess.service';
import { ValidityStatePipe } from '../../../Pipe/ValidityState.pipe';

@Component({
    selector: 'app-guess-matrix',
    standalone: true,
    imports: [
        CommonModule,
        GuessWordComponent,
        ValidityStatePipe
    ],
    templateUrl: './Guess Matrix.component.html',
    styleUrl: './Guess Matrix.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations:[
        trigger('onInvalidWord',[
            state('invalid',style({})),
            transition('* => invalid',[
                animate('200ms', keyframes([
                    style({
                        transform: 'translateX(10px)',
                        offset: 0.1
                    }),
                    style({
                        transform: 'translateX(-10px)',
                        offset: 0.2
                    }),
                    style({
                        transform: 'translateX(10px)',
                        offset: 0.3
                    }),
                    style({
                        transform: 'translateX(-10px)',
                        offset: 0.4
                    }),
                    style({
                        transform: 'translateX(10px)',
                        offset: 0.5
                    }),
                    style({
                        transform: 'translateX(-10px)',
                        offset: 0.6
                    }),
                    style({
                        transform: 'translateX(10px)',
                        offset: 0.7
                    }),
                    style({
                        transform: 'translateX(-10px)',
                        offset: 0.8
                    }),
                    style({
                        transform: 'translateX(10px)',
                        offset: 0.9
                    }),
                    style({
                        transform: 'translateX(-10px)',
                        offset: 1
                    })
                ]))
            ])
        ])
    ]
})
export class GuessMatrixComponent {

    @HostBinding('style.height.px') get Height() {
        let output:number = 0;
        this._grid.trackSize$.subscribe(v => output = 6 * v);
        if(output >= 420){ return 420; }
        // else if(output <= 360){ return 360; }
        else { return output; }
    }
    @HostBinding('style.width.px') get Width() {
        let output:number = 0;
        this._grid.trackSize$.subscribe(v => output = 5 * v);
        if(output >= 350){ return 350; }
        // else if(output <= 300){ return 300; }
        else { return output; }
    }
    ValidityState$:Observable<string[]> = this._service.wordStatus$.pipe(
            // mergeMap<WordStatus[],ObservableInput<WordStatus>>(data =>
            //     data.filter((value, index) => index == input)),
            pairwise(),
            filter(value => value[0] != value[1]),
            map(value => value[1])
        );
    constructor(private _grid:GridStyleService, private _service:GuessService){}
}
