import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from '@angular/core';
import { GuessLetterComponent } from '../Guess Tile/Guess Tile.component';
import { GuessMatrixComponent } from '../Guess Matrix/Guess Matrix.component';
import { AnimationBuilder, animate, sequence, style } from '@angular/animations';


@Component({
    selector: 'app-guess-word',
    standalone: true,
    imports: [
        CommonModule,
        GuessLetterComponent,
        GuessMatrixComponent
    ],
    templateUrl: './Guess Word.component.html',
    styleUrl: './Guess Word.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuessWordComponent {
    @Input() wordIndex!:number;

    @ViewChild("parent") private parentRef!:ElementRef<HTMLElement>;

    private getSelf():Element{
        return this.parentRef.nativeElement.querySelectorAll("app-guess-word")[this.wordIndex];
    }

    private getTile(index:number):Element{
        return this.getTileAll()[index];
    }

    private getTileAll():NodeListOf<Element>{
        return this.getSelf().querySelectorAll("app-guess-tile");
    }

    animateLetterInput(element:Element){
        const anim = this.builder.build([
            style({
                opacity: '0',
                borderStyle: 'none'
            }),
            sequence([
                animate(60, 
                    style({
                        opacity: '1',
                        borderStyle: 'solid',
                        borderColor: 'var(--border-filled)'
                    })),
                animate(60, 
                    style({
                        height: '62px',
                        width: '60px',
                        margin: '1px'
                    })),
                animate(60, 
                    style({
                        height: '60px',
                        width: '58px',
                        margin: '3px'
                    }))
            ])
        ]);
        const player = anim.create(element);
        player.play();
    }
    /**
     *
     */
    constructor(private builder: AnimationBuilder) { }
 }
