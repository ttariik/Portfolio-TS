import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { CarouselComponent } from "./carousel/carousel.component";

interface Feedback {
  id: number;
  name: string;
  role: string;
  comment: string;
}

@Component({
  selector: "app-feedback",
  standalone: true,
  imports: [CommonModule, TranslatePipe, CarouselComponent],
  templateUrl: "./feedback.component.html",
  styleUrl: "./feedback.component.scss",
})
export class FeedbackComponent {
  feedbackList: Feedback[] = [
    {
      id: 1,
      name: "I. Karakasidis",
      role: "Join Team Partner",
      comment:
        "Working with Tarik has been a great experience. His attention to detail and problem-solving mindset made a significant impact on our project. He is highly reliable, communicates effectively, and always brings innovative ideas to the table. His technical skills and teamwork attitude made collaboration smooth and enjoyable. I truly appreciate his dedication and would be happy to work with him again in the future.",
    },
    {
      id: 2,
      name: "M. Joe-Sedlmaier",
      role: "Join Team Partner",
      comment:
        "Tarik is an outstanding programmer with exceptional skills in development and system optimization. His problem-solving mindset, deep technical expertise, and collaborative nature make him a valuable team member. He consistently delivers high-quality results and fosters a positive team dynamic.",
    },
  ];

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.loadTranslations();
    this.translate.onLangChange.subscribe(() => {
      this.loadTranslations();
    });
  }

  private loadTranslations() {
    this.feedbackList.forEach((feedbacks, index) => {
      this.translate.get(`peerEvaluations.feedbacks.feedback${feedbacks.id}`)
        .subscribe((translatedText: string) => {
          this.feedbackList[index].comment = translatedText;
        });
    });
  }
}
