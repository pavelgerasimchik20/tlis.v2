/**
 * Данные для модалки каталога: пути к изображениям (как в разметке галереи) и заголовки (RU, как в tlis-home-scripts).
 */

export type CatalogGalleryId = 'colormix' | 'mono' | 'white-cement' | 'border';

/**
 * Размеры плитки из прайса (`generate-pricelists.mjs` → PRODUCT_ROWS), без тактилки и бордюров.
 * Значение `value` совпадает с option в модалке и в форме заказа.
 */
/** «Новый город»: два варианта по толщине (значения для option и заявки) */
export const NOVY_GOROD_SIZE_6 = '24×16 + 16×16 + 16×8 (6 см)';
export const NOVY_GOROD_SIZE_8 = '24×16 + 16×16 + 16×8 (8 см)';

const NOVY_GOROD_LAYOUT_SIZE_SET = new Set<string>([NOVY_GOROD_SIZE_6, NOVY_GOROD_SIZE_8]);

export function isNovyGorodLayoutSize(value: string): boolean {
  return NOVY_GOROD_LAYOUT_SIZE_SET.has(value);
}

/** Схемы компоновки 1 м² (подсказка на десктопе) */
export const NOVY_GOROD_LAYOUT_IMAGES = {
  set1: 'assets/images/sets/Set1.png',
  set2: 'assets/images/sets/Set2.PNG'
} as const;

export const PRICELIST_TILE_SIZE_OPTIONS: readonly { value: string; i18nKey: string }[] = [
  { value: '20×10×8', i18nKey: 'pricelist.tileSizes.standard208' },
  { value: '20×10×6', i18nKey: 'pricelist.tileSizes.standard206' },
  { value: '48×12×8', i18nKey: 'pricelist.tileSizes.parket48128' },
  { value: '60×30×8', i18nKey: 'pricelist.tileSizes.megapolis60308' },
  { value: NOVY_GOROD_SIZE_6, i18nKey: 'pricelist.tileSizes.novyGorod6' },
  { value: NOVY_GOROD_SIZE_8, i18nKey: 'pricelist.tileSizes.novyGorod8' }
];

/** Текущая карточка в модалке — удобно смотреть в шаблоне / отладке */
export interface CatalogModalCard {
  galleryId: CatalogGalleryId;
  index: number;
  imageSrc: string;
  title: string;
}

/** Фото одноцветной линии (как в #catalog-panel-mono) */
export const CATALOG_MONO_PLACEHOLDER_SRCS: readonly string[] = [
  'assets/images/mono/white.jpg',
  'assets/images/mono/gray.jpg',
  'assets/images/mono/red.jpg',
  'assets/images/mono/yellow.jpg',
  'assets/images/mono/green.jpg',
  'assets/images/mono/blue.jpg',
  'assets/images/mono/brown.jpg',
  'assets/images/mono/black.jpg'
];

/** Фото «на белом цементе» (как в #catalog-panel-white-cement); ТП/ТН — тактильные */
export const CATALOG_WHITE_CEMENT_PLACEHOLDER_SRCS: readonly string[] = [
  'assets/images/white-cement/white.jpg',
  'assets/images/white-cement/red.jpg',
  'assets/images/white-cement/yellow.jpg',
  'assets/images/white-cement/green.jpg',
  'assets/images/white-cement/blue.jpg',
  'assets/images/white-cement/braun.jpg',
  'assets/images/white-cement/TP.jpg',
  'assets/images/white-cement/TN.webp'
];

/** Габарит тактильной плитки (отображение в модалке) */
export const WHITE_CEMENT_TACTILE_FIXED_SIZE = '20.10.9';

/**
 * Значения option «размер» в форме заказа: один габарит, два типа (ТП / ТН).
 * Должны совпадать с `option [value]` и с логикой отправки заявки.
 */
export const TACTILE_ORDER_SIZE_TP = '20.10.9-ТП';
export const TACTILE_ORDER_SIZE_TN = '20.10.9-ТН';

export function isOrderFormTactileSize(value: string): boolean {
  return value === TACTILE_ORDER_SIZE_TP || value === TACTILE_ORDER_SIZE_TN;
}

export function isWhiteCementTactileIndex(index: number): boolean {
  return index === 6 || index === 7;
}

