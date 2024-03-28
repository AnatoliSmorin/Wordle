import { Injectable, WritableSignal, signal, Signal } from '@angular/core';
import {GuessStatus} from '../Interfaces/Guess Status';
import { AnswerService } from './Answer.service';
import { GuessWord } from '../Interfaces/Guess Word';
import { GuessLetter } from '../Interfaces/Guess Letter';
import { GuessLetterComponent } from '../Components/Guess Letter/Guess Letter.component';

@Injectable({
  providedIn: 'root'
})
export class GuessService {
  private letterCount:number = 0;
  private wordCount:number = 0;
  
  private _data!:WritableSignal<string[]>;
  public get data():Signal<string[]>{
    return this._data.asReadonly();
  }
  public set data(input:string[]){
    this._data = signal(input);
    console.log('update');
  }

  // on valid letter keypress
  public add(input:string):void{
    if(this.letterCount <= 4)
    {
      this.setLetter(input.substring(0,1));
      this.letterCount++;
      console.log("add " + input + "("+ this.letterCount +")");
    }
  }
  // on enter key press
  public check():void {
    // debugging purposes - remove when not needed
    if(this.letterCount == 10)
    {
      return
    }

    if(this.letterCount < 5)
    {
      console.log("check: word not complete("+ this.letterCount +")")
      // word not complete
      return;
    }
    let isValid:boolean = true;
    for(let i = 0; i <= 4; i++)
    {
      let guessLetter:string = '';
      isValid = this._answer.check(guessLetter, i) == GuessStatus.RightLetterRightPlace;
    }

    if(isValid)
    {
      console.log("check: success("+ this.letterCount +")")
      // win
      this.letterCount = 10;
      return;
    } 
    if(this.wordCount > 5)
    {
      console.log("check: fail("+ this.letterCount +")")
      // lose
      return;
    }
    console.log("check: incorrect - next word("+ this.letterCount +")")
    // next word
    this.letterCount = 0;
    this.wordCount++;
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
      this.setLetter('');
      console.log("deleted letter ("+ this.letterCount +")");
      this.letterCount--;
    }
  }

  private setLetter(input:string):void{
    let idx:number = 5 * this.wordCount + this.letterCount;
    let output:string[] = this._data().map((value, index) => index == idx ? input : value);
    this._data.set(output);
    this.logData();
  }
  private logData()
  {
    console.log(this._data().join(", "));
  }

  constructor(private _answer:AnswerService) 
  {
    let output:string[] = [];
    for(let i = 0; i < 30; i++) {
      output.push((i % 10).toString());
    }
    this._data = signal(output);
  }
}
