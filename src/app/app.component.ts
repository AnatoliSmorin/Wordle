import { Component, ElementRef, HostListener, ViewChild, ViewChildren, viewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GuessMatrixComponent } from './Components/Guess Module/Guess Matrix/Guess Matrix.component';
import { KeyboardMatrixComponent } from './Components/Keyboard Module/Keyboard Matrix/Keyboard Matrix.component';
import { HeaderComponent } from './Components/Header/Header.component';
import { KeyboardInputService } from './Services/KeyboardInput.service';
import { ResultMessageComponent } from './Components/Result Message/Result Message.component';
import { Observable, map } from 'rxjs';
import { MessageService } from './Services/Message.service';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { GuessService } from './Services/Guess.service';
import { WordStatus } from './Enums/Word Status';
import { GridStyleService } from './Services/Grid Style.service';

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
    '(window:resize)': 'getScreenSize()'
  },
  animations:[
    trigger('onGuessCheck',[
        state('invalid', style({opacity:'0'})),
        state('correct', style({opacity:'1'})),
        transition('* => invalid', [
          animate('1s', keyframes([
            style({
              opacity:'1',
              offset:0.01
            }),
            style({
              opacity:'1',
              offset:0.99
            })
          ]))
        ]),
        transition('* => valid', [])
    ])
  ]
})
export class AppComponent {
  @ViewChild('gameContainer',{read: ElementRef}) container!:ElementRef;
  @HostListener('keyup', ['$event.key'])
  @HostListener('resize',['$event'])

  showMessage$!:Observable<WordStatus>;
  title = 'Wordle';

  onKeyUp(input:string){
      this._input.onKeyUp(input);
  }
  onBackspace = () => this._input.onBackspace();
  onEnter = () => this._input.onEnter();
  getScreenSize(){
    this._grid.containerHeight(this.container.nativeElement.clientHeight);
  }
  overflowToggle$:Observable<string> = this._grid.trackSize$.pipe(map(v => v > 30 ? 'hidden' : 'unset'));
  
  constructor(private _input:KeyboardInputService, private _message:MessageService, private _guesses:GuessService, private _grid:GridStyleService){
    this.showMessage$ = this._guesses.wordStatus$.pipe(
      map(data => data.filter(value => value != WordStatus.Empty && value != WordStatus.Valid)),
      map(data => data[data.length -1])
    );
  }
}
