import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { GuessLetter } from '../../Interfaces/Guess Letter';
import { GuessWordComponent } from '../Guess Word/Guess Word.component';

@Component({
    selector: 'app-letter-input',
    standalone: true,
    imports: [
        CommonModule, GuessWordComponent
    ],
    templateUrl: './Letter Input.component.html',
    styleUrl: './Letter Input.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LetterInputComponent 
{
    @Input() letter!:GuessLetter;
    @Input() dummy:string = '*';
}
