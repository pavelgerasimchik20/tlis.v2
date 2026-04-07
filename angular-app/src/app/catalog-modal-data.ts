/**
 * Данные для модалки каталога: пути к изображениям (как в разметке галереи) и заголовки (RU, как в tlis-home-scripts).
 */

export type CatalogGalleryId = 'colormix' | 'mono' | 'white-cement' | 'border';

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

/** Фото «на белом цементе» (как в #catalog-panel-white-cement); чёрная — общее фото плитки */
export const CATALOG_WHITE_CEMENT_PLACEHOLDER_SRCS: readonly string[] = [
  'assets/images/white-cement/white.jpg',
  'assets/images/white-cement/red.jpg',
  'assets/images/white-cement/yellow.jpg',
  'assets/images/white-cement/green.jpg',
  'assets/images/white-cement/blue.jpg',
  'assets/images/white-cement/braun.jpg',
  'assets/images/mono/black.jpg'
];

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
  'Одноцветная на белом цементе «Черная»'
];

export const CATALOG_BORDER_TITLES_RU: readonly string[] = ['Борт тротуарный', 'Борт дорожный'];

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
