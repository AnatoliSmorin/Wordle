import { Injectable } from '@angular/core';
import { GuessStatus } from '../Enums/Guess Status';
import { Guess } from '../Interfaces/Guess';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL:string = "http://localhost:5202/api/Values/solution?length=5"

@Injectable({
  providedIn: 'root'
})

export class AnswerService {
  private _answer!:string;
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
    return this._answer;
  }
  constructor(private _client:HttpClient){
    // this._client.get<string>(URL).subscribe(value => this._answer = value);
    this._answer = "DOUBT";
  }
}
