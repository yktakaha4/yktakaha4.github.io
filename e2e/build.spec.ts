import { readFileSync } from 'fs-extra';
import dayjs from 'dayjs';

const buildFilePath = (filePath: string) => `${__dirname}/../build/${filePath}`;

describe('index.html', () => {
  beforeEach(() => {
    const filePath = buildFilePath('index.html');
    document.documentElement.innerHTML = readFileSync(filePath, 'utf8');
  });

  test.each([['title', 'Portfolio | yktakaha4.github.io']])(
    'textContentが適切に描画される #%#',
    (selector, expected) => {
      const elements = Array.from(document.querySelectorAll(selector));
      expect(elements.length).toBeGreaterThan(0);
      for (const element of elements) {
        expect(element.textContent).toBe(expected);
      }
    },
  );

  test.each([
    [
      'meta[property="description"], meta[name="description"], meta[property="og:description"]',
      'content',
      'yktakaha4のポートフォリオサイト',
    ],
  ])('属性値が適切に描画される #%#', (selector, propertyName, expected) => {
    const elements = Array.from(document.querySelectorAll(selector));
    expect(elements.length).toBeGreaterThan(0);
    for (const element of elements) {
      expect(
        (element as unknown as Record<string, unknown>)[propertyName],
      ).toBe(expected);
    }
  });

  test.each([
    'yktakaha4.github.io',
    `内容は${dayjs().format('YYYY/M/D')}`,
    '«123…»',
    `© ${dayjs().format('YYYY')}`,
  ])('特定の値が文章内に含まれる #%#', (expected) => {
    expect(document.documentElement.textContent).toContain(expected);
  });
});
