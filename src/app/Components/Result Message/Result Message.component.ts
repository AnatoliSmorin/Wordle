import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageService } from '../../Services/Message.service';

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

    constructor(private _message:MessageService){
        this.message = this._message.message$;
    }
 }
