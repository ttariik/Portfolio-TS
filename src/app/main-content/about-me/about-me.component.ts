import { Component } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { SvgIconComponent } from "../../shared/svg-icon/svg-icon.component";

@Component({
  selector: "app-about-me",
  standalone: true,
  imports: [TranslatePipe, SvgIconComponent],
  templateUrl: "./about-me.component.html",
  styleUrl: "./about-me.component.scss",
})
export class AboutMeComponent {}
