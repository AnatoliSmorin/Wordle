import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GuessWordComponent } from '../Guess Word/Guess Word.component';
import { GuessWord } from '../../Interfaces/Guess Word';

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

    guesses:GuessWord[] = new Array<GuessWord>();
 }
