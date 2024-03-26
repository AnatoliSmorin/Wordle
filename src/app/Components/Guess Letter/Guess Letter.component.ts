import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { GuessLetter } from '../../Interfaces/Guess Letter';
import { GuessWordComponent } from '../Guess Word/Guess Word.component';

@Component({
    selector: 'app-guess-letter',
    standalone: true,
    imports: [
        CommonModule, GuessWordComponent
    ],
    templateUrl: './Guess Letter.component.html',
    styleUrl: './Guess Letter.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuessLetterComponent 
{
    @Input() letter!:GuessLetter;
    @Input() dummy:string = '*';
}
