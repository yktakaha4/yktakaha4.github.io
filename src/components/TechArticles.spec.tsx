import {render} from "@testing-library/react";
import {TechArticles} from "@/components/TechArticles";


describe('TechArticles', () => {
    describe('スナップショットテスト', () => {
        test('技術記事が描画される', () => {
            const { container } = render(<TechArticles />)
            expect(container).toMatchSnapshot()
        })
    })
})
