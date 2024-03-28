import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { KeyboardMatrixComponent } from '../Keyboard Matrix/Keyboard Matrix.component';
import { KeyboardInputService } from '../../Services/KeyboardInput.service';
import { AlreadyPressedPipe } from '../../Pipes/alreadyPressed.pipe';

@Component({
    selector: 'app-keyboard-button',
    standalone: true,
    imports: [
        CommonModule,KeyboardMatrixComponent, AlreadyPressedPipe
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
        if(this.label.toUpperCase() == "ENTER") {
            this._input.onEnter();
        }
        else if(this.label.toUpperCase() == "DELETE") {
            this._input.onBackspace();
        }
        else {
            this._input.onKeyUp(this.label);
        }
    }
    constructor(private _input:KeyboardInputService){}
 }
