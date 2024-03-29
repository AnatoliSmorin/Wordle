import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

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
    visible!:Observable<boolean>;
 }
