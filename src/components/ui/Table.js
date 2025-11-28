"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = exports.decorate = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var dayjs_1 = __importDefault(require("dayjs"));
var Tag_1 = require("@/components/ui/Tag");
var Link_1 = __importDefault(require("@docusaurus/Link"));
var decorate = function (value, options) {
    if (options.link) {
        var text = value || '#';
        var _a = options.link, href = _a.href, type = _a.type;
        if (type === 'external') {
            return ((0, jsx_runtime_1.jsx)(Link_1.default, { to: href, target: "_blank", rel: "noopener noreferrer", children: text }));
        }
        return (0, jsx_runtime_1.jsx)(Link_1.default, { to: href, children: text });
    }
    else {
        return value;
    }
};
exports.decorate = decorate;
var Table = function (_a) {
    var headers = _a.headers, rows = _a.rows;
    for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
        var row = rows_1[_i];
        if (row.length !== headers.length) {
            throw new Error('The number of cells in the row does not match the number of headers');
        }
    }
    return ((0, jsx_runtime_1.jsxs)("table", { style: { margin: 0 }, children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsx)("tr", { children: headers.map(function (_a, i) {
                        var textAlign = _a.align, width = _a.width, label = _a.label;
                        return ((0, jsx_runtime_1.jsx)("th", { style: { textAlign: textAlign, width: width }, children: label !== null && label !== void 0 ? label : '' }, i));
                    }) }) }), (0, jsx_runtime_1.jsxs)("tbody", { children: [rows.length === 0 && ((0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", { style: { textAlign: 'center' }, colSpan: headers.length, children: "No data" }) })), rows.map(function (row, i) { return ((0, jsx_runtime_1.jsx)("tr", { children: row.map(function (cell, j) {
                            var _a, _b;
                            if (cell.type === 'number') {
                                var numberFormat = (_a = cell.format) !== null && _a !== void 0 ? _a : new Intl.NumberFormat();
                                if (cell.value != null) {
                                    var value = (0, exports.decorate)(numberFormat.format(cell.value), cell);
                                    return (0, jsx_runtime_1.jsx)("td", { children: value }, j);
                                }
                            }
                            else if (cell.type === 'date') {
                                if (cell.value) {
                                    var format = (_b = cell.format) !== null && _b !== void 0 ? _b : 'YYYY/M/D';
                                    var value = (0, exports.decorate)((0, dayjs_1.default)(cell.value).format(format), cell);
                                    return (0, jsx_runtime_1.jsx)("td", { children: value }, j);
                                }
                            }
                            else if (cell.type === 'tags') {
                                return ((0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("div", { style: {
                                            display: 'flex',
                                            gap: '0.2rem',
                                            flexWrap: 'wrap',
                                        }, children: cell.values.map(function (_a, k) {
                                            var icon = _a.icon, value = _a.value, color = _a.color;
                                            return ((0, jsx_runtime_1.jsx)(Tag_1.Tag, { icon: icon, name: value, color: color }, k));
                                        }) }) }, j));
                            }
                            else {
                                var value = (0, exports.decorate)(cell.value, cell);
                                return (0, jsx_runtime_1.jsx)("td", { children: value }, j);
                            }
                            return (0, jsx_runtime_1.jsx)("td", {}, j);
                        }) }, i)); })] })] }));
};
exports.Table = Table;
