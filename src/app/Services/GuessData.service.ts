import { Injectable, WritableSignal, signal, Signal } from '@angular/core';
import { GuessWord } from '../Interfaces/Guess Word';
import {GuessStatus} from '../Interfaces/Guess Status';
import { AnswerService } from './Answer.service';
import { GuessLetter } from '../Interfaces/Guess Letter';
import { GuessLetterComponent } from '../Components/Guess Letter/Guess Letter.component';

@Injectable({
  providedIn: 'root'
})
export class GuessDataService {
  private letterCount:number = 0;
  private wordCount:number = 0;
  
  private _guesses:WritableSignal<GuessWord[]>;
  public get guesses(): Signal<GuessWord[]>
  {
    return this._guesses.asReadonly();
  }

  // on valid letter keypress
  public add(input:string):void{
    if(this.letterCount <= 4)
    {
      input = input.substring(0,1);
      this._guesses()[this.wordCount].Letters[this.letterCount].guess = input;
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
    let guessWord:GuessWord = this._guesses()[this.wordCount]
    for(let i = 0; i <= 4; i++)
    {
      let guessLetter:GuessLetter = guessWord.Letters[i];
      guessLetter.value = this._answer.check(guessLetter.guess, i);
      guessWord.IsValid = guessLetter.value == GuessStatus.RightLetterRightPlace;
    }
    if(guessWord.IsValid)
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
      console.log("deleted letter ("+ this.letterCount +")");
      this._guesses()[this.wordCount].Letters[this.letterCount].guess = '';
      this._guesses()[this.wordCount].Letters[this.letterCount].value = GuessStatus.NotGuessed;
      this.letterCount--;
    }
  }
  constructor(private _answer:AnswerService) 
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
