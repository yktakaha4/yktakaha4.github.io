import { readFileSync } from 'fs-extra';

const buildFilePath = (filePath: string) => `${__dirname}/../build/${filePath}`;

describe('index.html', () => {
  beforeEach(() => {
    const filePath = buildFilePath('index.html');
    document.documentElement.innerHTML = readFileSync(filePath, 'utf8');
  });

  test.each([['title', 'Portfolio | yktakaha4.github.io']])(
    'textContentが適切に描画される #%#',
    (selector, expected) => {
      const element = document.querySelector(selector);
      if (!element) fail();
      expect(element.textContent).toBe(expected);
    },
  );

  test.each([
    [
      'meta[property="description"]',
      'content',
      'yktakaha4のポートフォリオサイト',
    ],
  ])('属性値が適切に描画される #%#', (selector, propertyName, expected) => {
    const element = document.querySelector(selector);
    if (!element) fail();
    expect((element as unknown as Record<string, unknown>)[propertyName]).toBe(
      expected,
    );
  });
});
