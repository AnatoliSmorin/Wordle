import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-gears-icon',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './gears.component.svg',
  styleUrl: './gears.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GearsIcon {
  @Input() fillColor:string = "var(--text-color)"
 }
