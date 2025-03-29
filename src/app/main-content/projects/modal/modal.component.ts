import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

interface ModalProject {
  id: number;
  index: string;
  title: string;
  descriptionKey: string;
  skills: { icon: string; alt: string; label: string }[];
  githubLink: string;
  liveTestLink: string;
  image: string;
  nextButtonTranslationKey: string;
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnChanges {
  @Input() project!: number;
  @Output() resetProjectEvent = new EventEmitter<void>();

  projects: ModalProject[] = [
    {
      id: 1,
      index: '01',
      title: 'Join',
      descriptionKey: 'projects.modal.join',
      skills: [
        { icon: '/assets/img/icons_overlay/javascript.svg', alt: 'official JavaScript Icon', label: 'JavaScript' },
        { icon: '/assets/img/icons_overlay/html.svg', alt: 'official HTML Icon', label: 'HTML' },
        { icon: '/assets/img/icons_overlay/css.svg', alt: 'official CSS Icon', label: 'CSS' },
        { icon: '/assets/img/icons_overlay/firebase.svg', alt: 'official Firebase Icon', label: 'Firebase' }
      ],
      githubLink: 'https://github.com/ttariik/Join',
      liveTestLink: '',
      image: './../../../../assets/img/join.svg',
      nextButtonTranslationKey: 'projects.modal.btn'
    },
    {
      id: 2,
      index: '02',
      title: 'El Pollo Loco',
      descriptionKey: 'projects.modal.elPolloLoco',
      skills: [
        { icon: '/assets/img/icons_overlay/javascript.svg', alt: '', label: 'JavaScript' },
        { icon: '/assets/img/icons_overlay/html.svg', alt: '', label: 'HTML' },
        { icon: '/assets/img/icons_overlay/css.svg', alt: '', label: 'CSS' }
      ],
      githubLink: 'https://github.com/ttariik/El-Pollo-Loco',
      liveTestLink: '',
      image: './../../../../assets/img/elPolloLoco.svg',
      nextButtonTranslationKey: 'projects.modal.btn'
    }
  ];

  constructor(private renderer: Renderer2) {}

  get currentProject(): ModalProject | undefined {
    return this.projects.find(p => p.id === this.project);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project']) {
      if (this.currentProject) {
        this.renderer.setStyle(document.body, 'overflow', 'hidden');
        this.renderer.setStyle(document.documentElement, 'overflow', 'hidden');
      } else {
        this.renderer.removeStyle(document.body, 'overflow');
        this.renderer.removeStyle(document.documentElement, 'overflow');
      }
    }
  }

  onResetProject(): void {
    this.renderer.removeStyle(document.body, 'overflow');
    this.renderer.removeStyle(document.documentElement, 'overflow');
    this.resetProjectEvent.emit();
  }

  nextProject(): void {
    if (this.project < 2) {
      this.project++;
    } else {
      this.project = 1;
    }
  }
}
