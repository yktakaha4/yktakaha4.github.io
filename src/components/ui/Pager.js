"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pager = exports.getSliceIndex = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var Link_1 = __importDefault(require("@docusaurus/Link"));
var getSliceIndex = function (page, perPage) {
    if (page < 1) {
        throw new Error("page must be greater than or equal to 1");
    }
    return [(page - 1) * perPage, page * perPage];
};
exports.getSliceIndex = getSliceIndex;
var Pager = function (_a) {
    var page = _a.page, perPage = _a.perPage, total = _a.total, size = _a.size, onChange = _a.onChange;
    var minSize = 3;
    if (size < minSize) {
        throw new Error("size must be greater than or equal to ".concat(minSize));
    }
    var totalPages = Math.ceil(total / perPage);
    var currentPage = Math.min(Math.max(1, page), totalPages);
    var startPage = Math.min(Math.max(1, currentPage - Math.floor(size / 2)), Math.max(totalPages - size + 1, 1));
    var pagesLength = Math.max(1, Math.min(size, totalPages));
    var pages = Array.from({ length: pagesLength }).map(function (_, i) { return startPage + i; });
    var handleClick = function (p) {
        return function (e) {
            e.preventDefault();
            if (onChange) {
                onChange({ page: p });
            }
        };
    };
    return ((0, jsx_runtime_1.jsxs)("ul", { className: "pagination", style: { margin: 0 }, children: [(0, jsx_runtime_1.jsx)("li", { className: "pagination__item", children: (0, jsx_runtime_1.jsx)(Link_1.default, { className: "pagination__link", to: "#", onClick: handleClick(1), children: "\u00AB" }) }), pages.length > 1 && pages[0] !== 1 && ((0, jsx_runtime_1.jsx)("li", { className: "pagination__item", children: (0, jsx_runtime_1.jsx)("span", { children: "\u2026" }) })), pages.map(function (p) { return ((0, jsx_runtime_1.jsx)("li", { className: "pagination__item ".concat(p === currentPage ? 'pagination__item--active' : ''), children: (0, jsx_runtime_1.jsx)(Link_1.default, { className: "pagination__link", to: "#", onClick: handleClick(p), children: p }) }, p)); }), pages.length > 1 && pages[pages.length - 1] !== totalPages && ((0, jsx_runtime_1.jsx)("li", { className: "pagination__item", children: (0, jsx_runtime_1.jsx)("span", { children: "\u2026" }) })), (0, jsx_runtime_1.jsx)("li", { className: "pagination__item", children: (0, jsx_runtime_1.jsx)(Link_1.default, { className: "pagination__link", to: "#", onClick: handleClick(totalPages), children: "\u00BB" }) })] }));
};
exports.Pager = Pager;
