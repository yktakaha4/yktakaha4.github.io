import { render } from '@testing-library/react';
import { Break } from '@/components/ui/Break';

describe('Break', () => {
  test('区切り線が表示される', () => {
    const { container } = render(<Break line />);

    expect(container.textContent).toBe('');

    const hr = container.getElementsByTagName('hr');
    expect(hr.length).toBe(1);
  });

  test('改ページが表示される', () => {
    const { container } = render(<Break page />);

    expect(container.textContent).toBe('');

    const div = container.getElementsByTagName('div');
    expect(div.length).toBe(1);
    expect(div[0].style.pageBreakAfter).toBe('always');
  });
});
