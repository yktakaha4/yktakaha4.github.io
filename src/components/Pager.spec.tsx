import { render } from '@testing-library/react';
import { Pager } from '@/components/Pager';

describe('Pager', () => {
    test.each([
        [1, 5, 3, 15, '«123»'],
        [2, 5, 3, 15, '«123»'],
        [3, 5, 3, 15, '«123»'],
        [1, 5, 3, 20, '«123…»'],
        [2, 5, 3, 20, '«123…»'],
        [3, 5, 3, 20, '«…234»'],
        [3, 5, 3, 25, '«…234…»'],
        [-10, 5, 4, 25, '«1234…»'],
        [10, 5, 4, 25, '«…2345»'],
    ])('ページャーが描画される #%#', (page, perPage, size, total, expected) => {
        const { container } = render(<Pager page={page} perPage={perPage} size={size} total={total}/>);
        const ul = container.getElementsByTagName('ul')
        expect(ul.length).toBe(1);
        expect(ul[0].textContent).toBe(expected);
    })
})
