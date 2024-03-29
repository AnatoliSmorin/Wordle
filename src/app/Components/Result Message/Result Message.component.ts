import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    selector: 'app-result-message',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './Result Message.component.html',
    styleUrl: './Result Message.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultMessageComponent 
{
    message!:Observable<string>;

    constructor(){
        this.message = new BehaviorSubject('A screaming comes across the sky').asObservable();
    }
 }
