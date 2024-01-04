import {render} from "@testing-library/react";
import {Break} from "@/components/ui/Break";
import {Margin} from "@/components/ui/Margin";


describe('Margin', () => {
    test('コンテンツが描画される', () => {
        const { container } = render(<Margin children={<span>Hello</span>} />)

        expect(container.textContent).toBe('Hello')

        const span = container.getElementsByTagName('span')
        expect(span.length).toBe(1)
    })
})
