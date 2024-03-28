import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GuessLetterComponent } from '../Guess Letter/Guess Letter.component';
import { GuessLetter } from '../../Interfaces/Guess Letter';
import { GuessMatrixComponent } from '../Guess Matrix/Guess Matrix.component';
import { GuessWord } from '../../Interfaces/Guess Word';

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
})
export class GuessWordComponent {
    @Input() guess!:GuessWord;

    @Input() indexW!:number;
 }
