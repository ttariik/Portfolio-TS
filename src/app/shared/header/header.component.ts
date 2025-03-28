import { Component, HostListener, ElementRef } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, SvgIconComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  currentLanguage: string;
  isChecked = false;
  isMenuOpen = false;

  constructor(private translationService: TranslationService, private eRef: ElementRef) {
    this.currentLanguage = this.translationService.currentLanguage;
    this.isChecked = this.currentLanguage === 'de';
  }

  toggleLanguage() {
    const newLang = this.currentLanguage === 'en' ? 'de' : 'en';
    this.translationService.switchLanguage(newLang);
    this.currentLanguage = newLang;
    this.isChecked = newLang === 'de';
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onMenuClick(event: Event): void {
    event.stopPropagation();
  }

  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // Falls das mobile Menü offen ist, schließen wir es hier:
    this.isMenuOpen = false;
  }
  

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    if (this.isMenuOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }
}
