import { Avatar } from '@/components/ui/Avatar';
import { render } from '@testing-library/react';

describe('Avatar', () => {
  test.each([
    [
      'name',
      'sub title',
      {
        src: 'https://example.com/image.png',
        width: '400w',
        height: '400h',
        alt: 'alt',
        srcSets: [
          {
            src: 'https://example.com/image.png',
            width: '128w',
          },
        ],
        sizes: [
          {
            size: '100vw',
          },
        ],
        sources: [
          {
            type: 'image/webp',
            srcset: 'https://example.com/image.webp',
          },
        ],
      },
      1,
    ],
  ])('画像が表示される #%#', async (name, subTitle, src, expected) => {
    const { container } = render(
      <Avatar name={name} subTitle={subTitle} src={src} />,
    );

    expect(container.textContent).toContain(name);
    expect(container.textContent).toContain(subTitle);

    const img = container.getElementsByTagName('img');
    expect(img.length).toBe(expected);
    for (let i = 0; i < expected; i++) {
      expect(img[i].src).toBe(
        Array.isArray(src.src) ? src.src[i].src : src.src,
      );
    }
  });
});
