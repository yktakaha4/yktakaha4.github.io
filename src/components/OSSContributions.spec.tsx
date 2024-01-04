import { render } from '@testing-library/react';
import { OSSContributions } from '@/components/OSSContributions';

describe('OSSContributions', () => {
  describe('スナップショットテスト', () => {
    test('OSS活動が描画される', () => {
      const { container } = render(<OSSContributions />);
      expect(container).toMatchSnapshot();
    });
  });
});
