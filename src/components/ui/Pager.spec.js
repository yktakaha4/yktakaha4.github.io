"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@testing-library/react");
var Pager_1 = require("@/components/ui/Pager");
var user_event_1 = require("@testing-library/user-event");
var vitest_1 = require("vitest");
describe('getSliceIndex', function () {
    test.each([
        [1, 5, [0, 5]],
        [2, 5, [5, 10]],
    ])('ページに対応するIndexが計算される #%#', function (page, perPage, expected) {
        expect((0, Pager_1.getSliceIndex)(page, perPage)).toStrictEqual(expected);
    });
    describe('バリデーションエラー', function () {
        beforeAll(function () {
            vitest_1.vi.spyOn(console, 'error').mockImplementation(function () { });
        });
        afterAll(function () {
            vitest_1.vi.restoreAllMocks();
        });
        test('ページが一定値を下回る', function () {
            expect(function () {
                (0, Pager_1.getSliceIndex)(0, 5);
            }).toThrow(new Error('page must be greater than or equal to 1'));
        });
    });
});
describe('Pager', function () {
    test.each([
        [1, 5, 3, 0, '«1»'],
        [1, 5, 3, 5, '«1»'],
        [1, 5, 3, 9, '«12»'],
        [1, 5, 3, 10, '«12»'],
        [1, 5, 3, 15, '«123»'],
        [2, 5, 3, 15, '«123»'],
        [3, 5, 3, 15, '«123»'],
        [1, 5, 3, 20, '«123…»'],
        [2, 5, 3, 20, '«123…»'],
        [3, 5, 3, 20, '«…234»'],
        [3, 5, 3, 21, '«…234…»'],
        [3, 5, 3, 25, '«…234…»'],
        [-10, 5, 4, 25, '«1234…»'],
        [10, 5, 4, 25, '«…2345»'],
    ])('ページャーが描画される #%#', function (page, perPage, size, total, expected) {
        var container = (0, react_1.render)((0, jsx_runtime_1.jsx)(Pager_1.Pager, { page: page, perPage: perPage, size: size, total: total })).container;
        expect(container.textContent).toBe(expected);
    });
    test.each([
        ['«', { page: 1 }],
        ['2', { page: 2 }],
        ['3', { page: 3 }],
        ['4', { page: 4 }],
        ['»', { page: 6 }],
    ])('クリック時にイベントが発火する #%#', function (text, expected) { return __awaiter(void 0, void 0, void 0, function () {
        var user, onChange;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = user_event_1.userEvent.setup();
                    onChange = vitest_1.vi.fn();
                    (0, react_1.render)((0, jsx_runtime_1.jsx)(Pager_1.Pager, { page: 3, perPage: 5, size: 3, total: 30, onChange: onChange }));
                    return [4 /*yield*/, user.click(react_1.screen.getByText(text))];
                case 1:
                    _a.sent();
                    expect(onChange.mock.calls.length).toBe(1);
                    expect(onChange.mock.calls[0]).toStrictEqual([expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    describe('バリデーションエラー', function () {
        beforeAll(function () {
            vitest_1.vi.spyOn(console, 'error').mockImplementation(function () { });
        });
        afterAll(function () {
            vitest_1.vi.restoreAllMocks();
        });
        test('サイズが一定値を下回る', function () {
            expect(function () {
                (0, react_1.render)((0, jsx_runtime_1.jsx)(Pager_1.Pager, { page: 1, perPage: 5, size: 2, total: 10 }));
            }).toThrow(new Error('size must be greater than or equal to 3'));
        });
    });
});
