import { Injectable, WritableSignal, signal, Signal } from '@angular/core';
import {GuessStatus} from '../Interfaces/Guess Status';
import { AnswerService } from './Answer.service';
import { GuessLetter } from '../Interfaces/Guess Letter';

@Injectable({
  providedIn: 'root'
})
export class GuessService {
  private letterCount:number = 0;
  private wordCount:number = 0;
  
  private _data!:WritableSignal<GuessLetter[]>;
  public get data():Signal<GuessLetter[]>{
    return this._data.asReadonly();
  }
  public set data(input:GuessLetter[]){
    this._data = signal(input);
  }

  // on valid letter keypress
  public add(input:string):void{
    if(this.letterCount <= 4)
    {
      this.setLetter(input.substring(0,1));
      this.letterCount++;
    }
  }

  // on backspace or delete
  public delete():void {
    // debugging purposes - delete when not needed
    if(this.letterCount == 10)
    {
      return;
    }

    if(this.letterCount > 0)
    {
      this.letterCount--
      this.setLetter('');
    }
  }

  // on enter key press
  public check():void {
    console.log("check");
    if(this.letterCount == 10)
    {
      // player already successful - debugging purposes only - remove when not needed
      return
    }

    if(this.letterCount < 5)
    {
      // word not complete
      return;
    }

    let guessResults:GuessStatus[] = [];
    for(let i = 0; i <= 4; i++)
    {
      let guessLetter:string = this.data()[this.getIndex(this.wordCount, i)].guess;
      guessResults.push(this._answer.check(guessLetter, i));
    }
    this.setGuessValue(guessResults);
    if(this.isSuccess(guessResults))
    {
      // win
      this.letterCount = 10;
      return;
    } 
    if(this.wordCount > 5)
    {
      // lose
      return;
    }
    // next word
    this.letterCount = 0;
    this.wordCount++;
  }

  private isSuccess(input:GuessStatus[]):boolean{
    return input.filter(value => value == GuessStatus.RightLetterRightPlace).length == 5;
  }

  private setLetter(input:string):void{
    let idx:number = this.getIndex(this.wordCount, this.letterCount);
    let updatedValue:GuessLetter = {guess:input,value:GuessStatus.NotGuessed}
    let output:GuessLetter[] = this._data().map((value, index) => index == idx ? updatedValue : value);
    this._data.set(output);
  }

  private setGuessValue(input:GuessStatus[]):void{
    let wordStart:number = this.getIndex(this.wordCount, 0);
    let output:GuessLetter[] = this._data().map((value, index) => {
      if(index >= wordStart && index < wordStart + 5){
        return {guess: value.guess, value:input[index - wordStart]}
      }
      else {
        return value;
      }
    });
    this._data.set(output);
  }

  private getIndex(word:number, letter:number):number{
    return 5 * word + letter;
  }

  constructor(private _answer:AnswerService) 
  {
    let output:GuessLetter[] = [];
    for(let i = 0; i < 30; i++) {
      output.push({
        guess: ' ',
        value: GuessStatus.NotGuessed
      });
    }
    this._data = signal(output);
  }
}
