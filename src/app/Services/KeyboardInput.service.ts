import { Injectable } from '@angular/core';
import { GuessService } from './Guess.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyboardInputService {
  private _guessedLetters:BehaviorSubject<string[]>  = new BehaviorSubject<string[]>([]);
  currentGuessedLetters$:Observable<string[]> = this._guessedLetters.asObservable();
  private _currentGuesses:string[] = [];

  // NOTE: I should merge the "guessed lettes" observable into the "guesses" service
  onKeyUp(input:string):void
  {
    if(RegExp(/[a-zA-Z]/).test(input) && input.length == 1)
    {
      input = input.substring(0,1).toUpperCase();
      this._data.add(input);
      if(!this._guessedLetters.value.includes(input))
      {
        this._currentGuesses.push(input);
      }
    }
  }
  onBackspace() {
    let deletedCharacter:string = this._data.delete();
    let guesses:string[] = this._guessedLetters.value;
    if(guesses[guesses.length - 1] == deletedCharacter){
      guesses.pop();
      this._guessedLetters.next(guesses);
    }
  } 
  onEnter(){
    this._guessedLetters.next(this._currentGuesses)
    this._data.check();
  } 
  
  constructor(private _data:GuessService){
  }
}
