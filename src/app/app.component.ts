import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GuessMatrixComponent } from './Components/Guess Matrix/Guess Matrix.component';
import { KeyboardMatrixComponent } from './Components/Keyboard Matrix/Keyboard Matrix.component';
import { HeaderComponent } from './Components/Header/Header.component';
import { KeyboardInputService } from './Services/KeyboardInput.service';
import { ResultMessageComponent } from './Components/Result Message/Result Message.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageService } from './Services/Message.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GuessMatrixComponent, KeyboardMatrixComponent, HeaderComponent,ResultMessageComponent],
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
  @HostListener('keyup', ['$event.key'])
  onKeyUp = (input:string) => this._input.onKeyUp(input);
  onBackspace = () => this._input.onBackspace();
  onEnter = () => this._input.onEnter();
  showMessage!:Observable<boolean>;
  title = 'Wordle';
  constructor(private _input:KeyboardInputService, private _message:MessageService){
    this.showMessage = this._message.visible$;
  }
}
