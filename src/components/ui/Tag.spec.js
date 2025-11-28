"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var Tag_1 = require("@/components/ui/Tag");
var react_1 = require("@testing-library/react");
describe('Tag', function () {
    test.each([
        [
            undefined,
            '\x20Tag\x20\x20ｎａｍｅ\x20',
            'primary',
            'Tag\x20\x20ｎａｍｅ',
            'primary',
        ],
        [undefined, 'Tag', 'secondary', 'Tag', 'secondary'],
        ['heart', 'ﾀｸﾞ名', undefined, 'ﾀｸﾞ名', 'secondary'],
    ])('タグが描画される #%#', function (icon, name, color, expectedName, expectedColor) {
        var container = (0, react_1.render)((0, jsx_runtime_1.jsx)(Tag_1.Tag, { icon: icon, name: name, color: color })).container;
        var div = container.getElementsByTagName('div');
        expect(div.length).toBe(1);
        expect(div[0].textContent).toBe(expectedName);
        expect(div[0].className).toBe("badge badge--".concat(expectedColor));
        var svg = div[0].getElementsByTagName('svg');
        expect(svg.length).toBe(icon ? 1 : 0);
    });
});
