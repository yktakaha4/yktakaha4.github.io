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
var OSSContributions_1 = require("@/components/OSSContributions");
var vitest_1 = require("vitest");
vitest_1.vi.mock('@/components/data/ossContributions.json', function () {
    var itemsCount = 30;
    var baseDate = new Date('2020-01-01');
    var kinds = ['mergedPullRequest'];
    var languages = ['Python', 'TypeScript', 'Go', 'JavaScript'];
    var mockedOssContributions = {
        contributions: __spreadArray([], Array(itemsCount), true).map(function (_, i) {
            var date = new Date(baseDate);
            date.setDate(date.getDate() - i * i);
            return {
                title: "Contribution #".concat(i),
                url: "https://example.com/user".concat(i, "/repo").concat(i, "/pull/").concat(i),
                kind: kinds[i % kinds.length],
                mergedAt: date.toISOString(),
                changedLines: 8 * i,
                repository: {
                    owner: "user".concat(i),
                    name: "user".concat(i, "/repo").concat(i),
                    stars: 123 * i,
                    url: "https://github.com/user".concat(i, "/repo").concat(i),
                    languages: languages.slice(i % languages.length, (i * i) % languages.length),
                },
            };
        }),
    };
    return {
        default: mockedOssContributions,
    };
});
describe('OSSContributions', function () {
    describe('スナップショットテスト', function () {
        test('OSS活動が描画される', function () {
            var container = (0, react_1.render)((0, jsx_runtime_1.jsx)(OSSContributions_1.OSSContributions, {})).container;
            expect(container).toMatchSnapshot();
        });
    });
});
