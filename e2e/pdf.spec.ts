/**
 * @jest-environment node
 */
import { getDocument, PDFDocumentProxy } from 'pdfjs-dist';
import { rootDirectoryName } from './helper';
import fs from 'fs-extra';

const getPageText = async (document: PDFDocumentProxy, pageNumber: number) => {
  const page = await document.getPage(pageNumber);
  const textContent = await page.getTextContent();
  return textContent.items
    .map((item) => ('str' in item ? item.str : ''))
    .join('')
    .normalize('NFKC')
    .trim();
};

describe('resume.pdf', () => {
  let document: PDFDocumentProxy;

  beforeAll(async () => {
    const pdfPath = `${rootDirectoryName}/pdf/out/resume.pdf`;
    if (!fs.existsSync(pdfPath)) {
      fail(`Pdf file is not found: ${pdfPath}`);
    }
    document = await getDocument(pdfPath).promise;
  });

  test('ページ数が一定である', () => {
    expect(document.numPages).toBe(8);
  });

  test.each([['dc:title', 'Portfolio | yktakaha4.github.io']])(
    'メタデータが適切である #%#',
    async (key, expected) => {
      const { metadata } = await document.getMetadata();
      expect(metadata?.get(key)).toBe(expected);
    },
  );

  test.each([
    [1, 'Portfolio | yktakaha4.github.io'],
    [1, '1 / 8'],
    [1, 'プロフィール'],
    [1, '職務経歴'],
    [1, '正社員'],
    [2, '副業'],
    [3, '経験'],
    [4, 'イベント参加‧登壇'],
    [4, '資格‧認定'],
    [5, '公開アウトプット'],
    [5, '個人開発'],
    [6, '技術記事'],
    [7, 'OSS活動'],
    [8, '8 / 8'],
  ])(`ページに特定の値が含まれる #%#`, async (pageNumber, expected) => {
    const text = await getPageText(document, pageNumber);
    expect(text).toContain(expected);
  });
});
