/**
 * Данные для модалки каталога: заглушки (как в разметке галереи) и заголовки (RU, как в tlis-home-scripts).
 */

export type CatalogGalleryId = 'colormix' | 'mono' | 'white-cement' | 'border';

/** Текущая карточка в модалке — удобно смотреть в шаблоне / отладке */
export interface CatalogModalCard {
  galleryId: CatalogGalleryId;
  index: number;
  imageSrc: string;
  title: string;
}

/** SVG-заглушки одноцветной линии (как в #catalog-panel-mono) */
export const CATALOG_MONO_PLACEHOLDER_SRCS: readonly string[] = [
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='100%25' height='100%25' fill='%23666'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='42' text-anchor='middle' dominant-baseline='middle'%3EWhite%3C/text%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='100%25' height='100%25' fill='%23777777'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='42' text-anchor='middle' dominant-baseline='middle'%3EGray%3C/text%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='100%25' height='100%25' fill='%23992626'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='42' text-anchor='middle' dominant-baseline='middle'%3ERed%3C/text%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='100%25' height='100%25' fill='%23b18b19'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='42' text-anchor='middle' dominant-baseline='middle'%3EYellow%3C/text%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='100%25' height='100%25' fill='%233c7c3c'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='42' text-anchor='middle' dominant-baseline='middle'%3EGreen%3C/text%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='100%25' height='100%25' fill='%232d4f93'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='42' text-anchor='middle' dominant-baseline='middle'%3EBlue%3C/text%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='100%25' height='100%25' fill='%2361422a'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='42' text-anchor='middle' dominant-baseline='middle'%3EBrown%3C/text%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='100%25' height='100%25' fill='%23222222'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='42' text-anchor='middle' dominant-baseline='middle'%3EBlack%3C/text%3E%3C/svg%3E"
];

/** SVG-заглушки «на белом цементе» (как в #catalog-panel-white-cement) */
export const CATALOG_WHITE_CEMENT_PLACEHOLDER_SRCS: readonly string[] = [
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='100%25' height='100%25' fill='%23e8e4dc'/%3E%3Ctext x='50%25' y='50%25' fill='%23333' font-size='42' text-anchor='middle' dominant-baseline='middle'%3EWhite%3C/text%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='100%25' height='100%25' fill='%23c8c4bc'/%3E%3Ctext x='50%25' y='50%25' fill='%23333' font-size='42' text-anchor='middle' dominant-baseline='middle'%3EGray%3C/text%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='100%25' height='100%25' fill='%23d4a8a8'/%3E%3Ctext x='50%25' y='50%25' fill='%23333' font-size='42' text-anchor='middle' dominant-baseline='middle'%3ERed%3C/text%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='100%25' height='100%25' fill='%23d9c9a0'/%3E%3Ctext x='50%25' y='50%25' fill='%23333' font-size='42' text-anchor='middle' dominant-baseline='middle'%3EYellow%3C/text%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='100%25' height='100%25' fill='%23b8d4b8'/%3E%3Ctext x='50%25' y='50%25' fill='%23333' font-size='42' text-anchor='middle' dominant-baseline='middle'%3EGreen%3C/text%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='100%25' height='100%25' fill='%23a8bdd9'/%3E%3Ctext x='50%25' y='50%25' fill='%23333' font-size='42' text-anchor='middle' dominant-baseline='middle'%3EBlue%3C/text%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='100%25' height='100%25' fill='%23c9b8a8'/%3E%3Ctext x='50%25' y='50%25' fill='%23333' font-size='42' text-anchor='middle' dominant-baseline='middle'%3EBrown%3C/text%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='100%25' height='100%25' fill='%234a4a4a'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='42' text-anchor='middle' dominant-baseline='middle'%3EBlack%3C/text%3E%3C/svg%3E"
];

export const CATALOG_BORDER_PLACEHOLDER_SRCS: readonly string[] = [
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='100%25' height='100%25' fill='%23555555'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='42' text-anchor='middle' dominant-baseline='middle'%3EБорт тротуарный%3C/text%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='100%25' height='100%25' fill='%23444444'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='42' text-anchor='middle' dominant-baseline='middle'%3EБорт дорожный%3C/text%3E%3C/svg%3E"
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
  'Одноцветная на белом цементе «Серая»',
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
