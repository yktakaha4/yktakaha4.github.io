"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@testing-library/react");
var Break_1 = require("@/components/ui/Break");
describe('Break', function () {
    test('区切り線が表示される', function () {
        var container = (0, react_1.render)((0, jsx_runtime_1.jsx)(Break_1.Break, { line: true })).container;
        expect(container.textContent).toBe('');
        var hr = container.getElementsByTagName('hr');
        expect(hr.length).toBe(1);
    });
    test('改ページが表示される', function () {
        var container = (0, react_1.render)((0, jsx_runtime_1.jsx)(Break_1.Break, { page: true })).container;
        expect(container.textContent).toBe('');
        var div = container.getElementsByTagName('div');
        expect(div.length).toBe(1);
        expect(div[0].style.pageBreakAfter).toBe('always');
    });
});
