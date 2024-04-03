import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-question-icon',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './question.component.svg',
  styleUrl: './question.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionIcon {
  @Input() fillColor:string = "#f8f8f8"
  @Input() height:number = 388;
  @Input() width:number = 388;

  strHeight:string = this.height + 'px';
  strWidth:string = this.width + 'px'; }
