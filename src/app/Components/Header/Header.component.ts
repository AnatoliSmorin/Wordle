import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './Header.component.html',
    styleUrl: './Header.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent { }
