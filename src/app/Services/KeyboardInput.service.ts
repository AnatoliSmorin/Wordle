import { Injectable } from '@angular/core';
import { GuessService } from './Guess.service';

@Injectable({
  providedIn: 'root'
})
export class KeyboardInputService {

  dummy:string = "";
  onKeyUp(input:string):void
  {
    if(RegExp(/[a-zA-Z]/).test(input) && input.length == 1)
    {
      this._data.add(input.substring(0,1).toUpperCase());

      // debug trace - to be deleted
      // this.dummy += input;
      // console.log(input + " - " + this.dummy);
    }
  }
  onBackspace():void
  {
    this._data.delete();

    // debug trace - to be deleted
    // if(this.dummy.length > 0)
    // {
    //   this.dummy = this.dummy.substring(0, this.dummy.length - 1);
    //   console.log("Backspace - " + this.dummy);
    // }
  }
  onEnter():void
  {
    this._data.check();

    // debug trace - to be deleted
    // console.log("Enter");
  }
  constructor(private _data:GuessService){}
}
