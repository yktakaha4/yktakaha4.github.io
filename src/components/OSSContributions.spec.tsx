import ossContributions from '@/components/data/ossContributions.json';
import { render } from '@testing-library/react';
import { OSSContributions } from '@/components/OSSContributions';

jest.mock('@/components/data/ossContributions.json', () => {
  const itemsCount = 30;
  const baseDate = new Date('2020-01-01');
  const kinds = ['mergedPullRequest'];
  const languages = ['Python', 'TypeScript', 'Go', 'JavaScript'];

  const mockedOssContributions: typeof ossContributions = {
    contributions: [...Array(itemsCount)].map((_, i) => {
      const date = new Date(baseDate);
      date.setDate(date.getDate() - i * i);
      return {
        title: `Contribution #${i}`,
        url: `https://example.com/user${i}/repo${i}/pull/${i}`,
        kind: kinds[i % kinds.length],
        mergedAt: date.toISOString(),
        repository: {
          owner: `user${i}`,
          name: `user${i}/repo${i}`,
          stars: 123 * i,
          url: `https://github.com/user${i}/repo${i}`,
          languages: languages.slice(
            i % languages.length,
            (i * i) % languages.length,
          ),
        },
      };
    }),
  };
  return mockedOssContributions;
});

describe('OSSContributions', () => {
  describe('スナップショットテスト', () => {
    test('OSS活動が描画される', () => {
      const { container } = render(<OSSContributions />);
      expect(container).toMatchSnapshot();
    });
  });
});
