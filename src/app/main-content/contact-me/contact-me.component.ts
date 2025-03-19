import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslatePipe],
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss'], 
})
export class ContactMeComponent implements OnInit, OnDestroy {
  private langChangeSub: Subscription | undefined;
  private http = inject(HttpClient);

  contactData = {
    name: '',
    email: '',
    message: '',
    privacyPolicy: false,
  };

  placeholders = {
    name: '',
    email: '',
    message: '',
  };

  mailTest = false;

  post = {
    endPoint: 'https://.dev/api/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadPlaceholders();
    this.langChangeSub = this.translate.onLangChange.subscribe(() => {
      this.loadPlaceholders();
    });
  }

  ngOnDestroy(): void {
    this.langChangeSub?.unsubscribe();
  }

  private loadPlaceholders(): void {
    this.translate
      .get([
        'contactMe.form.placeholder.name',
        'contactMe.form.placeholder.email',
        'contactMe.form.placeholder.help',
      ])
      .subscribe((translations: any) => {
        this.placeholders.name = translations['contactMe.form.placeholder.name'];
        this.placeholders.email = translations['contactMe.form.placeholder.email'];
        this.placeholders.message = translations['contactMe.form.placeholder.help'];
      });
  }

  getNamePlaceholder(name: NgModel): string {
    return !name.valid && name.touched
      ? this.translate.instant('contactMe.form.errorMessages.name')
      : this.placeholders.name;
  }

  getMailPlaceholder(email: NgModel): string {
    return !email.valid && email.touched
      ? this.translate.instant('contactMe.form.errorMessages.email')
      : this.placeholders.email;
  }

  getMessagePlaceholder(message: NgModel): string {
    return !message.valid && message.touched
      ? this.translate.instant('contactMe.form.errorMessages.help')
      : this.placeholders.message;
  }

onSubmit(ngForm: NgForm): void {
  if (ngForm.valid) {
    if (!this.contactData.privacyPolicy) {
      console.error('Bitte akzeptieren Sie die Datenschutzbestimmungen.');
      return;
    }

    this.http
      .post(
        this.post.endPoint,
        this.post.body(this.contactData),
        this.post.options
      )
      .subscribe({
        next: (response) => {
          console.table(response);
          ngForm.resetForm();
        },
        error: (error) => console.error('Fehler beim Senden:', error),
        complete: () => console.info('Mailversand abgeschlossen'),
      });
  }
}

}
