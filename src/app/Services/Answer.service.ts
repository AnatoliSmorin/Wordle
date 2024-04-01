import { Injectable } from '@angular/core';
import { GuessStatus } from '../Enums/Guess Status';
import { Guess } from '../Interfaces/Guess';

@Injectable({
  providedIn: 'root'
})

export class AnswerService {
  private _answer:string = "DOUBT";
  check(guess:Guess):GuessStatus
  {
    if(this._answer.charAt(guess.LetterIndex) == guess.Character)
    {
      return GuessStatus.RightLetterRightPlace;
    }
    if(this._answer.indexOf(guess.Character) >= 0)
    {
      return GuessStatus.RightLetterWrongPlace;
    }
    return GuessStatus.Incorrect;
  }
  giveUp():string{
    return this._answer.toUpperCase();
  }
}
