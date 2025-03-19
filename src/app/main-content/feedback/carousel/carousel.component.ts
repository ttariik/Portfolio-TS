import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface Feedback {
  id: number;
  name: string;
  role: string;
  comment: string;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {

  @Input() feedbackList: Feedback[] = [];

  currentIndex = 0;

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.feedbackList.length;
  }

  previous(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.feedbackList.length) % this.feedbackList.length;
  }

  goToIndex(index: number): void {
    this.currentIndex = index;
  }

  getVisibleFeedback() {
    const prevIndex = (this.currentIndex - 1 + this.feedbackList.length) % this.feedbackList.length;
    const nextIndex = (this.currentIndex + 1) % this.feedbackList.length;

    return [
      this.feedbackList[prevIndex],
      this.feedbackList[this.currentIndex],
      this.feedbackList[nextIndex]
    ];
  }


}
