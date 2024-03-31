import { Injectable } from '@angular/core';
import { GuessStatus } from '../Interfaces/Guess Status';
import { Guess } from '../Interfaces/Guess';

@Injectable({
  providedIn: 'root'
})

export class AnswerService {
  private answer:string = "DOUBT";
  check(guess:Guess):GuessStatus
  {
    if(this.answer.charAt(guess.LetterIndex) == guess.Character)
    {
      return GuessStatus.RightLetterRightPlace;
    }
    if(this.answer.indexOf(guess.Character) >= 0)
    {
      return GuessStatus.RightLetterWrongPlace;
    }
    return GuessStatus.Incorrect;
  }
}
