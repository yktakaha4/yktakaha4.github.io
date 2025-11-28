"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@testing-library/react");
var Timestamp_1 = require("@/components/ui/Timestamp");
var dayjs_1 = __importDefault(require("dayjs"));
var vitest_1 = require("vitest");
describe('Timestamp', function () {
    test('更新時刻とコミットハッシュが描画される', function () {
        var mockedDate = (0, dayjs_1.default)('2021-02-03 12:34:56').toDate();
        vitest_1.vi.spyOn(global, 'Date').mockImplementation(function () { return mockedDate; });
        var container = (0, react_1.render)((0, jsx_runtime_1.jsx)(Timestamp_1.Timestamp, {})).container;
        expect(container.textContent).toBe("\u6700\u7D42\u66F4\u65B0\u65E5:2021-02-03T12:34:56+09:00Version:dummy_commit_hash");
    });
});
