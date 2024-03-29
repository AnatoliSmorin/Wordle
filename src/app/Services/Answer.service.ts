import { Injectable } from '@angular/core';
import { GuessStatus } from '../Interfaces/Guess Status';
import { Guess } from '../Interfaces/Guess';

@Injectable({
  providedIn: 'root'
})

export class AnswerService {
  private answer:string = "DOUBT";
  check(letter:Guess):GuessStatus
  {
    if(this.answer.charAt(letter.Index) == letter.Character)
    {
      return GuessStatus.RightLetterRightPlace;
    }
    if(this.answer.indexOf(letter.Character) >= 0)
    {
      return GuessStatus.RightLetterWrongPlace;
    }
    return GuessStatus.Incorrect;
  }
}
