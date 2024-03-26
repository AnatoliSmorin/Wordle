import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GuessMatrixComponent } from './Components/Guess Matrix/Guess Matrix.component';
import { KeyboardMatrixComponent } from './Components/Keyboard Matrix/Keyboard Matrix.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GuessMatrixComponent, KeyboardMatrixComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  host: {
    '(document: keyup.backspace)': 'onBackspace()',
    '(document: keyup.delete)': 'onBackspace()',
    '(document: keyup.enter)': 'onEnter()',
    '(document: keyup)': 'onKeyUp($event.key)',
  }
})
export class AppComponent {

  guess:string = "";

  @HostListener('keyup', ['$event.key'])
  onKeyUp(input:string):void
  {
    const re = new RegExp(/[a-z,A-Z]/);
    if(re.test(input) && input.length == 1)
    {
      this.guess += input.toUpperCase();
      console.log(input + " - " + this.guess);
    }
  }
  onBackspace():void
  {
    if(this.guess.length > 0)
    {
      this.guess = this.guess.substring(0, this.guess.length - 1);
      console.log("Backspace - " + this.guess);
    }
  }
  onEnter():void
  {
    console.log("Enter")
  }
  title = 'Wordle';
}
