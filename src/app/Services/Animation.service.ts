import { AnimationBuilder, AnimationPlayer, animate, sequence, style } from '@angular/animations';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  animationCorrectPosition(element:HTMLElement):AnimationPlayer{
    const thisAnimation = this._builder.build([
      
    ])
    return thisAnimation.create(element);
  }
  animationCorrectLetter(element:HTMLElement):AnimationPlayer{
    const thisAnimation = this._builder.build([

    ])
    return thisAnimation.create(element);
  }
  animationIncorrect(element:HTMLElement):AnimationPlayer{
    const thisAnimation = this._builder.build([
      style({
        borderColor:'var(--dark-grey)'
      })
    ])
    return thisAnimation.create(element);
  }
  setAnimationAddLetter(element:HTMLElement):AnimationPlayer{
    const thisAnimation = this._builder.build([
      style({
        backgroundColor:'red'
      })
      // style({
      //   opacity: '0',
      //   borderColor: 'var(--border-filled)'
      // }),
      // sequence([
      //   animate(
      //     '60ms',
      //     style({
      //       opacity: '1'
      //     })),
      //   animate(
      //     '60ms',
      //     style({
      //       height: '62px',
      //       width: '60px',
      //       margin: '1px'
      //     })),
      //   animate(
      //     '60ms',
      //     style({
      //       height: '60px',
      //       width: '58px',
      //       margin: '3px'
      //     }))
      // ])
    ])
    return thisAnimation.create(element);
  }
  animationDeleteLetter(element:HTMLElement):AnimationPlayer{
    const thisAnimation = this._builder.build([

    ])
    return thisAnimation.create(element);
  }
  constructor(private _builder:AnimationBuilder) { }

}
