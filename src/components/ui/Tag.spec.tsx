import {Tag, TagColor} from "@/components/ui/Tag";
import {render} from "@testing-library/react";


describe('Tag', () => {
    test.each<[string, TagColor, string, string]>([
        ['\x20Tag\x20\x20ｎａｍｅ\x20', 'primary', 'Tag\x20\x20ｎａｍｅ', 'primary'],
        ['Tag', 'secondary', 'Tag', 'secondary'],
        ['ﾀｸﾞ名', undefined, 'ﾀｸﾞ名', 'secondary'],
    ])('タグが描画される #%#', (name, color, expectedName, expectedColor) => {
        const {container} = render(<Tag name={name} color={color}/>)
        const span = container.getElementsByTagName('span')
        expect(span.length).toBe(1)
        expect(span[0].textContent).toBe(expectedName)
        expect(span[0].className).toBe(`badge badge--${expectedColor}`)
    })
})
