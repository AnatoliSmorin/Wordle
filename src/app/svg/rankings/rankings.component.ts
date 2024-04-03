import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-rankings-icon',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './rankings.component.svg',
  styleUrl: './rankings.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RankingsIcon {
  @Input() fillColor:string = "var(--text-color)";
}
