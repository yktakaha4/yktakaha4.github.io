import {render} from "@testing-library/react";
import {createSearchRegexp, createSearchText, Search} from "@/components/ui/Search";
import {userEvent} from "@testing-library/user-event";


describe('createSearchRegexp', () => {
    test.each([
        ['', '/^.*$/'],
        ['\x20\u3000', '/^.*$/'],
        ['Python', '/^(?=.*Python)/i'],
        ['\x20ＰＩＰ\x20\u3000ﾊﾟｲｿﾝ\x20', '/^(?=.*PIP)(?=.*パイソン)/i'],
        ['C++', '/^(?=.*C\\+\\+)/i'],
    ])('正規表現が生成される #%#', (query, expected) => {
        expect(createSearchRegexp(query).toString()).toBe(expected)
    })
})

describe('createSearchText', () => {
    test.each<[Array<string>, string]>([
        [[], ''],
        [['\x20Python\x20\u3000ＰＩＰ\x20\u3000ﾊﾟｲｿﾝ\x20'], 'Python\x20PIP\x20パイソン'],
    ])(`検索テキストが生成される #%#`, (texts, expected) => {
        expect(createSearchText(...texts)).toBe(expected)
    })
})

describe('Search', () => {
    test('検索が描画される', () => {
        const {container} = render(<Search
            query={"Python"}
            children={<div>Children</div>}
        />)
        const nav = container.getElementsByTagName('nav')
        expect(nav.length).toBe(1)
        expect(nav[0].textContent).toBe('Children')

        const input = container.getElementsByTagName('input')
        expect(input.length).toBe(1)
        expect(input[0].value).toBe('Python')
    })

    test('クリック時にイベントが発火する', async () => {
        const user = userEvent.setup()
        const onChange = jest.fn()

        const {container} = render(<Search
            query={"Python"}
            onChange={onChange}
        />)

        const input = container.getElementsByTagName('input')
        expect(input.length).toBe(1)
        await user.type(input[0], ' C#')

        expect(onChange.mock.calls.length).toBe(3)
        expect(onChange.mock.calls[0]).toStrictEqual([{query: 'Python ', current: 'Python'}])
        expect(onChange.mock.calls[1]).toStrictEqual([{query: 'PythonC', current: 'Python'}])
        expect(onChange.mock.calls[2]).toStrictEqual([{query: 'Python#', current: 'Python'}])
    })
})
