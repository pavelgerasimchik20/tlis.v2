/**
 * Прайс-лист DOCX: логотип + таблицы (COLOR Mix, одноцветная, серая, бордюры).
 * Запуск: npm run generate:pricelists (из папки angular-app)
 */
import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  ImageRun,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from 'docx';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = __dirname;
const LOGO_SVG = path.join(__dirname, '../logo/logo-dark.svg');

const ORANGE = 'DA6708';
const DARK = '333333';

async function loadLogoPngBuffer() {
  return sharp(LOGO_SVG).resize({ width: 160 }).png().toBuffer();
}

function cellPara(text, opts = {}) {
  const { size, bold, italics, color, text: _ignoreDup, ...rest } = opts;
  return new TableCell({
    margins: { top: 40, bottom: 40, left: 60, right: 60 },
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text,
            size: size ?? 20,
            bold: bold ?? false,
            italics: italics ?? false,
            color,
            font: 'Calibri',
            ...rest,
          }),
        ],
      }),
    ],
  });
}

function tableHeaderRow(labels, opts = {}) {
  const fontSize = opts.size ?? 20;
  return new TableRow({
    tableHeader: true,
    children: labels.map(
      (label) =>
        new TableCell({
          shading: { type: ShadingType.CLEAR, fill: 'F5E6D8', color: 'F5E6D8' },
          margins: { top: 40, bottom: 40, left: 60, right: 60 },
          children: [
            new Paragraph({
              children: [new TextRun({ text: label, bold: true, size: fontSize, font: 'Calibri' })],
            }),
          ],
        })
    ),
  });
}

function dataRow(cells) {
  return new TableRow({
    children: cells.map((c) => (typeof c === 'string' ? cellPara(c) : cellPara(c.text, c))),
  });
}

/** Цвета Color Mix по аналогии с прайсом УДМС (цвет «Закат» не выпускается — колонки нет) */
const COLOR_MIX_COLORS = [
  'Антинея',
  'Винные листья',
  'Египет',
  'Капучино',
  'Кафель',
  'Луговая трава',
  'Осенние листья',
  'Пламя',
  'Солнце',
  'Старая Италия',
  'Ракушечник',
  'Вулкан',
];

/** Серый цемент: как в УДМС — серая + одноцветные на сером основании */
const GRAY_CEMENT_COLS = ['Серая', 'Чёрная', 'Жёлтая', 'Коричневая', 'Красная', 'Зелёная'];

const MOCK_COLOR_MIX_M2 = '50,00';
const MOCK_GRAY_M2 = '20,00';
const MOCK_GRAY_OTHER_M2 = '40,00';

const PRODUCT_ROWS = [
  { name: 'Плитка стандартная', size: '20×10×8' },
  { name: 'Плитка стандартная', size: '20×10×6' },
  { name: 'Плитка «Паркет»', size: '48×12×8' },
  { name: '«Мегаполис»', size: '60×30×8' },
  { name: 'Тактильная направляющая', size: '20×10×9' },
  { name: 'Тактильная плитка предупреждающая', size: '20×10×9' },
  {
    name: '«Новый город» (комплект на 1 м²)',
    size: '24×16 + 16×16 + 16×8',
    note: 'Цена за 1 м² комплекта; толщина 6 или 8 см',
  },
];

function makeTable(rows) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
      left: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
      right: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: 'EEEEEE' },
      insideVertical: { style: BorderStyle.SINGLE, size: 1, color: 'EEEEEE' },
    },
    rows,
  });
}

function sectionTitle(text) {
  return new Paragraph({
    spacing: { before: 240, after: 120 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 24,
        color: ORANGE,
        font: 'Calibri',
      }),
    ],
  });
}

function notePara(text) {
  return new Paragraph({
    spacing: { after: 160 },
    children: [
      new TextRun({
        text,
        size: 20,
        italics: true,
        color: '444444',
        font: 'Calibri',
      }),
    ],
  });
}

function buildColorMixMatrixRows() {
  const small = 18;
  const headerLabels = [
    'Наименование изделия',
    'Размер (Д×Ш×В), см',
    ...COLOR_MIX_COLORS.map((name) => `${name}\nруб./м²`),
  ];
  const rows = [tableHeaderRow(headerLabels, { size: small })];
  for (const p of PRODUCT_ROWS) {
    const sizeCell = p.note ? `${p.size}\n(${p.note})` : p.size;
    const priceCells = COLOR_MIX_COLORS.map(() => ({ text: MOCK_COLOR_MIX_M2, size: small }));
    rows.push(
      dataRow([
        { text: p.name, size: small },
        { text: sizeCell, size: small },
        ...priceCells,
      ])
    );
  }
  return rows;
}

