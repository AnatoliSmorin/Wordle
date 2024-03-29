import { Pipe, type PipeTransform } from '@angular/core';
import { KeyboardInputService } from '../Services/KeyboardInput.service';

@Pipe({
  name: 'appAlreadyPressed',
  standalone: true,
})
export class AlreadyPressedPipe implements PipeTransform {

  transform(value: string): boolean {
    console.log("press")
    return this._input.guessedLetters().includes(value);
  }
  constructor(private _input:KeyboardInputService){}
}
