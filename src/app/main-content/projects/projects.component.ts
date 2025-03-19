import { Component, HostListener } from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import { FormsModule } from '@angular/forms';

import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../shared/services/scroll.service';
interface Project { id: number; title: string; skills: string[]; previewClass: string; }


@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ModalComponent, FormsModule, TranslatePipe, CommonModule
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  hoveredProject = 0; clickedProject = 0;
  projects: Project[] = [
    { id: 1, title: 'Join', skills: ['JavaScript', 'HTML', 'CSS', 'Firebase'], previewClass: 'preview-project-one' },
    { id: 2, title: 'El Pollo Loco', skills: ['JavaScript', 'HTML', 'CSS'], previewClass: 'preview-project-two' }
  ];
  constructor(private scrollService: ScrollService) {}
  selectProject(projectId: number): void { this.clickedProject = projectId; this.scrollService.disableScroll(); }
  resetProjectId(): void { this.clickedProject = 0; this.scrollService.enableScroll(); }
  @HostListener('window:scroll') onScroll(): void { document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`); }
}
