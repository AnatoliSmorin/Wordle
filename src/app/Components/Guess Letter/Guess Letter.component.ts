import { CommonModule, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Signal, WritableSignal, signal} from '@angular/core';
import { GuessWordComponent } from '../Guess Word/Guess Word.component';
import { GuessService } from '../../Services/Guess.service';
import { GuessLetter } from '../../Interfaces/Guess Letter';
import { GuessWord } from '../../Interfaces/Guess Word';

@Component({
    selector: 'app-guess-letter',
    standalone: true,
    imports: [
        CommonModule, GuessWordComponent, NgStyle
    ],
    templateUrl: './Guess Letter.component.html',
    styleUrl: './Guess Letter.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuessLetterComponent 
{
    @Input() indexL:number = 0;
    @Input() indexW:number = 0;
    guess:Signal<string[]> = this._guess.data;

    constructor(private _guess:GuessService){}
}
