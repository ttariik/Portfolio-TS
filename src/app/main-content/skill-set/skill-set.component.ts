import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../../shared/svg-icon/svg-icon.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-skill-set',
  standalone: true,
  imports: [CommonModule, SvgIconComponent, TranslatePipe],
  templateUrl: './skill-set.component.html',
  styleUrl: './skill-set.component.scss'
})
export class SkillSetComponent {
  title = 'Technologies';
  subtitle = 'Skill Set';
  skillSetText = `I thrive in the dynamic world of front-end development, where creativity meets logic. With hands-on experience in Angular, TypeScript, SCSS, and other modern technologies, I build engaging, responsive, and high-performance web applications. But technology never stands still neither do I.`;  
  anotherSkillsub = 'Feel free to contact me.I look forward to expanding on my previous knowledge.';

}
