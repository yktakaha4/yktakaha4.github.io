import { render } from '@testing-library/react';
import { TechArticles } from '@/components/TechArticles';
import techArticles from '@/components/data/techArticles.json';

jest.mock('@/components/data/techArticles.json', () => {
  const itemsCount = 30;
  const baseDate = new Date('2020-01-01');
  const publishers = ['zenn', 'qiita', 'note'];
  const tags = ['Python', 'TypeScript', 'Go', 'JavaScript'];

  const mockedTechArticles: typeof techArticles = {
    articles: [...Array(itemsCount)].map((_, i) => {
      const date = new Date(baseDate);
      date.setDate(date.getDate() - i * i);
      return {
        "title": `Article title ${i}`,
        "url": `https://example.com/articles/${i}`,
        "publishedAt": date.toISOString(),
        "likes": 123 * i,
        "publisher": publishers[i % publishers.length],
        "tags": tags.slice(
            i % tags.length,
            (i * i) % tags.length,
        )
      };
    }),
  };
  return mockedTechArticles;
});

describe('TechArticles', () => {
  describe('スナップショットテスト', () => {
    test('技術記事が描画される', () => {
      const { container } = render(<TechArticles />);
      expect(container).toMatchSnapshot();
    });
  });
});
