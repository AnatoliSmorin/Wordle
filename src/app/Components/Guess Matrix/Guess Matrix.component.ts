import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GuessWordComponent } from '../Guess Word/Guess Word.component';
import { GuessWord } from '../../Interfaces/Guess Word';
import { GuessDataService } from '../../Services/GuessData.service';

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
    // TODO: create service to hold guessword as observable
    guesses:GuessWord[] = this._data.guesses();
    constructor(private _data:GuessDataService){}
 }
