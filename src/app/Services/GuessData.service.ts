import { Injectable, WritableSignal, signal, Signal } from '@angular/core';
import { GuessWord } from '../Interfaces/Guess Word';
import {GuessStatus} from '../Interfaces/Guess Status';

@Injectable({
  providedIn: 'root'
})
export class GuessDataService {
  private _guesses:WritableSignal<GuessWord[]>;
  private letterCount:number = 0;
  private wordCount:number=0;
  public get guesses(): Signal<GuessWord[]>
  {
    return this._guesses.asReadonly();
  }
  public add(input:string):void{
    this._guesses()[this.wordCount].Letters[this.letterCount].guess = input.substring(0,1);
  }
  public check()
  {

  }
  public delete():void
  {
    if(this.wordCount > 0)
    {
      this._guesses()[this.wordCount].Letters[this.letterCount].guess = '';
      this._guesses()[this.wordCount].Letters[this.letterCount].value = GuessStatus.NotGuessed;
      this.wordCount--;
    }
  }
  constructor() 
  {
    this._guesses = signal(
      [{
        Letters : [
        {
          guess:'',
          value:GuessStatus.NotGuessed
        },
        {
          guess:'',
          value:GuessStatus.NotGuessed
        },
        {
          guess:'',
          value:GuessStatus.NotGuessed
        },
        {
          guess:'',
          value:GuessStatus.NotGuessed
        },
        {
          guess:'',
          value:GuessStatus.NotGuessed
        }
      ],
      IsValid:false
    },
    {
      Letters : [
      {
        guess:'',
        value:GuessStatus.NotGuessed
      },
      {
        guess:'',
        value:GuessStatus.NotGuessed
      },
      {
        guess:'',
        value:GuessStatus.NotGuessed
      },
      {
        guess:'',
        value:GuessStatus.NotGuessed
      },
      {
        guess:'',
        value:GuessStatus.NotGuessed
      }
      ],
      IsValid:false
    },
    {
      Letters : [
      {
        guess:'',
        value:GuessStatus.NotGuessed
      },
      {
        guess:'',
        value:GuessStatus.NotGuessed
      },
      {
        guess:'',
        value:GuessStatus.NotGuessed
      },
      {
        guess:'',
        value:GuessStatus.NotGuessed
      },
      {
        guess:'',
        value:GuessStatus.NotGuessed
      }
    ],
    IsValid:false
    }]);
  }
}
