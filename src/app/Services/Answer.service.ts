import { Injectable } from '@angular/core';
import { GuessStatus } from '../Enums/Guess Status';
import { Guess } from '../Interfaces/Guess';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const URLRoot:string = "http://localhost:5202/api/Values"
const SolutionURL:string = "/solution?length="
const ValidURL:string = "/valid?word="

@Injectable({
  providedIn: 'root'
})

export class AnswerService {
  private _answer!:string;
  wordIsValid(word:string):boolean{
    let thisURL = "http://localhost:5202/api/Values"+ ValidURL + word;
    let output:boolean = false;
    this._client.get<boolean>(thisURL).subscribe(v => output = v);
    return output;
  }
  check(guess:Guess):GuessStatus
  {
    let keyword:string;
    if(this._answer){
      keyword = this._answer;
    } else {
      keyword = 'DOUBT';
    }
    if(keyword.charAt(guess.LetterIndex) == guess.Character)
    {
      return GuessStatus.RightLetterRightPlace;
    }
    if(keyword.indexOf(guess.Character) >= 0)
    {
      return GuessStatus.RightLetterWrongPlace;
    }
    return GuessStatus.Incorrect;
  }
  giveUp():string{
    if(this._answer){
      return this._answer;
    }
    return 'DOUBT';
  }
  constructor(private _client:HttpClient){
    const headerData = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    this._client.get('http://localhost:5202/api/Values/solution?length=5',{responseType: 'text'}).subscribe(
      value => 
    {
      console.log(value)
      this._answer = value
    }
    );
  }
}
