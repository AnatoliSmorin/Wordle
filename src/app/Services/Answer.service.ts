import { Injectable } from '@angular/core';
import { GuessStatus } from '../Interfaces/Guess Status';

@Injectable({
  providedIn: 'root'
})

export class AnswerService {
  private answer:string = "DOUBT";
  check(value:string, index:number):GuessStatus
  {
    value = value.substring(0,1).toUpperCase();
    if(this.answer.charAt(index) == value)
    {
      return GuessStatus.RightLetterRightPlace;
    }
    if(this.answer.indexOf(value) >= 0)
    {
      return GuessStatus.RightLetterWrongPlace;
    }
    return GuessStatus.Incorrect;
  }

}
