import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-marquee',
  standalone: true,
  imports: [TranslatePipe, CommonModule],
  templateUrl: './marquee.component.html',
  styleUrl: './marquee.component.scss'
})
export class MarqueeComponent {
  flowTexts = [
    'marquee.text.availability',
    'marquee.text.job',
    'marquee.text.location',
    'marquee.text.workStatus'
  ];
} 