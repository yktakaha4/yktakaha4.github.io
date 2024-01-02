import {Avatar} from "@/components/ui/Avatar";
import {render} from "@testing-library/react";


describe('Avatar', () => {
    test.each([
        ['name', 'sub title', 'https://example.com/image1.png', 1],
        ['name', 'sub title', ['https://example.com/image1.png', 'https://example.com/image2.png'], 2],
    ])('画像が表示される #%#', async (name, subTitle, src, expected) => {
        const { container } = render(<Avatar name={name} subTitle={subTitle} src={src} />)

        expect(container.textContent).toContain(name)
        expect(container.textContent).toContain(subTitle)

        const img = container.getElementsByTagName('img')
        expect(img.length).toBe(expected)
        for (let i = 0; i < expected; i++) {
            expect(img[i].src).toBe(Array.isArray(src) ? src[i] : src)
        }

    })
})
