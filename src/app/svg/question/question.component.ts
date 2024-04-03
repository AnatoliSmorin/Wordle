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
  @Input() fillColor:string = "var(--text-color)";
}
