import { DOCUMENT } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  type CatalogGalleryId,
  type CatalogModalCard,
  catalogModalImageSrc,
  catalogModalTitleRu
} from './catalog-modal-data';

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
  showAllPortfolioImages = false;
  
  // Catalog modal
  isCatalogModalOpen = false;
  /** Какая галерея открыла модалку — влияет на источник фото и заголовка */
  catalogModalGalleryId: CatalogGalleryId = 'colormix';
  selectedCatalogIndex = 0;
  selectedSize = '';

  /** Маркировка бордюра — совпадает с `value` в модалке и в форме заказа (#order-size) */
  readonly borderSizeTrotuar = 'БР100.20.8 тротуарный';
  readonly borderSizeRoad = 'БР100.30.15 дорожный';

  catalogImages = [
    'slab1.jpg',
    'slab2.jpg',
    'slab3.jpg',
    'slab4.jpg',
    'slab6.jpg',
    'slab7.jpg',
    'slab10.jpg'
  ];

  // Названия плиток для модалки (соответствуют индексам)
  // Используем переводы из i18n для поддержки разных языков
  catalogTitleKeys = [
    'catalog.slabs.slab1',
    'catalog.slabs.slab2',
    'catalog.slabs.slab3',
    'catalog.slabs.slab4',
    'catalog.slabs.slab6',
    'catalog.slabs.slab7',
    'catalog.slabs.slab10'
  ];

  // Соответствие между индексами плиток и значениями в select формы заказа
  // Значения должны точно совпадать с value в option элементах
  catalogToColorValue: { [key: number]: string } = {
    0: 'Кафель',              // slab1 -> Кафель
    1: 'Ракушечник',          // slab2 -> Ракушечник
    2: 'Старая Италия',        // slab3 -> Старая Италия
    3: 'Капучино new',         // slab4 -> Капучино new
    4: 'Луговая трава',        // slab6 -> Луговая трава
    5: 'Пламя',                // slab7 -> Пламя
    6: 'Осенние листья'        // slab10 -> Осенние листья
  };

  getCatalogTitle(index: number): string {
    if (index >= 0 && index < this.catalogTitleKeys.length) {
      return this.translate.instant(this.catalogTitleKeys[index]);
    }
    return `Плита ${index + 1}`;
  }

  /** Картинка в модалке: slabs для COLOR MIX, иначе заглушки из catalog-modal-data */
  getCatalogModalImageSrc(): string {
    if (this.catalogModalGalleryId === 'colormix') {
      const file = this.catalogImages[this.selectedCatalogIndex];
      return file ? `assets/images/slabs/${file}` : '';
    }
    return catalogModalImageSrc(this.catalogModalGalleryId, this.selectedCatalogIndex);
  }

  /** Заголовок в модалке: i18n для COLOR MIX, иначе RU-строки как в карусели */
  getCatalogModalTitle(): string {
    if (this.catalogModalGalleryId === 'colormix') {
      return this.getCatalogTitle(this.selectedCatalogIndex);
    }
    return catalogModalTitleRu(this.catalogModalGalleryId, this.selectedCatalogIndex);
  }

  /**
   * Текущая карточка модалки (удобно смотреть в шаблоне или при отладке).
   * Пример: { galleryId: 'mono', index: 2, imageSrc: 'assets/images/mono/red.jpg', title: 'Одноцветная «Красная»' }
   */
  get catalogModalCard(): CatalogModalCard {
    return {
      galleryId: this.catalogModalGalleryId,
      index: this.selectedCatalogIndex,
      imageSrc: this.getCatalogModalImageSrc(),
      title: this.getCatalogModalTitle()
    };
  }

  /** Подпись размера бордюра в модалке (маркировка БР по выбранной карточке) */
  getCatalogBorderSizeLabel(): string {
    if (this.selectedSize === this.borderSizeTrotuar) {
      return this.translate.instant('catalog.modal.sizes.borderTrotuar');
    }
    if (this.selectedSize === this.borderSizeRoad) {
      return this.translate.instant('catalog.modal.sizes.borderRoad');
    }
    return this.selectedSize || '';
  }

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

  handleCatalogItemClick(galleryId: CatalogGalleryId, index: number) {
    this.catalogModalGalleryId = galleryId;
    this.selectedCatalogIndex = index;
    if (galleryId === 'border') {
      this.selectedSize = index === 0 ? this.borderSizeTrotuar : this.borderSizeRoad;
    } else {
      this.selectedSize = '';
    }
    this.isCatalogModalOpen = true;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeCatalogModal() {
    this.isCatalogModalOpen = false;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  scrollToOrder() {
    if (typeof document !== 'undefined') {
      const orderSection = document.querySelector('#order');
      if (orderSection) {
        orderSection.scrollIntoView({ behavior: 'smooth' });
        
        // Заполняем поле выбора цвета выбранной плиткой
        this.setSelectedColorInForm();
        // Заполняем поле выбора размера, если размер был выбран
        this.setSelectedSizeInForm();
      }
    }
  }

  onOrderButtonClick() {
    this.closeCatalogModal();
    // Небольшая задержка, чтобы модалка успела закрыться перед скроллом
    setTimeout(() => {
      this.scrollToOrder();
    }, 100);
  }

  setSelectedColorInForm() {
    if (this.catalogModalGalleryId !== 'colormix') {
      return;
    }
    if (typeof document !== 'undefined') {
      const colorSelect = document.getElementById('order-color') as HTMLSelectElement;
      if (colorSelect && this.catalogToColorValue[this.selectedCatalogIndex] !== undefined) {
        const colorValue = this.catalogToColorValue[this.selectedCatalogIndex];
        colorSelect.value = colorValue;
        
        // Триггерим событие change для обновления UI
        colorSelect.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  }

  setSelectedSizeInForm() {
    if (typeof document !== 'undefined' && this.selectedSize) {
      const sizeSelect = document.getElementById('order-size') as HTMLSelectElement;
      if (sizeSelect) {
        sizeSelect.value = this.selectedSize;
        
        // Триггерим событие change для обновления UI
        sizeSelect.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (this.isLightboxOpen) {
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
    
    if (this.isCatalogModalOpen) {
      if (event.key === 'Escape') {
        this.closeCatalogModal();
      }
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

  toggleShowAllPortfolio() {
    this.showAllPortfolioImages = !this.showAllPortfolioImages;
  }

  getPortfolioShowMoreText(): string {
    const raw = this.translate.instant('portfolio.showMore');
    const translation = typeof raw === 'string' ? raw.trim() : '';
    // Если перевод не найден (вернулся ключ с любыми пробелами/кавычками), используем fallback
    if (!translation || translation.replace(/["']/g, '') === 'portfolio.showMore') {
      return 'Показать больше';
    }
    return translation;
  }
}
