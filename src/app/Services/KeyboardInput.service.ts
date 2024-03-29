import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { GuessService } from './Guess.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyboardInputService {
  private _guessedLetters!:BehaviorSubject<string[]>;
  currentGuessedLetters$:Observable<string[]> = this._guessedLetters.asObservable();
  
  onKeyUp(input:string):void
  {
    if(RegExp(/[a-zA-Z]/).test(input) && input.length == 1)
    {
      input = input.substring(0,1).toUpperCase();
      this._data.add(input);
      let guesses:string[] = this._guessedLetters.value;
      if(!guesses.includes(input))
      {
        this._guessedLetters.next(guesses)
        console.log(guesses.join(", "));
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
  onEnter = () => this._data.check();

  constructor(private _data:GuessService){
    this._guessedLetters = new BehaviorSubject<string[]>([]);
  }
}
