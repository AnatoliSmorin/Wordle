import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { GuessWordComponent } from '../Guess Word/Guess Word.component';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HostBinding } from '@angular/core';
import { GridStyleService } from '../../../Services/Grid Style.service';

@Component({
    selector: 'app-guess-matrix',
    standalone: true,
    imports: [
        CommonModule,
        GuessWordComponent
    ],
    templateUrl: './Guess Matrix.component.html',
    styleUrl: './Guess Matrix.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuessMatrixComponent {

    @HostBinding('style.height.px') get Height() {
        let output:number = 0;
        this._grid.trackSize$.subscribe(v => output = 6 * v);
        if(output >= 420){ return 420; }
        else if(output <= 360){ return 360; }
        else { return output; }
    }
    @HostBinding('style.width.px') get Width() {
        let output:number = 0;
        this._grid.trackSize$.subscribe(v => output = 5 * v);
        if(output >= 350){ return 350; }
        else if(output <= 300){ return 300; }
        else { return output; }
    }
    constructor(private _grid:GridStyleService){}
}
