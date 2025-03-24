import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  
import { TranslatePipe } from '@ngx-translate/core';

interface FooterLink {
  label: string;    
  url: string;
  target?: string;
  translate?: boolean;
  internal?: boolean; 
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslatePipe, CommonModule, RouterModule], 
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  footerLinks: FooterLink[] = [
    { label: 'Github', url: 'https://github.com/ttariik', target: '_blank' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/tarik-sabanovic-70410134b/', target: '_blank' },
    { label: 'Email', url: 'mailto:tarik.sabanovic2@icloud.com' },
    { label: 'footer.imprint', url: '/imprint', internal: true, translate: true },
    { label: 'footer.privacyPolicy', url: '/privacyPolicy', internal: true, translate: true }
  ];
  
  footerInfo = {
    logoLink: '#landingPage',
    title: 'footer.title',
    location: 'footer.location'
  };
}
