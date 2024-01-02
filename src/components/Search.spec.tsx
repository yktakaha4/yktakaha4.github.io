import {render} from "@testing-library/react";
import {Search} from "@/components/Search";
import {userEvent} from "@testing-library/user-event";


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
