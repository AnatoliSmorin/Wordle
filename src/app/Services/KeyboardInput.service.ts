import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { GuessService } from './Guess.service';

@Injectable({
  providedIn: 'root'
})
export class KeyboardInputService {
  private _guessedLetters:WritableSignal<string[]>;
  public get guessedLetters():Signal<string[]>{
    return this._guessedLetters.asReadonly();
  }
  private set guessedLetters(input:string[]){
    this._guessedLetters = signal(input);
  }
  onKeyUp(input:string):void
  {
    if(RegExp(/[a-zA-Z]/).test(input) && input.length == 1)
    {
      input = input.substring(0,1).toUpperCase();
      this._data.add(input);
      if(!this.guessedLetters().includes(input))
      {
        this.registerNewGuess(input);
        console.log(this._guessedLetters().join(", "));
      }
    }
  }
  onBackspace = () => this._data.delete();
  onEnter = () => this._data.check();
  private registerNewGuess(input:string):void
  {
    let newArray:string[] = this._guessedLetters();
    newArray.push(input);
    this._guessedLetters.set(newArray);
  }
  constructor(private _data:GuessService){
    this._guessedLetters = signal([]);
  }
}
