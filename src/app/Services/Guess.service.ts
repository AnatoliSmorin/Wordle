import { Injectable } from '@angular/core';
import {GuessStatus} from '../Enums/Guess Status';
import { AnswerService } from './Answer.service';
import { Guess } from '../Interfaces/Guess';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageService } from './Message.service';
import { MessageStatus } from '../Enums/Message Status';
import { WordStatus } from '../Enums/Word Status';

const WORD_LENGTH: number = 5;
const NUM_GUESSES: number = 6;
const SUCCESS_VALUE: number = -1;

@Injectable({
  providedIn: 'root'
})

export class GuessService {
  private letterCount:number = 0;
  private wordCount:number = 0;

  private _guesses:BehaviorSubject<Guess[]>  = new BehaviorSubject<Guess[]>([]);
  guesses$:Observable<Guess[]> = this._guesses.asObservable();

  private _wordStatus:BehaviorSubject<WordStatus[]> = new BehaviorSubject<WordStatus[]>([]);
  wordStatus$:Observable<WordStatus[]> = this._wordStatus.asObservable();

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
    console.log('check');
    this._message.setMessage(MessageStatus.None);

    // player already successful - take no more actions
    if(this.letterCount == SUCCESS_VALUE) {
      return;
    } 
    
    // word not complete
    if(this.letterCount < WORD_LENGTH) {
      this.updateWordStatus(WordStatus.Invalid);
      // TODO: move message actions from service to component animation
      this._message.setMessage(MessageStatus.Incomplete);
      this._message.show();
      return;
    } 
    
    // evaluate
    this.evaluateGuessWord();

    // correct
    if(this.isWordCorrect())
    {
      this.letterCount = SUCCESS_VALUE;
      this.updateWordStatus(WordStatus.Correct);
      this._message.setMessage(MessageStatus.Success,this.wordCount);
      this._message.show();
      return;
    }

    // if all the guesses have been used, then display fail message
    // otherwise, set word status to valid
    if(this.wordCount >= NUM_GUESSES)
    {
      this._message.setMessage(MessageStatus.Fail);
      this._message.show();
      return;
    } else {
      this.updateWordStatus(WordStatus.Valid);
    }
    
    // incorrect, go to next guess word
    this.letterCount = 0;
    this.wordCount++;
  }

  private isWordCorrect():boolean{
    let correctLetters:number = this._guesses.value.filter(value => 
      value.Status == GuessStatus.RightLetterRightPlace && 
      value.Word == this.wordCount).length;
    return correctLetters == WORD_LENGTH;
  }

  private updateLetter(input:string):void{
    // clear word validity
    this.updateWordStatus(WordStatus.Empty);
    console.log('update-guess')
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
    console.log('update-guess');
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

  private updateWordStatus(newValue:WordStatus):void{
    let output:WordStatus[] = [];
    let segmentA:WordStatus[] = this._wordStatus.value.slice(0, this.wordCount);
    let segmentB:WordStatus[] = this._wordStatus.value.slice(this.wordCount + 1, NUM_GUESSES - 1); 
    if(this.wordCount != 0){
      output = output.concat(segmentA);
    }
    output.push(newValue);
    if(this.wordCount != NUM_GUESSES - 1){
      output = output.concat(segmentB);
    } 
    this._wordStatus.next(output);
  }

  constructor(private _answer:AnswerService, private _message:MessageService) 
  {
    // create guess array observable
    let initialGuessStatus:Guess[] = [];
    for(let wd = 0; wd < NUM_GUESSES; wd++) {
      for(let idx = 0; idx < WORD_LENGTH; idx++)
      {
        initialGuessStatus.push({
          LetterIndex:idx,
          Word:wd,
          Character: '',
          Status: GuessStatus.NotGuessed
        });
      }
    }
    this._guesses.next(initialGuessStatus);

    // create word status observable
    let initialWordStatus:WordStatus[] = [];
    for(let gs = 0; gs < NUM_GUESSES; gs++) {
      initialWordStatus.push(
        WordStatus.Empty
      )
    }
    this._wordStatus.next(initialWordStatus);
  }
}