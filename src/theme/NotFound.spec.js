"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var NotFound_1 = __importDefault(require("@/theme/NotFound"));
var react_1 = require("@testing-library/react");
describe('NotFound', function () {
    test('リダイレクト表示がおこなれる', function () {
        var container = (0, react_1.render)((0, jsx_runtime_1.jsx)(NotFound_1.default, {})).container;
        expect(container.textContent).toBe('Redirecting...');
        expect(window.location.href).toBe('http://localhost:3000/');
    });
});
