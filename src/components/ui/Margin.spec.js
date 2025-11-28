"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@testing-library/react");
var Margin_1 = require("@/components/ui/Margin");
describe('Margin', function () {
    test('コンテンツが描画される', function () {
        var container = (0, react_1.render)((0, jsx_runtime_1.jsx)(Margin_1.Margin, { children: (0, jsx_runtime_1.jsx)("span", { children: "Hello" }) })).container;
        expect(container.textContent).toBe('Hello');
        var span = container.getElementsByTagName('span');
        expect(span.length).toBe(1);
    });
});