/** Фото бордюров: маркировка по габаритам в имени файла */
export const CATALOG_BORDER_PLACEHOLDER_SRCS: readonly string[] = [
  'assets/images/road-borders/100.20.8.jpg',
  'assets/images/road-borders/100.30.15.jpg'
];

export const CATALOG_MONO_TITLES_RU: readonly string[] = [
  'Одноцветная «Белая»',
  'Одноцветная «Серая»',
  'Одноцветная «Красная»',
  'Одноцветная «Желтая»',
  'Одноцветная «Зеленая»',
  'Одноцветная «Синяя»',
  'Одноцветная «Коричневая»',
  'Одноцветная «Черная»'
];

export const CATALOG_WHITE_CEMENT_TITLES_RU: readonly string[] = [
  'Одноцветная на белом цементе «Белая»',
  'Одноцветная на белом цементе «Красная»',
  'Одноцветная на белом цементе «Желтая»',
  'Одноцветная на белом цементе «Зеленая»',
  'Одноцветная на белом цементе «Синяя»',
  'Одноцветная на белом цементе «Коричневая»',
  'Тактильная плитка предупреждающая (ТП)',
  'Тактильная плитка направляющая (ТН)'
];

export const CATALOG_BORDER_TITLES_RU: readonly string[] = ['Борт тротуарный', 'Борт дорожный'];

/** Три линии как на табах каталога — выбор в форме заказа (группа → оттенок) */
export type OrderFormColorGroupId = 'colormix' | 'mono' | 'white-cement';

/** Color Mix: значения заявки (как в старой форме) + ключи подписей (как у плиток в каталоге) */
export const ORDER_FORM_COLORMIX_COLOR_OPTIONS: readonly { value: string; i18nKey: string }[] = [
  { value: 'Кафель', i18nKey: 'catalog.slabs.slab1' },
  { value: 'Ракушечник', i18nKey: 'catalog.slabs.slab2' },
  { value: 'Старая Италия', i18nKey: 'catalog.slabs.slab3' },
  { value: 'Капучино new', i18nKey: 'catalog.slabs.slab4' },
  { value: 'Луговая трава', i18nKey: 'catalog.slabs.slab6' },
  { value: 'Пламя', i18nKey: 'catalog.slabs.slab7' },
  { value: 'Осенние листья', i18nKey: 'catalog.slabs.slab10' }
];

/** Однотонная: как в `CATALOG_MONO_TITLES_RU` */
export const ORDER_FORM_MONO_COLOR_OPTIONS: readonly { value: string; i18nKey: string }[] =
  CATALOG_MONO_TITLES_RU.map((value, i) => ({
    value,
    i18nKey: `order.form.colorsMono.${i}`
  }));

/** На белом цементе (без тактилки ТП/ТН): только цветные позиции до ТП */
export const ORDER_FORM_WHITE_CEMENT_COLOR_OPTIONS: readonly { value: string; i18nKey: string }[] =
  CATALOG_WHITE_CEMENT_TITLES_RU.slice(0, 6).map((value, i) => ({
    value,
    i18nKey: `order.form.colorsWhiteCement.${i}`
  }));

export function catalogModalImageSrc(galleryId: CatalogGalleryId, index: number): string {
  switch (galleryId) {
    case 'mono':
      return CATALOG_MONO_PLACEHOLDER_SRCS[index] ?? '';
    case 'white-cement':
      return CATALOG_WHITE_CEMENT_PLACEHOLDER_SRCS[index] ?? '';
    case 'border':
      return CATALOG_BORDER_PLACEHOLDER_SRCS[index] ?? '';
    default:
      return '';
  }
}

export function catalogModalTitleRu(galleryId: CatalogGalleryId, index: number): string {
  switch (galleryId) {
    case 'mono':
      return CATALOG_MONO_TITLES_RU[index] ?? `Одноцветная ${index + 1}`;
    case 'white-cement':
      return CATALOG_WHITE_CEMENT_TITLES_RU[index] ?? `На белом цементе ${index + 1}`;
    case 'border':
      return CATALOG_BORDER_TITLES_RU[index] ?? `Бордюр ${index + 1}`;
    default:
      return '';
  }
}
