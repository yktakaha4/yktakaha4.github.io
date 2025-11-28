"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@testing-library/react");
var Table_1 = require("@/components/ui/Table");
var vitest_1 = require("vitest");
describe('decorate', function () {
    test.each([
        ['', { link: { href: '' } }, '#', 'http://localhost:3000/'],
        [
            'text',
            { link: { href: '#anchor' } },
            'text',
            'http://localhost:3000/#anchor',
        ],
        [
            'text',
            {
                link: { type: 'external', href: 'https://example.com/path?q=v#anchor' },
            },
            'text',
            'https://example.com/path?q=v#anchor',
        ],
    ])("\u30EA\u30F3\u30AF\u304C\u63CF\u753B\u3055\u308C\u308B #%#", function (value, options, text, href) {
        var container = (0, react_1.render)((0, jsx_runtime_1.jsx)(Table_1.Table, { headers: [{}], rows: [[__assign({ value: value }, options)]] })).container;
        var table = container.getElementsByTagName('table');
        expect(table.length).toBe(1);
        expect(table[0].textContent).toBe(text);
        var a = container.getElementsByTagName('a');
        expect(a.length).toBe(1);
        expect(a[0].href).toBe(href);
    });
});
describe('Table', function () {
    test.each([
        [{}, ''],
        [{ label: 'Head' }, 'Head'],
    ])('ヘッダーが描画される #%#', function (header, expected) {
        var container = (0, react_1.render)((0, jsx_runtime_1.jsx)(Table_1.Table, { headers: [header], rows: [[{ value: '' }]] })).container;
        var table = container.getElementsByTagName('table');
        expect(table.length).toBe(1);
        expect(table[0].textContent).toBe(expected);
    });
    test.each([
        [{ value: null }, ''],
        [{ value: undefined }, ''],
        [{ value: '' }, ''],
        [{ value: 'abc' }, 'abc'],
        [{ value: 'def', type: 'string' }, 'def'],
    ])('文字列が描画される #%#', function (cell, expected) {
        var container = (0, react_1.render)((0, jsx_runtime_1.jsx)(Table_1.Table, { headers: [{}], rows: [[cell]] })).container;
        var table = container.getElementsByTagName('table');
        expect(table.length).toBe(1);
        expect(table[0].textContent).toBe(expected);
    });
    test.each([
        [{ type: 'number', value: null }, ''],
        [{ type: 'number', value: undefined }, ''],
        [{ type: 'number', value: 0 }, '0'],
        [{ type: 'number', value: 0.0 }, '0'],
        [{ type: 'number', value: 1234 }, '1,234'],
        [{ type: 'number', value: 0.987654321 }, '0.988'],
        [
            {
                type: 'number',
                value: 0.987,
                format: new Intl.NumberFormat('ja-JP', { style: 'percent' }),
            },
            '99%',
        ],
    ])('数値が描画される #%#', function (cell, expected) {
        var container = (0, react_1.render)((0, jsx_runtime_1.jsx)(Table_1.Table, { headers: [{}], rows: [[cell]] })).container;
        var table = container.getElementsByTagName('table');
        expect(table.length).toBe(1);
        expect(table[0].textContent).toBe(expected);
    });
    test.each([
        [{ type: 'date', value: null }, ''],
        [{ type: 'date', value: undefined }, ''],
        [{ type: 'date', value: new Date('2021-01-02') }, '2021/1/2'],
        [
            { type: 'date', value: new Date('2112-09-03'), format: 'YYYY/M/D' },
            '2112/9/3',
        ],
        [
            { type: 'date', value: new Date('2112-09-03'), format: 'YYYY/M' },
            '2112/9',
        ],
    ])('日付が描画される #%#', function (cell, expected) {
        var container = (0, react_1.render)((0, jsx_runtime_1.jsx)(Table_1.Table, { headers: [{}], rows: [[cell]] })).container;
        var table = container.getElementsByTagName('table');
        expect(table.length).toBe(1);
        expect(table[0].textContent).toBe(expected);
    });
    test.each([
        [{ type: 'tags', values: [] }, ''],
        [
            {
                type: 'tags',
                values: [{ value: 'Tag1' }, { value: 'Tag2', color: 'primary' }],
            },
            'Tag1Tag2',
        ],
    ])("\u30BF\u30B0\u304C\u63CF\u753B\u3055\u308C\u308B #%#", function (cell, expected) {
        var container = (0, react_1.render)((0, jsx_runtime_1.jsx)(Table_1.Table, { headers: [{}], rows: [[cell]] })).container;
        var table = container.getElementsByTagName('table');
        expect(table.length).toBe(1);
        expect(table[0].textContent).toBe(expected);
    });
    test('複数カラムを持つテーブルが描画される', function () {
        var headers = [
            { label: 'Head1' },
            { label: 'Head2' },
            { label: 'Head3' },
        ];
        var rows = [
            [
                { value: 'Row1Cell1' },
                {
                    value: 'Row1Cell2',
                    type: 'string',
                    link: { href: 'https://example.com/', type: 'external' },
                },
                { type: 'tags', values: [] },
            ],
            [
                { value: 54345, type: 'number' },
                { value: new Date('2112-9-3'), type: 'date' },
                {
                    type: 'tags',
                    values: [{ value: 'Tag1' }, { value: 'Tag2', color: 'primary' }],
                },
            ],
        ];
        var container = (0, react_1.render)((0, jsx_runtime_1.jsx)(Table_1.Table, { headers: headers, rows: rows })).container;
        var table = container.getElementsByTagName('table');
        expect(table.length).toBe(1);
        expect(table[0].textContent).toBe('Head1Head2Head3Row1Cell1Row1Cell254,3452112/9/3Tag1Tag2');
        var a = container.getElementsByTagName('a');
        expect(a.length).toBe(1);
        expect(a[0].href).toBe('https://example.com/');
        expect(a[0].target).toBe('_blank');
        expect(a[0].rel).toBe('noopener noreferrer');
    });
    test('行が空の場合でもテーブルが描画される', function () {
        var headers = [{ label: 'Head1' }, { label: 'Head2' }];
        var container = (0, react_1.render)((0, jsx_runtime_1.jsx)(Table_1.Table, { headers: headers, rows: [] })).container;
        var table = container.getElementsByTagName('table');
        expect(table.length).toBe(1);
        expect(table[0].textContent).toBe('Head1Head2No data');
    });
    describe('バリデーションエラー', function () {
        beforeAll(function () {
            vitest_1.vi.spyOn(console, 'error').mockImplementation(function () { });
        });
        afterAll(function () {
            vitest_1.vi.restoreAllMocks();
        });
        test('ヘッダと行の長さが一致しない', function () {
            var headers = [{ label: 'a' }, { label: 'b' }];
            var rows = [[{ value: 'a' }]];
            expect(function () {
                (0, react_1.render)((0, jsx_runtime_1.jsx)(Table_1.Table, { headers: headers, rows: rows }));
            }).toThrow(new Error('The number of cells in the row does not match the number of headers'));
        });
    });
});
