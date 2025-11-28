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
exports.Tag = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var fa_1 = require("react-icons/fa");
var fa6_1 = require("react-icons/fa6");
var createIcon = function (icon) {
    var defaultStyle = {
        marginRight: '0.2rem',
        verticalAlign: 'bottom',
    };
    switch (icon) {
        case 'heart':
            return (0, jsx_runtime_1.jsx)(fa_1.FaHeart, { style: __assign({}, defaultStyle) });
        case 'publisher':
            return (0, jsx_runtime_1.jsx)(fa6_1.FaNewspaper, { style: __assign({}, defaultStyle) });
        case 'prMerge':
            return (0, jsx_runtime_1.jsx)(fa6_1.FaCodeMerge, { style: __assign({}, defaultStyle) });
        case 'prChanges':
            return (0, jsx_runtime_1.jsx)(fa6_1.FaRegFileCode, { style: __assign({}, defaultStyle) });
        case 'star':
            return (0, jsx_runtime_1.jsx)(fa6_1.FaStar, { style: __assign({}, defaultStyle) });
    }
};
var Tag = function (_a) {
    var icon = _a.icon, name = _a.name, color = _a.color;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "badge badge--".concat(color !== null && color !== void 0 ? color : 'secondary'), style: { whiteSpace: 'nowrap' }, children: [icon && createIcon(icon), name.trim()] }));
};
exports.Tag = Tag;
