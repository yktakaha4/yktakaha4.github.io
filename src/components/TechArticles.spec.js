"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@testing-library/react");
var TechArticles_1 = require("@/components/TechArticles");
var vitest_1 = require("vitest");
vitest_1.vi.mock('@/components/data/techArticles.json', function () {
    var itemsCount = 30;
    var baseDate = new Date('2020-01-01');
    var publishers = ['zenn', 'qiita', 'note'];
    var tags = ['Python', 'TypeScript', 'Go', 'JavaScript'];
    var mockedTechArticles = {
        articles: __spreadArray([], Array(itemsCount), true).map(function (_, i) {
            var date = new Date(baseDate);
            date.setDate(date.getDate() - i * i);
            return {
                title: "Article title ".concat(i),
                url: "https://example.com/articles/".concat(i),
                publishedAt: date.toISOString(),
                likes: 123 * i,
                publisher: publishers[i % publishers.length],
                tags: tags.slice(i % tags.length, (i * i) % tags.length),
            };
        }),
    };
    return {
        default: mockedTechArticles,
    };
});
describe('TechArticles', function () {
    describe('スナップショットテスト', function () {
        test('技術記事が描画される', function () {
            var container = (0, react_1.render)((0, jsx_runtime_1.jsx)(TechArticles_1.TechArticles, {})).container;
            expect(container).toMatchSnapshot();
        });
    });
});
