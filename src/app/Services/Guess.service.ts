import { Injectable } from '@angular/core';
import {GuessStatus} from '../Interfaces/Guess Status';
import { AnswerService } from './Answer.service';
import { Guess } from '../Interfaces/Guess';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageService } from './Message.service';
import { MessageStatus } from '../Interfaces/Message Status';

@Injectable({
  providedIn: 'root'
})
export class GuessService {
  private letterCount:number = 0;
  private wordCount:number = 0;

  private _guesses:BehaviorSubject<Guess[]>  = new BehaviorSubject<Guess[]>([]);
  guesses$:Observable<Guess[]> = this._guesses.asObservable();

  // on valid letter keypress
  public add(input:string):void{
    if(this.letterCount <= 4)
    {
      this.updateLetter(input);
      this.letterCount++;
    }
  }

  // on backspace or delete
  public delete():void {
    // the second condition is just for debugging. no need to keep it.
    if(this.letterCount > 0 && this.letterCount != 10)
    {
      this.letterCount--;
      this.updateLetter('');
    }
  }

  // on enter key press
  public check():void {
    console.log("check: " + this.wordCount);
    this._message.setMessage(MessageStatus.None);
    if(this.letterCount == 10)
    {
      // player already successful - debugging purposes only - remove when not needed
      return
    }
    
    if(this.letterCount < 5)
    {
      console.log("check - incomplete")
      this._message.setMessage(MessageStatus.Incomplete);
      // word not complete
      this._message.show();
      return;
    }
    
    this.updateGuessStatus();
    if(this.isSuccess())
    {
      // win
      this._message.setMessage(MessageStatus.Success,this.wordCount);
      this.letterCount = 10;
      this._message.show();
      return;
    } 
    if(this.wordCount > 5)
    {
      // lose
      this._message.setMessage(MessageStatus.Fail);
      this._message.show();
      return;
    }
    // next word
    this.letterCount = 0;
    this.wordCount++;
  }

  private isSuccess():boolean{
    return this._guesses.value.filter(value => 
      value.Status == GuessStatus.RightLetterRightPlace && 
      value.Word == this.wordCount).length == 5;
  }

  private updateLetter(input:string):void{
    let newGuess:Guess = {
      Index: this.letterCount,
      Word: this.wordCount,
      Character: input,
      Status: GuessStatus.NotGuessed
    };
    this._guesses.next(
      this._guesses.value.map<Guess>((value,index) => 
        index == this.getIndex(this.wordCount , this.letterCount) ? newGuess : value));
  }

  private updateGuessStatus():void{
    let newValues:Guess[] = this._guesses.value.filter(value =>
      value.Word == this.wordCount
    ).map<Guess>((value,index) =>
      {
        return {
          Index: value.Index,
          Word: value.Word,
          Character: value.Character,
          Status: this._answer.check(value)
        }
      }
    );
    let precedingWords:Guess[] = this._guesses.value.filter(value => value.Word < this.wordCount);
    let subsequentWords:Guess[] = this._guesses.value.filter(value => value.Word > this.wordCount);
    this._guesses.next(precedingWords.concat(newValues).concat(subsequentWords));
  }

  private getIndex(word:number, letter:number):number{
    return 5 * word + letter;
  }

  constructor(private _answer:AnswerService, private _message:MessageService) 
  {
    let output:Guess[] = [];
    for(let wd = 0; wd < 6; wd++) {
      for(let idx = 0; idx < 5; idx++)
      {
        output.push({
          Index:idx,
          Word:wd,
          Character: '',
          Status: GuessStatus.NotGuessed
        });
      }
    }
    this._guesses.next(output);
  }
}
