import NotFound from '@/theme/NotFound';
import { render } from '@testing-library/react';

describe('NotFound', () => {
  test('リダイレクト表示がおこなれる', () => {
    const { container } = render(<NotFound />);
    expect(container.textContent).toBe('Redirecting...');
    expect(window.location.href).toBe('http://localhost/');
  });
});
