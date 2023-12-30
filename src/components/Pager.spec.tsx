import { render, screen } from '@testing-library/react';
import { Pager } from '@/components/Pager';
import { userEvent } from '@testing-library/user-event';

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
        const { container } = render(<Pager page={page} perPage={perPage} size={size} total={total}/>);
        const ul = container.getElementsByTagName('ul')
        expect(ul.length).toBe(1);
        expect(ul[0].textContent).toBe(expected);
    })

    test.each([
        ['«', { page: 1 }],
        ['2', { page: 2 }],
        ['3', { page: 3 }],
        ['4', { page: 4 }],
        ['»', { page: 6 }],
    ])('クリック時にイベントが発火する #%#', async (text, expected) => {
        const user = userEvent.setup()
        const onChange = jest.fn()

        render(<Pager
            page={3}
            perPage={5}
            size={3}
            total={30}
            onChange={onChange}
        />);

        await user.click(screen.getByText(text))
        expect(onChange.mock.calls.length).toBe(1)
        expect(onChange.mock.calls[0]).toStrictEqual([expected])
    })
})
