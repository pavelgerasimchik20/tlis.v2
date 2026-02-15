import { DOCUMENT } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [TranslateModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly documentRef = inject(DOCUMENT);
  private readonly translate = inject(TranslateService);

  readonly languages = [
    { code: 'ru', label: 'RU' },
    { code: 'be', label: 'BY' },
    { code: 'zh', label: '中文' }
  ];

  currentLang = 'ru';
  currentImageIndex = 0;
  isLightboxOpen = false;

  portfolioImages = [
    'slab1.jpg',
    'slab2.jpg',
    'slab3.jpg',
    'slab4.jpg',
    'slab5.jpg',
    'slab6.jpg',
    'slab7.jpg',
    'slab8.jpg',
    'slab9.jpg',
    'slab10.jpg',
    'slab11.jpg',
    'slab12.jpg',
    'slab13.jpg',
    'slab2-1.jpg',
    'slab6-1.jpg',
    'slab9-1.jpg'
  ];

  constructor() {
    const savedLang = localStorage.getItem('lang');
    const browserLang = this.translate.getBrowserLang();
    const initialLang = this.resolveLanguage(savedLang ?? browserLang ?? 'ru');

    this.translate.addLangs(this.languages.map((language) => language.code));
    this.translate.setFallbackLang('ru');
    this.useLanguage(initialLang);
  }

  setLanguage(lang: string) {
    this.useLanguage(lang);
  }

  openLightbox(index: number) {
    this.currentImageIndex = index;
    this.isLightboxOpen = true;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeLightbox() {
    this.isLightboxOpen = false;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  nextImage(event: Event) {
    event.stopPropagation();
    this.currentImageIndex = (this.currentImageIndex + 1) % this.portfolioImages.length;
  }

  prevImage(event: Event) {
    event.stopPropagation();
    this.currentImageIndex = (this.currentImageIndex - 1 + this.portfolioImages.length) % this.portfolioImages.length;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (!this.isLightboxOpen) return;

    switch (event.key) {
      case 'Escape':
        this.closeLightbox();
        break;
      case 'ArrowLeft':
        this.prevImage(event);
        break;
      case 'ArrowRight':
        this.nextImage(event);
        break;
    }
  }

  private useLanguage(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.documentRef.documentElement.lang = lang;
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('app:language-change', { detail: { lang } }));
    }
  }

  private resolveLanguage(lang: string) {
    return this.languages.some((language) => language.code === lang) ? lang : 'ru';
  }
}
