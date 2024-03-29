import { Pipe, type PipeTransform } from '@angular/core';
import { KeyboardInputService } from '../Services/KeyboardInput.service';

@Pipe({
  name: 'appAlreadyPressed',
  standalone: true,
})
export class AlreadyPressedPipe implements PipeTransform {

  // this is currently inactive
  transform(value: string): boolean {
    console.log("press")
    return false;
  }
  constructor(private _input:KeyboardInputService){}
}
