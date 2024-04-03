import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-bars-icon',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './bars.component.svg',
  styleUrl: './bars.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarsIcon {
  @Input() fillColor:string = "var(--text-color)"
 }
