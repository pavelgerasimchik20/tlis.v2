import { DOCUMENT } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  type CatalogGalleryId,
  type CatalogModalCard,
  NOVY_GOROD_LAYOUT_IMAGES,
  PRICELIST_TILE_SIZE_OPTIONS,
  TACTILE_ORDER_SIZE_TP,
  TACTILE_ORDER_SIZE_TN,
  WHITE_CEMENT_TACTILE_FIXED_SIZE,
  ORDER_FORM_COLORMIX_COLOR_OPTIONS,
  ORDER_FORM_MONO_COLOR_OPTIONS,
  ORDER_FORM_WHITE_CEMENT_COLOR_OPTIONS,
  type OrderFormColorGroupId,
  catalogModalImageSrc,
  isOrderFormTactileSize,
  catalogModalTitleRu,
  isNovyGorodLayoutSize,
  isWhiteCementTactileIndex
} from './catalog-modal-data';

@Component({
  selector: 'app-root',
  imports: [TranslateModule, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly documentRef = inject(DOCUMENT);
  private readonly translate = inject(TranslateService);
  private readonly cdr = inject(ChangeDetectorRef);

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

  /** Тактильные ТП/ТН на белом цементе — фиксированный размер в модалке и в форме */
  readonly whiteCementTactileFixedSize = WHITE_CEMENT_TACTILE_FIXED_SIZE;
  readonly tactileOrderSizeTp = TACTILE_ORDER_SIZE_TP;
  readonly tactileOrderSizeTn = TACTILE_ORDER_SIZE_TN;

  /** Текущее значение #order-size (для скрытия цвета при тактилке) */
  orderFormSelectedSize = '';

  /** Дорожный борт: подсказка про серый по умолчанию и спецзаказ по цвету */
  roadBorderInfoModalOpen = false;

  /** Линия как на табах каталога: затем выбор оттенка в #order-color */
  orderFormColorGroup: OrderFormColorGroupId = 'colormix';

  /** Варианты оттенков для текущей группы (двухуровневый выбор) */
  orderFormColorOptionsForGroup(): { value: string; i18nKey: string }[] {
    let group: OrderFormColorGroupId = this.orderFormColorGroup;
    if (this.isOrderFormTrotuarBorderSelected() && group === 'colormix') {
      group = 'mono';
    }
    switch (group) {
      case 'colormix':
        return [...ORDER_FORM_COLORMIX_COLOR_OPTIONS];
      case 'mono':
        return [...ORDER_FORM_MONO_COLOR_OPTIONS];
      case 'white-cement':
        return [...ORDER_FORM_WHITE_CEMENT_COLOR_OPTIONS];
      default:
        return [];
    }
  }

  /** Размеры плитки из прайса — селектор в модалке и в форме заказа (кроме бордюров и тактилки) */
  readonly pricelistTileSizeOptions = PRICELIST_TILE_SIZE_OPTIONS;

  /** Подсказка со схемами «Новый город» (только десктоп; см. CSS) */
  novyGorodHintOpen = false;
  readonly novyGorodLayoutImages = NOVY_GOROD_LAYOUT_IMAGES;

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

  /** Модалка: тактильные ТП/ТН — другая цена и без выбора размера */
  isWhiteCementTactileModal(): boolean {
    return (
      this.catalogModalGalleryId === 'white-cement' &&
      isWhiteCementTactileIndex(this.selectedCatalogIndex)
    );
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
    } else if (galleryId === 'white-cement' && isWhiteCementTactileIndex(index)) {
      this.selectedSize = index === 6 ? TACTILE_ORDER_SIZE_TP : TACTILE_ORDER_SIZE_TN;
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

        // Сначала размер (тактилка/бордюр влияют на видимость цвета), затем коллекция и оттенок
        this.setSelectedSizeInForm();
        this.setSelectedColorInForm();
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
    if (typeof document === 'undefined') {
      return;
    }
    if (this.catalogModalGalleryId === 'border') {
      return;
    }
    if (this.catalogModalGalleryId === 'white-cement' && isWhiteCementTactileIndex(this.selectedCatalogIndex)) {
      return;
    }

    const colorSelect = document.getElementById('order-color') as HTMLSelectElement | null;
    if (!colorSelect) {
      return;
    }

    let colorValue = '';

    if (this.catalogModalGalleryId === 'colormix') {
      this.orderFormColorGroup = 'colormix';
      colorValue = this.catalogToColorValue[this.selectedCatalogIndex] ?? '';
    } else if (this.catalogModalGalleryId === 'mono') {
      this.orderFormColorGroup = 'mono';
      colorValue = ORDER_FORM_MONO_COLOR_OPTIONS[this.selectedCatalogIndex]?.value ?? '';
    } else if (this.catalogModalGalleryId === 'white-cement') {
      this.orderFormColorGroup = 'white-cement';
      colorValue = ORDER_FORM_WHITE_CEMENT_COLOR_OPTIONS[this.selectedCatalogIndex]?.value ?? '';
    } else {
      return;
    }

    this.cdr.detectChanges();

    queueMicrotask(() => {
      const cs = document.getElementById('order-color') as HTMLSelectElement | null;
      if (cs && colorValue) {
        cs.value = colorValue;
        cs.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  }

  setSelectedSizeInForm() {
    if (typeof document !== 'undefined' && this.selectedSize) {
      const sizeSelect = document.getElementById('order-size') as HTMLSelectElement;
      if (sizeSelect) {
        sizeSelect.value = this.selectedSize;
        this.orderFormSelectedSize = this.selectedSize;

        // Триггерим событие change для обновления UI
        sizeSelect.dispatchEvent(new Event('change', { bubbles: true }));

        if (this.selectedSize === this.borderSizeRoad) {
          this.roadBorderInfoModalOpen = true;
        }
      }
    }
  }

  /** Скрываем выбор Color Mix для тактильной плитки (ТП / ТН) */
  isOrderFormTactileSelected(): boolean {
    return isOrderFormTactileSize(this.orderFormSelectedSize);
  }

  /** Борт тротуарный — в форме есть выбор цвета (без Color Mix) */
  isOrderFormTrotuarBorderSelected(): boolean {
    return this.orderFormSelectedSize === this.borderSizeTrotuar;
  }

  /** Борт дорожный — без выбора цвета в форме */
  isOrderFormRoadBorderSelected(): boolean {
    return this.orderFormSelectedSize === this.borderSizeRoad;
  }

  /** Любой бордюр (погонные метры в количестве) */
  isOrderFormBorderSelected(): boolean {
    return this.isOrderFormTrotuarBorderSelected() || this.isOrderFormRoadBorderSelected();
  }

  /** Показать Color Mix в списке коллекций (не для тротуарного борта) */
  orderFormShowsColorMixGroupOption(): boolean {
    return !this.isOrderFormTrotuarBorderSelected();
  }

  /** Плитка и тротуарный борт: коллекция + оттенок; тактилка и дорожный борт — без */
  orderFormShowsColor(): boolean {
    if (this.isOrderFormTactileSelected()) {
      return false;
    }
    if (this.isOrderFormRoadBorderSelected()) {
      return false;
    }
    return true;
  }

  closeRoadBorderInfoModal() {
    this.roadBorderInfoModalOpen = false;
  }

  onOrderColorGroupChange(event: Event) {
    const el = event.target as HTMLSelectElement;
    this.orderFormColorGroup = el.value as OrderFormColorGroupId;
    if (event.isTrusted) {
      const colorSelect = document.getElementById('order-color') as HTMLSelectElement | null;
      if (colorSelect) {
        colorSelect.value = '';
      }
    }
  }

  /** Подпись размера в модалке: ТП или ТН (только для тактильных карточек) */
  getCatalogModalTactileSizeLine(): string {
    return this.selectedCatalogIndex === 6
      ? this.translate.instant('catalog.modal.tactileSizeTp')
      : this.translate.instant('catalog.modal.tactileSizeTn');
  }

  onCatalogModalSizeChange(event: Event) {
    const el = event.target as HTMLSelectElement;
    this.selectedSize = el.value;
    if (event.isTrusted) {
      this.maybeOpenNovyGorodHint(el.value);
    }
  }

  onOrderSizeChange(event: Event) {
    const el = event.target as HTMLSelectElement;
    this.orderFormSelectedSize = el.value;

    if (!this.isOrderFormRoadBorderSelected()) {
      this.roadBorderInfoModalOpen = false;
    }

    if (this.isOrderFormTrotuarBorderSelected() && this.orderFormColorGroup === 'colormix') {
      this.orderFormColorGroup = 'mono';
      this.cdr.detectChanges();
      queueMicrotask(() => {
        const colorSelect = document.getElementById('order-color') as HTMLSelectElement | null;
        if (colorSelect) {
          colorSelect.value = '';
        }
      });
    }

    if (event.isTrusted && this.isOrderFormRoadBorderSelected()) {
      this.roadBorderInfoModalOpen = true;
    }

    if (event.isTrusted) {
      this.maybeOpenNovyGorodHint(el.value);
    }
  }

  closeNovyGorodHint() {
    this.novyGorodHintOpen = false;
  }

  private maybeOpenNovyGorodHint(value: string) {
    if (!isNovyGorodLayoutSize(value) || !this.isDesktopNovyGorodHintViewport()) {
      return;
    }
    this.novyGorodHintOpen = true;
  }

  private isDesktopNovyGorodHintViewport(): boolean {
    return typeof window !== 'undefined' && window.matchMedia('(min-width: 769px)').matches;
  }

  @HostListener('window:resize')
  onWindowResize() {
    if (this.novyGorodHintOpen && !this.isDesktopNovyGorodHintViewport()) {
      this.novyGorodHintOpen = false;
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (this.roadBorderInfoModalOpen && event.key === 'Escape') {
      this.closeRoadBorderInfoModal();
      event.preventDefault();
      return;
    }

    if (this.novyGorodHintOpen && event.key === 'Escape') {
      this.closeNovyGorodHint();
      event.preventDefault();
      return;
    }

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
