import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-keyboard-button',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './Keyboard Button.component.html',
    styleUrl: './Keyboard Button.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardButtonComponent {
    @Input() label:string|undefined;
    onClick():void
    {
        console.log("click - " + this.label);
    }
 }
