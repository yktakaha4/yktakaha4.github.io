"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var Search = function (_a) {
    var query = _a.query, totalCount = _a.totalCount, onChange = _a.onChange, children = _a.children;
    var handleChange = function (e) {
        e.preventDefault();
        if (onChange) {
            onChange({
                query: e.target.value,
                current: query,
            });
        }
    };
    return ((0, jsx_runtime_1.jsx)("nav", { className: "navbar", style: {
            margin: 0,
            padding: 0,
            backgroundColor: 'transparent',
            boxShadow: 'none',
            height: 'inherit',
        }, children: (0, jsx_runtime_1.jsxs)("div", { className: "navbar__inner", children: [(0, jsx_runtime_1.jsxs)("div", { className: "navbar__items", children: [(0, jsx_runtime_1.jsx)("div", { className: "navbar__search", children: (0, jsx_runtime_1.jsx)("input", { type: "text", className: "navbar__search-input", onChange: handleChange, maxLength: 100, value: query, placeholder: '検索' }) }), totalCount != null && ((0, jsx_runtime_1.jsxs)("div", { className: "navbar__item", children: [totalCount.toLocaleString(), " \u4EF6"] }))] }), (0, jsx_runtime_1.jsx)("div", { className: "navbar__items navbar__items--right", children: (0, jsx_runtime_1.jsx)("div", { className: "navbar__item", children: children }) })] }) }));
};
exports.Search = Search;
