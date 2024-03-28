import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Signal} from '@angular/core';
import { GuessWordComponent } from '../Guess Word/Guess Word.component';
import { GuessService } from '../../Services/Guess.service';
import { GuessLetter } from '../../Interfaces/Guess Letter';
import { GuessWord } from '../../Interfaces/Guess Word';

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
    @Input() indexL!:number;
    @Input() indexW!:number;
    guesses:Signal<string> = this._data.dummy;

    constructor(private _data:GuessService){}
}
