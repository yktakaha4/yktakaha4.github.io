import NotFound from '@/theme/NotFound';
import { render } from '@testing-library/react';

describe('NotFound', () => {
  test('リダイレクトする', () => {
    window.location.replace('/not-found');
    expect(window.location.href).toBe('http://localhost/not-found');

    const { container } = render(<NotFound />);
    expect(container.textContent).toBe('Redirecting...');
    expect(window.location.href).toBe('http://localhost/');
  });
});
