import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-letter-input',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule
    ],
    templateUrl: './Letter Input.component.html',
    styleUrl: './Letter Input.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LetterInputComponent 
{
    letter:string = "";
    onChange():void
    {
        this.letter.toUpperCase();
        console.log(this.letter);        
    }
 }