/** Плитка на сером цементе — как в УДМС: колонки по цветам (серая дешевле) */
function buildGrayCementMatrixRows() {
  const small = 18;
  const headerLabels = [
    'Наименование изделия',
    'Размер (Д×Ш×В), см',
    ...GRAY_CEMENT_COLS.map((name) => `${name}\nруб./м²`),
  ];
  const rows = [tableHeaderRow(headerLabels, { size: small })];
  for (const p of PRODUCT_ROWS) {
    const sizeCell = p.note ? `${p.size}\n(${p.note})` : p.size;
    const grayPrices = [
      { text: MOCK_GRAY_M2, size: small },
      ...Array(5).fill({ text: MOCK_GRAY_OTHER_M2, size: small }),
    ];
    rows.push(
      dataRow([{ text: p.name, size: small }, { text: sizeCell, size: small }, ...grayPrices])
    );
  }
  return rows;
}

async function buildDocument(logoPng) {
  const colorMixMatrixRows = buildColorMixMatrixRows();
  const grayCementMatrixRows = buildGrayCementMatrixRows();

  /** Одноцветная (белая, синяя и др. на белом/ином цементе) — мок. 40 руб/м² */
  const monoRows = [
    tableHeaderRow(['Тип', 'Цвета', 'Размеры', 'Цена за м², руб']),
    dataRow([
      'Одноцветная плитка',
      'Белая, синяя и др. (не в таблице «на сером цементе»)',
      'Любой размер из линейки (по согласованию)',
      '40,00',
    ]),
  ];

  /** Бордюры — 10 руб/п.м. */
  const borderRows = [
    tableHeaderRow(['Изделие', 'Маркировка', 'Цена за п.м., руб']),
    dataRow(['Бордюр', 'БР100.20.8', '10,00']),
    dataRow(['Бордюр', 'БР100.30.15', '10,00']),
  ];

  return new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 160 },
            children: [
              new ImageRun({
                type: 'png',
                data: logoPng,
                transformation: { width: 120, height: 120 },
                altText: {
                  name: 'LogoTLIS',
                  title: 'TLIS',
                  description: 'Логотип производственной компании TLIS',
                },
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 80 },
            children: [
              new TextRun({ text: 'TLIS', bold: true, size: 36, color: ORANGE, font: 'Calibri' }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 240 },
            children: [
              new TextRun({
                text: 'Производственная компания',
                size: 28,
                color: DARK,
                font: 'Calibri',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: 'Прайс — тротуарная плитка',
                bold: true,
                size: 32,
                color: ORANGE,
                font: 'Calibri',
              }),
            ],
          }),
          notePara(
            'Цены ориентировочные (моковые). Структура таблиц — по аналогии с прайсом УДМС (Color Mix и плитка на сером цементе). Цвет «Закат» в Color Mix не выпускается. Уточняйте наличие и условия у отдела продаж.'
          ),
          sectionTitle('1. Тротуарная плитка «Color Mix»'),
          notePara(
            'Морозостойкость и водопоглощение — по техническим характеристикам изделий. Цена за 1 м² в зависимости от цвета по каталогу Color Mix (мок.: 50 руб/м² для всех колонок). Колонка «Закат» в прайс не включена — цвет не выпускается.'
          ),
          makeTable(colorMixMatrixRows),
          sectionTitle('2. Тротуарная плитка на сером цементе'),
          notePara(
            'Как в прайсе УДМС: отдельные цены за м² для серой плитки и для одноцветных цветов на сером цементе. Мок.: серая — 20 руб/м² (−30 руб/м² к базе Color Mix 50); чёрная, жёлтая, коричневая, красная, зелёная — по 40 руб/м².'
          ),
          makeTable(grayCementMatrixRows),
          sectionTitle('3. Одноцветная плитка (белая, синяя и др.)'),
          notePara(
            'Позиции вне таблицы «на сером цементе»: белая, синяя и др. — в любом размере из линейки, одна цена за м² (мок.).'
          ),
          makeTable(monoRows),
          sectionTitle('4. Бордюры'),
          notePara('Цена за погонный метр борта (мок.).'),
          makeTable(borderRows),
        ],
      },
    ],
  });
}

async function main() {
  const logoPng = await loadLogoPngBuffer();
  const doc = await buildDocument(logoPng);
  const buf = await Packer.toBuffer(doc);
  const outFile = path.join(OUT_DIR, 'pricelist-trotuarnaya-plitka.docx');
  fs.writeFileSync(outFile, buf);
  console.log('Written:', outFile);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
