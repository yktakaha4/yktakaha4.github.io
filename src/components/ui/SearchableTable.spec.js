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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var SearchableTable_1 = require("@/components/ui/SearchableTable");
var react_1 = require("@testing-library/react");
var dayjs_1 = __importDefault(require("dayjs"));
var user_event_1 = require("@testing-library/user-event");
var vitest_1 = require("vitest");
describe('createSearchRegexp', function () {
    test.each([
        ['', '/^.*$/'],
        ['\x20\u3000', '/^.*$/'],
        ['Python', '/^(?=.*Python)/i'],
        ['\x20ＰＩＰ\x20\u3000ﾊﾟｲｿﾝ\x20', '/^(?=.*PIP)(?=.*パイソン)/i'],
        ['C++', '/^(?=.*C\\+\\+)/i'],
    ])('正規表現が生成される #%#', function (query, expected) {
        expect((0, SearchableTable_1.createSearchRegexp)(query).toString()).toBe(expected);
    });
    test.each([
        ['', '', true],
        ['\u3000', 'Python', true],
        ['', 'Python', true],
        ['Python', 'pythonista', true],
        ['Python Python', 'pythonista', true],
        ['\x20Java\x20\x20C++\u3000\x20', 'python JAVA c# c++', true],
        ['\x20Java\x20\x20C++\u3000\x20', 'c++ python c# JAVA', true],
        ['\x20Java\x20\x20C++\u3000\x20', 'c# c+', false],
        ['python', '', false],
        ['pythonista', 'python istanbul', false],
        ['python istanbul', 'pythonista', false],
    ])("\u6587\u5B57\u5217\u306B\u30DE\u30C3\u30C1\u3059\u308B #%#", function (pattern, string, expected) {
        var regexp = (0, SearchableTable_1.createSearchRegexp)(pattern);
        expect(regexp.test(string)).toBe(expected);
    });
});
describe('createSearchText', function () {
    test.each([
        [[], ''],
        [[''], ''],
        [
            ['\x20Python\x20\u3000ＰＩＰ\x20\u3000ﾊﾟｲｿﾝ\x20'],
            'Python\x20PIP\x20パイソン',
        ],
    ])("\u691C\u7D22\u30C6\u30AD\u30B9\u30C8\u304C\u751F\u6210\u3055\u308C\u308B #%#", function (texts, expected) {
        expect(SearchableTable_1.createSearchText.apply(void 0, texts)).toBe(expected);
    });
});
describe('SearchableTable', function () {
    var time = (0, dayjs_1.default)('2112-09-03T12:34:56+09:00').toDate();
    var headers = [
        {
            label: 'Name',
        },
        {
            label: 'Description',
        },
        {
            label: 'Amount',
        },
        {
            label: 'Time',
        },
        {
            label: 'Tags',
        },
    ];
    var items = Array.from({ length: 100 }, function (_, i) { return ({
        name: "Item [".concat(i, "]"),
        description: "Description ".concat(i),
        url: "https://example.com/".concat(i),
        amount: 100 * i,
        time: (0, dayjs_1.default)(time).add(i, 'day').toDate(),
        tags: ["Tag".concat(100 * i), "Tag".concat(100 * i + 1)],
    }); });
    var searchTexts = function (item) { return [item.name, item.description]; };
    var row = function (item) { return [
        {
            type: 'string',
            value: item.name,
            link: {
                href: item.url,
                type: 'external',
            },
        },
        {
            type: 'string',
            value: item.description,
        },
        {
            type: 'number',
            value: item.amount,
        },
        {
            type: 'date',
            value: item.time,
        },
        {
            type: 'tags',
            values: item.tags.map(function (tag) { return ({
                value: tag,
            }); }),
        },
    ]; };
    test('テーブルが描画される', function () {
        var container = (0, react_1.render)((0, jsx_runtime_1.jsx)(SearchableTable_1.SearchableTable, { headers: headers, items: items, searchTexts: searchTexts, row: row })).container;
        expect(container.textContent).toContain('100 件');
        expect(container.textContent).toContain('Item [1]');
        expect(container.textContent).toContain('Item [9]');
        expect(container.textContent).not.toContain('Item [10]');
    });
    test('検索によって行を絞り込める', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, container, input;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = user_event_1.userEvent.setup();
                    container = (0, react_1.render)((0, jsx_runtime_1.jsx)(SearchableTable_1.SearchableTable, { headers: headers, items: items, searchTexts: searchTexts, row: row })).container;
                    expect(container.textContent).toContain('100 件');
                    input = container.getElementsByTagName('input')[0];
                    expect(input.value).toBe('');
                    return [4 /*yield*/, user.type(container.getElementsByTagName('input')[0], 'Item 1')];
                case 1:
                    _a.sent();
                    expect(input.value).toBe('Item 1');
                    expect(container.textContent).toContain('19 件');
                    expect(container.textContent).toContain('Item [1]');
                    expect(container.textContent).not.toContain('Item [9]');
                    expect(container.textContent).toContain('Item [10]');
                    return [2 /*return*/];
            }
        });
    }); });
    test('ページングによって異なる行を表示できる', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, container, input;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = user_event_1.userEvent.setup();
                    container = (0, react_1.render)((0, jsx_runtime_1.jsx)(SearchableTable_1.SearchableTable, { headers: headers, items: items, searchTexts: searchTexts, row: row })).container;
                    expect(container.textContent).toContain('100 件');
                    input = react_1.screen.getByText('»');
                    return [4 /*yield*/, user.click(input)];
                case 1:
                    _a.sent();
                    expect(container.textContent).toContain('100 件');
                    expect(container.textContent).not.toContain('Item [89]');
                    expect(container.textContent).toContain('Item [90]');
                    expect(container.textContent).toContain('Item [99]');
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
        test('headersが空の場合はエラーが発生する', function () {
            expect(function () {
                return (0, react_1.render)((0, jsx_runtime_1.jsx)(SearchableTable_1.SearchableTable, { headers: [], items: [], searchTexts: function () { return []; }, row: function () { return []; } }));
            }).toThrow('headers must not be empty');
        });
    });
});
