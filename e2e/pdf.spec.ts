/**
 * @jest-environment node
 */
import { getDocument, PDFDocumentProxy } from 'pdfjs-dist';
import { isExternalLink, rootDirectoryName } from './helper';
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

const getPageLinks = async (document: PDFDocumentProxy, pageNumber: number) => {
  const page = await document.getPage(pageNumber);
  const annotations = await page.getAnnotations();

  const links: Array<string> = [];
  for (const annotation of annotations) {
    if (typeof annotation.url === 'string') {
      links.push(annotation.url);
    }
  }
  return links;
};

describe('pdf', () => {
  let document: PDFDocumentProxy;

  const expectedMaxPageNumber = 6;

  beforeAll(async () => {
    const pdfPath = `${rootDirectoryName}/pdf/out/resume.pdf`;
    if (!fs.existsSync(pdfPath)) {
      fail(`Pdf file is not found: ${pdfPath}`);
    }
    document = await getDocument(pdfPath).promise;
  });

  test('ページ数が一定である', () => {
    expect(document.numPages).toBe(expectedMaxPageNumber);
  });

  test.each([
    ['dc:title', 'Portfolio | yktakaha4.github.io'],
    ['pdf:author', 'yktakaha4'],
  ])('メタデータが適切である #%#', async (key, expected) => {
    const { metadata } = await document.getMetadata();
    expect(metadata?.get(key)).toBe(expected);
  });

  test.each([
    [1, 'Portfolio | yktakaha4.github.io'],
    [1, `1 / ${expectedMaxPageNumber}`],
    [1, 'プロフィール'],
    [1, '職務経歴'],
    [1, '正社員'],
    [2, '副業'],
    [3, '経験'],
    [4, 'イベント参加‧登壇'],
    [4, '資格‧認定'],
    [5, '公開アウトプット'],
    [5, '個人開発'],
    [5, '技術記事'],
    [6, 'OSS活動'],
    [6, 'このページについて'],
    [6, `6 / ${expectedMaxPageNumber}`],
  ])(`ページに特定の値が含まれる #%#`, async (pageNumber, expected) => {
    const text = await getPageText(document, pageNumber);
    expect(text).toContain(expected);
  });

  test('リンクが外部リンクであること', async () => {
    const pages = Array.from({ length: document.numPages }, (_, i) => i + 1);
    for (const page of pages) {
      const links = await getPageLinks(document, page);
      links.forEach((link, index) => {
        expect({
          page,
          index,
          link,
          isExternal: isExternalLink(link),
        }).toEqual({
          page,
          index,
          link,
          isExternal: true,
        });
      });
    }
  });
});
