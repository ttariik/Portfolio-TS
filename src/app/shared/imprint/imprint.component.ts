import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../services/translation.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent
  ],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent {
  currentLanguage!: string;
  private langSubscription: Subscription;

  constructor(private translationService: TranslationService) {
    this.langSubscription = this.translationService.language$.subscribe((lang) => {
      this.currentLanguage = lang;
    });
  }

  ngOnInit() {
    this.currentLanguage = this.translationService.currentLanguage;
  }

  ngOnDestroy() {
    this.langSubscription.unsubscribe();
  }
}
