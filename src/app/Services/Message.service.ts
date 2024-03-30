import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageStatus } from '../Interfaces/Message Status';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private _message:BehaviorSubject<string> = new BehaviorSubject<string>('');
  message$:Observable<string> = this._message.asObservable();
  private _visible:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  visible$:Observable<boolean> = this._visible.asObservable();

  setMessage(status:MessageStatus, index?:number):void{
    console.log("setMessage")
    switch(status){
      case MessageStatus.None:{
        this._message.next("");
        break;
      }
      case MessageStatus.Unrecognized:{
        this._message.next("unrecognized");
        break;
      }
      case MessageStatus.Incomplete:{
        this._message.next("incomplete");
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
    return "DOUBT";
  }
  private getSuccessMessage(index:number):string{
    switch(index){
      case 0:{
        return "fast";
      }
      case 1:{
        return "neat";
      }
      case 2:{
        return "average";
      }
      case 3:{
        return "friendly";
      }
      case 4:{
        return "good";
      }
      case 5:{
        return "good";
      }
    }
    throw new RangeError("Success message error: can only generate a success message for an index between 0 and 5.")
  }
  show():void{
    this._visible.next(true);
    console.log("show - visible");
    setTimeout(() => {
      this._visible.next(false);
      console.log("show - hidden")
    }, 1000);
  }
  

}
