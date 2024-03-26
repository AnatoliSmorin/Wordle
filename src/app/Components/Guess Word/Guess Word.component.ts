import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LetterInputComponent } from '../Letter Input/Letter Input.component';
import { GuessLetter } from '../../Interfaces/Guess Letter';

@Component({
    selector: 'app-guess-word',
    standalone: true,
    imports: [
        CommonModule,
        LetterInputComponent
    ],
    templateUrl: './Guess Word.component.html',
    styleUrl: './Guess Word.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuessWordComponent {
    // @Input() guess!:GuessWord;
    // letters:string[] = [''];
 }
