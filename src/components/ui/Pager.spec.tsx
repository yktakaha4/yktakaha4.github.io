import { render, screen } from '@testing-library/react';
import { getSliceIndex, Pager } from '@/components/ui/Pager';
import { userEvent } from '@testing-library/user-event';

describe('getSliceIndex', () => {
  test.each([
    [1, 5, [0, 5]],
    [2, 5, [5, 10]],
  ])('ページに対応するIndexが計算される #%#', (page, perPage, expected) => {
    expect(getSliceIndex(page, perPage)).toStrictEqual(expected);
  });

  describe('バリデーションエラー', () => {
    beforeAll(() => {
      jest.spyOn(console, 'error').mockImplementation();
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    test('ページが一定値を下回る', () => {
      expect(() => {
        getSliceIndex(0, 5);
      }).toThrow(new Error('page must be greater than or equal to 1'));
    });
  });
});

describe('Pager', () => {
  test.each([
    [1, 5, 3, 0, '«1»'],
    [1, 5, 3, 5, '«1»'],
    [1, 5, 3, 9, '«12»'],
    [1, 5, 3, 10, '«12»'],
    [1, 5, 3, 15, '«123»'],
    [2, 5, 3, 15, '«123»'],
    [3, 5, 3, 15, '«123»'],
    [1, 5, 3, 20, '«123…»'],
    [2, 5, 3, 20, '«123…»'],
    [3, 5, 3, 20, '«…234»'],
    [3, 5, 3, 21, '«…234…»'],
    [3, 5, 3, 25, '«…234…»'],
    [-10, 5, 4, 25, '«1234…»'],
    [10, 5, 4, 25, '«…2345»'],
  ])('ページャーが描画される #%#', (page, perPage, size, total, expected) => {
    const { container } = render(
      <Pager page={page} perPage={perPage} size={size} total={total} />,
    );
    expect(container.textContent).toBe(expected);
  });

  test.each([
    ['«', { page: 1 }],
    ['2', { page: 2 }],
    ['3', { page: 3 }],
    ['4', { page: 4 }],
    ['»', { page: 6 }],
  ])('クリック時にイベントが発火する #%#', async (text, expected) => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(
      <Pager page={3} perPage={5} size={3} total={30} onChange={onChange} />,
    );

    await user.click(screen.getByText(text));
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0]).toStrictEqual([expected]);
  });

  describe('バリデーションエラー', () => {
    beforeAll(() => {
      jest.spyOn(console, 'error').mockImplementation();
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    test('サイズが一定値を下回る', () => {
      expect(() => {
        render(<Pager page={1} perPage={5} size={2} total={10} />);
      }).toThrow(new Error('size must be greater than or equal to 3'));
    });
  });
});
