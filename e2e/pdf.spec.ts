/**
 * @jest-environment node
 */
import { getDocument, PDFDocumentProxy } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { rootDirectoryName } from './helper';

describe('resume.pdf', () => {
  let document: PDFDocumentProxy;

  beforeAll(async () => {
    document = await getDocument(`${rootDirectoryName}/pdf/out/resume.pdf`)
      .promise;
  });

  test('ページ数が一定である', () => {
    expect(document.numPages).toBe(8);
  });
});
