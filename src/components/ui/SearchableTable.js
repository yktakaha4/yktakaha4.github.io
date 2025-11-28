"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchableTable = exports.createSearchText = exports.createSearchRegexp = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var Table_1 = require("@/components/ui/Table");
var Search_1 = require("@/components/ui/Search");
var constants_1 = require("@/constants");
var Pager_1 = require("@/components/ui/Pager");
var normalizeForm = 'NFKC';
var createSearchRegexp = function (query) {
    var conditions = query.trim().normalize(normalizeForm).split(/\s+/);
    if (conditions.length === 1 && conditions[0] === '') {
        return new RegExp('^.*$');
    }
    else {
        var condition = conditions
            .map(function (raw) {
            // メタ文字のエスケープ
            // https://shanabrian.com/web/javascript/regular-expression-escape.php
            var escaped = raw.replace(/[-\/\\^$*+?.()|\[\]{}]/g, '\\$&');
            // AND検索
            // https://qiita.com/n4o847/items/dbcd0b8af3781d221424
            return "(?=.*".concat(escaped, ")");
        })
            .join('');
        return new RegExp("^".concat(condition), 'i');
    }
};
exports.createSearchRegexp = createSearchRegexp;
var createSearchText = function () {
    var texts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        texts[_i] = arguments[_i];
    }
    return texts
        .map(function (t) { return t.trim().normalize(normalizeForm).replace(/\s+/g, '\x20'); })
        .join('\x20');
};
exports.createSearchText = createSearchText;
var SearchableTable = function (_a) {
    var _b;
    var headers = _a.headers, items = _a.items, searchTexts = _a.searchTexts, row = _a.row;
    if (headers.length === 0) {
        throw new Error('headers must not be empty');
    }
    var _c = (0, react_1.useState)(''), query = _c[0], setQuery = _c[1];
    var _d = (0, react_1.useState)(1), page = _d[0], setPage = _d[1];
    var regexp = (0, react_1.useMemo)(function () { return (0, exports.createSearchRegexp)(query); }, [query]);
    var filtered = items.filter(function (item) {
        return regexp.test(exports.createSearchText.apply(void 0, searchTexts(item)));
    });
    var rows = filtered.length > 0
        ? (_b = filtered
            .map(function (item) { return row(item); }))
            .slice.apply(_b, (0, Pager_1.getSliceIndex)(page, constants_1.pagerPerPage)) : [];
    var handleChangeQuery = function (newQuery) {
        setQuery(newQuery);
        setPage(1);
    };
    var handleChangePage = function (newPage) {
        setPage(newPage);
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { style: { marginBottom: '0.2rem' }, children: (0, jsx_runtime_1.jsx)(Search_1.Search, { query: query, totalCount: filtered.length, onChange: function (_a) {
                        var query = _a.query;
                        return handleChangeQuery(query);
                    }, children: (0, jsx_runtime_1.jsx)(Pager_1.Pager, { page: page, perPage: constants_1.pagerPerPage, size: constants_1.pagerSize, total: filtered.length, onChange: function (_a) {
                            var page = _a.page;
                            return handleChangePage(page);
                        } }) }) }), (0, jsx_runtime_1.jsx)(Table_1.Table, { headers: headers, rows: rows })] }));
};
exports.SearchableTable = SearchableTable;
