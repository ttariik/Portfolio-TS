import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';

import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../services/translation.service';
@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
})
export class PrivacyPolicyComponent {
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
