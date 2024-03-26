import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { KeyboardMatrixComponent } from '../Keyboard Matrix/Keyboard Matrix.component';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'app-keyboard-button',
    standalone: true,
    imports: [
        CommonModule,KeyboardMatrixComponent, NgStyle
    ],
    templateUrl: './Keyboard Button.component.html',
    styleUrl: './Keyboard Button.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardButtonComponent {
    @Input() label!:string;
    @Input() largeKey:Boolean = false;


    onClick():void
    {
        console.log("click - " + this.label);
    }
 }
