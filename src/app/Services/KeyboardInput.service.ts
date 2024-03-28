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
    }
  }
  onBackspace():void
  {
    this._data.delete();
  }
  onEnter():void
  {
    this._data.check();
  }
  constructor(private _data:GuessService){}
}
