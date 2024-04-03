import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BarsIcon } from '../../svg/bars/bars.component'
import { GearsIcon } from '../../svg/gears/gears.component'
import { QuestionIcon } from '../../svg/question/question.component'
import { RankingsIcon } from '../../svg/rankings/rankings.component'

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule, BarsIcon, GearsIcon, QuestionIcon, RankingsIcon
    ],
    templateUrl: './Header.component.html',
    styleUrl: './Header.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent { }
