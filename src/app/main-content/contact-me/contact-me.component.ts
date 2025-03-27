import { Component, OnInit, OnDestroy, inject } from "@angular/core";
import { FormsModule, NgForm, NgModel } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-contact-me",
  standalone: true,
  imports: [FormsModule, CommonModule, TranslatePipe],
  templateUrl: "./contact-me.component.html",
  styleUrls: ["./contact-me.component.scss"],
})
export class ContactMeComponent implements OnInit, OnDestroy {
  private langChangeSub: Subscription | undefined;
  private http = inject(HttpClient);

  contactData = {
    name: "",
    email: "",
    message: "",
    privacyPolicy: false,
  };

  validationErrors = {
    name: "",
    email: "",
    message: "",
  };

  placeholders = {
    name: "",
    email: "",
    message: "",
  };

  mailTest = false;
  submitAttempted = false;

  post = {
    endPoint: "https://.dev/api/sendMail.php",
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        "Content-Type": "text/plain",
        responseType: "text",
      },
    },
  };

  constructor(private translate: TranslateService) {}

  get isFormValid(): boolean {
    return (
      this.contactData.privacyPolicy === true &&
      this.contactData.name.trim().length > 0 &&
      this.contactData.email.trim().length > 0 &&
      this.contactData.message.trim().length > 0 &&
      !this.validationErrors.name &&
      !this.validationErrors.email &&
      !this.validationErrors.message
    );
  }

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
        "contactMe.form.placeholder.name",
        "contactMe.form.placeholder.email",
        "contactMe.form.placeholder.help",
      ])
      .subscribe((translations: any) => {
        this.placeholders.name =
          translations["contactMe.form.placeholder.name"];
        this.placeholders.email =
          translations["contactMe.form.placeholder.email"];
        this.placeholders.message =
          translations["contactMe.form.placeholder.help"];
      });
  }

  validateName(name: string): boolean {
    const nameRegex = /^[a-zA-ZäöüÄÖÜß\s]+$/;
    const isValid = nameRegex.test(name);

    if (!isValid && name) {
      this.validationErrors.name =
        this.translate.instant("contactMe.form.errorMessages.nameInvalid") ||
        "Bitte nur Buchstaben eingeben (keine Zahlen oder Sonderzeichen)";
    } else {
      this.validationErrors.name = "";
    }

    return isValid;
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailRegex.test(email);

    if (!isValid && email) {
      this.validationErrors.email =
        this.translate.instant("contactMe.form.errorMessages.emailInvalid") ||
        "Bitte eine gültige E-Mail-Adresse eingeben";
    } else {
      this.validationErrors.email = "";
    }

    return isValid;
  }

  validateMessage(message: string): boolean {
    const messageRegex = /^[a-zA-Z0-9äöüÄÖÜß\s]+$/;
    const isValid = messageRegex.test(message);

    if (!isValid && message) {
      this.validationErrors.message =
        this.translate.instant("contactMe.form.errorMessages.messageInvalid") ||
        "Bitte nur Buchstaben und Zahlen eingeben (keine Sonderzeichen)";
    } else {
      this.validationErrors.message = "";
    }

    return isValid;
  }

  getNamePlaceholder(name: NgModel): string {
    if (!name.valid && name.touched) {
      if (this.validationErrors.name) {
        return this.validationErrors.name;
      }
      return this.translate.instant("contactMe.form.errorMessages.name");
    }
    return this.placeholders.name;
  }

  getMailPlaceholder(email: NgModel): string {
    if (!email.valid && email.touched) {
      if (this.validationErrors.email) {
        return this.validationErrors.email;
      }
      return this.translate.instant("contactMe.form.errorMessages.email");
    }
    return this.placeholders.email;
  }

  getMessagePlaceholder(message: NgModel): string {
    if (!message.valid && message.touched) {
      if (this.validationErrors.message) {
        return this.validationErrors.message;
      }
      return this.translate.instant("contactMe.form.errorMessages.help");
    }
    return this.placeholders.message;
  }

  onSubmit(ngForm: NgForm): void {
    const isNameValid = this.validateName(this.contactData.name);
    const isEmailValid = this.validateEmail(this.contactData.email);
    const isMessageValid = this.validateMessage(this.contactData.message);

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      return;
    }

    if (ngForm.valid) {
      if (!this.contactData.privacyPolicy) {
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
            this.validationErrors = {
              name: "",
              email: "",
              message: "",
            };
          },
        });
    }
  }

  checkPrivacyPolicy(): void {
    if (!this.contactData.privacyPolicy) {
      this.submitAttempted = true;
      event?.preventDefault();
    } else {
      this.submitAttempted = false;
    }
  }
}
