import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LetterInputComponent } from '../Letter Input/Letter Input.component';

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
export class GuessWordComponent { }
