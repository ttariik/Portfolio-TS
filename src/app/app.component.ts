import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import * as AOS from 'aos';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { CustomCursorComponent } from './shared/custom-cursor/custom-cursor.component';
import { filter } from 'rxjs/operators';

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
export class AppComponent implements OnInit {
  title = 'portfolio';

  constructor(private router: Router) {}

  ngOnInit(): void {
    AOS.init({
      offset: 100,
      easing: 'linear',
      duration: 1000,
      once: true,
      mirror: false,
      debounceDelay: 150,
      throttleDelay: 200,
    });

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      window.scrollTo(0, 0);
    });
  }
}
