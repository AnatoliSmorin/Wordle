import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KeyboardButtonComponent } from '../Keyboard Button/Keyboard Button.component';

@Component({
    selector: 'app-keyboard-matrix',
    standalone: true,
    imports: [
        CommonModule, KeyboardButtonComponent
    ],
    templateUrl: './Keyboard Matrix.component.html',
    styleUrl: './Keyboard Matrix.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardMatrixComponent {
    
}
