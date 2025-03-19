import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  TranslateService,
  TranslatePipe,
  TranslateDirective,
  TranslateModule,
} from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import * as AOS from 'aos';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslationService } from './shared/services/translation.service';
import { MainContentComponent } from './main-content/main-content.component';
import { CustomCursorComponent } from './shared/custom-cursor/custom-cursor.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    HttpClientModule,
    TranslateModule,
    CustomCursorComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  title = 'portfolio';

  constructor() {

   }

  ngOnInit(): void {
       { 
      AOS.init({
        offset: 100,
        easing: 'linear',
        duration: 500,
        once: true,
        mirror: false,
        debounceDelay: 150,
        throttleDelay: 200,
      });
    }
    
  }
}
