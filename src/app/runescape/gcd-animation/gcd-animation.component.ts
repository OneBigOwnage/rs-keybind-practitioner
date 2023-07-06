import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import TickRepository from '../TickRepository.service';

@Component({
  selector: 'app-gcd-animation',
  templateUrl: './gcd-animation.component.html',
  styleUrls: ['./gcd-animation.component.scss'],
  animations: [
    trigger('countDown', [
      state('start', style({
        strokeDasharray: '0 1000'
      })),
      state('end', style({
        strokeDasharray: '393 1000'
      })),
      transition('start => end', [
        animate('1.8s')
      ]),
    ])
  ],
})
export class GcdAnimationComponent {

  public animationState: 'start' | 'end' = 'end';
  protected pendingAnimation: boolean = false;
  protected isInitialized: boolean = false;

  constructor(public repo: TickRepository) {
    this.repo.triggerGCD$().subscribe(() => this.startAnimation());
  }

  startAnimation() {
    if (this.animationState === 'end') {
      this.animationState = 'start';
    } else {
      this.pendingAnimation = true;
    }
  }

  reset() {
    if (!this.isInitialized) {
      this.isInitialized = true;
      return;
    }

    if (this.pendingAnimation) {
      this.animationState = 'start';
      this.pendingAnimation = false;
    } else {
      this.animationState = 'end';
    }
  }
}
