import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageStatus } from '../Enums/Message Status';
import { AnswerService } from './Answer.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private _message:BehaviorSubject<string> = new BehaviorSubject<string>('');
  message$:Observable<string> = this._message.asObservable();
  private _visible:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  visible$:Observable<boolean> = this._visible.asObservable();

  setMessage(status:MessageStatus, index?:number):void{
    switch(status){
      case MessageStatus.None:{
        this._message.next("");
        break;
      }
      case MessageStatus.Unrecognized:{
        this._message.next("Not in word list");
        break;
      }
      case MessageStatus.Incomplete:{
        this._message.next("Not enough letters");
        break;
      }
      case MessageStatus.Success:{
        if (index == undefined){
          throw new TypeError("Invalid index value: could not generate message because index value was not defined.")
        }
        this._message.next(this.getSuccessMessage(index));
        break;
      }
      case MessageStatus.Fail:{
        this._message.next(this.getFailMessage());
        break;
      }
    }
  }
  private getFailMessage():string{
    return this._answer.giveUp();
  }
  private getSuccessMessage(index:number):string{
    switch(index){
      case 0:{
        return "Genius";
      }
      case 1:{
        return "Magnificent";
      }
      case 2:{
        return "Impressive";
      }
      case 3:{
        return "Splendid";
      }
      case 4:{
        return "Great";
      }
      case 5:{
        return "Phew";
      }
    }
    throw new RangeError("Success message error: can only generate a success message for an index between 0 and 5.")
  }
  show():void{
    this._visible.next(true);
    setTimeout(() => {
      this._visible.next(false);
    }, 1000);
  }
  
  constructor(private _answer:AnswerService){}
}
