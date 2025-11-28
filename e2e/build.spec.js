"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = __importDefault(require("fs-extra"));
var dayjs_1 = __importDefault(require("dayjs"));
var helper_1 = require("./helper");
var buildFilePath = function (filePath) {
    return "".concat(helper_1.rootDirectoryName, "/build/").concat(filePath);
};
describe('index.html', function () {
    beforeEach(function () {
        var filePath = buildFilePath('index.html');
        document.documentElement.innerHTML = fs_extra_1.default.readFileSync(filePath, 'utf8');
    });
    test.each([['title', 'Portfolio | yktakaha4.github.io']])('textContentが適切に描画される #%#', function (selector, expected) {
        var elements = Array.from(document.querySelectorAll(selector));
        expect(elements.length).toBeGreaterThan(0);
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            expect(element.textContent).toBe(expected);
        }
    });
    test.each([
        [
            'meta[property="description"], meta[name="description"], meta[property="og:description"]',
            'content',
            'yktakaha4のポートフォリオサイト',
        ],
    ])('属性値が適切に描画される #%#', function (selector, propertyName, expected) {
        var elements = Array.from(document.querySelectorAll(selector));
        expect(elements.length).toBeGreaterThan(0);
        for (var _i = 0, elements_2 = elements; _i < elements_2.length; _i++) {
            var element = elements_2[_i];
            expect(element[propertyName]).toBe(expected);
        }
    });
    test.each(['yktakaha4.github.io', '«123…»', "\u00A9 ".concat((0, dayjs_1.default)().format('YYYY'))])('特定の値が文章内に含まれる #%#', function (expected) {
        expect(document.documentElement.textContent).toContain(expected);
    });
    test.each(["\u6700\u7D42\u66F4\u65B0\u65E5:".concat((0, dayjs_1.default)().format())])('特定の値が文章内に含まれない #%#', function (expected) {
        expect(document.documentElement.textContent).not.toContain(expected);
    });
});
