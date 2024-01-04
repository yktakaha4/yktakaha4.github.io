import {render} from "@testing-library/react";
import {ProfileImages} from "@/components/ProfileImages";

describe('ProfileImages', () => {
    describe('スナップショットテスト', () => {
        test('プロフィール画像が描画される', () => {
            const { container } = render(<ProfileImages />)
            expect(container).toMatchSnapshot()
        })
    })
})
