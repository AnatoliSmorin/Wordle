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
  @Input() fillColor:string = "#f8f8f8"
  @Input() height:number = 512;
  @Input() width:number = 512;

  strHeight:string = this.height + 'px';
  strWidth:string = this.width + 'px'; }
