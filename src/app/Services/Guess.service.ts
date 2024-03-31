import { Injectable } from '@angular/core';
import {GuessStatus} from '../Interfaces/Guess Status';
import { AnswerService } from './Answer.service';
import { Guess } from '../Interfaces/Guess';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageService } from './Message.service';
import { MessageStatus } from '../Interfaces/Message Status';

const WORD_LENGTH: number = 5;
const NUM_GUESSES: number = 6;

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
    if(this.letterCount < WORD_LENGTH)
    {
      this.updateLetter(input);
      this.letterCount++;
    }
  }

  // on backspace or delete
  public delete():void {
    if(this.letterCount > 0)
    {
      this.letterCount--;
      this.updateLetter('');
    }
  }

  // on enter key press
  public check():void {
    this._message.setMessage(MessageStatus.None);
    
    // player already successful - take no more actions
    if(this.letterCount < 0) {
      return;
    } 
    
    // word not complete
    if(this.letterCount < WORD_LENGTH) {
      console.log("check - incomplete")
      this._message.setMessage(MessageStatus.Incomplete);
      this._message.show();
      return;
    }
    
    // evaluate
    this.evaluateGuessWord();

    // correct
    if(this.isWordCorrect())
    {
      this.letterCount = -1;
      this._message.setMessage(MessageStatus.Success,this.wordCount);
      this._message.show();
      return;
    }

    // incorrect, out of guesses
    if(this.wordCount >= NUM_GUESSES)
    {
      this._message.setMessage(MessageStatus.Fail);
      this._message.show();
      return;
    }
    
    // incorrect, go to next guess word
    this.letterCount = 0;
    this.wordCount++;
  }

  private isWordCorrect():boolean{
    return this._guesses.value.filter(value => 
      value.Status == GuessStatus.RightLetterRightPlace && 
      value.Word == this.wordCount).length == WORD_LENGTH;
  }

  private updateLetter(input:string):void{
    // create new Guess object
    let newGuess:Guess = {
      LetterIndex: this.letterCount,
      Word: this.wordCount,
      Character: input,
      Status: GuessStatus.NotGuessed
    };

    // update Observable with new object
    this._guesses.next(
      this._guesses.value.map<Guess>((value,index) => 
        index == this.getIndex(this.wordCount , this.letterCount) ? newGuess : value));
  }

  private evaluateGuessWord():void{
    // create new Guess object
    let newValues:Guess[] = this._guesses.value.filter(value =>
      value.Word == this.wordCount
    ).map<Guess>(value =>
      {
        return {
          LetterIndex: value.LetterIndex,
          Word: value.Word,
          Character: value.Character,
          Status: this._answer.check(value)
        }
      }
    );

    // update observable
    let precedingWords:Guess[] = this._guesses.value.filter(value => value.Word < this.wordCount);
    let subsequentWords:Guess[] = this._guesses.value.filter(value => value.Word > this.wordCount);
    this._guesses.next(precedingWords.concat(newValues).concat(subsequentWords));
  }

  private getIndex(word:number, letter:number):number{
    return WORD_LENGTH * word + letter;
  }

  constructor(private _answer:AnswerService, private _message:MessageService) 
  {
    let output:Guess[] = [];
    for(let wd = 0; wd < NUM_GUESSES; wd++) {
      for(let idx = 0; idx < WORD_LENGTH; idx++)
      {
        output.push({
          LetterIndex:idx,
          Word:wd,
          Character: '',
          Status: GuessStatus.NotGuessed
        });
      }
    }
    this._guesses.next(output);
  }
}