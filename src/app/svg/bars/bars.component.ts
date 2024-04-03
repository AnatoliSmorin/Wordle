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
  @Input() fillColor:string = "#f8f8f8"
  @Input() height:number = 448;
  @Input() width:number = 512;

  strHeight:string = this.height + 'px';
  strWidth:string = this.width + 'px';
 }
