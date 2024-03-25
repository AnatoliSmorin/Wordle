import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-letter-input',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './Letter Input.component.html',
    styleUrl: './Letter Input.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LetterInputComponent { }
