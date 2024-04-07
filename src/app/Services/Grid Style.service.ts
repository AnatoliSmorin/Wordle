import { HostListener, Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridStyleService {

  private _trackSize:BehaviorSubject<number> = new BehaviorSubject<number>(65);
  trackSize$ = this._trackSize.asObservable();
  containerHeight(htPixels:number){
    this._trackSize.next((htPixels - 282)/6);
  }
}
