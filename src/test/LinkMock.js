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
exports.LinkMock = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var LinkMock = function (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
props) {
    var newProps = __assign(__assign({}, props), { href: props.to });
    // eslint-disable-next-line @docusaurus/no-html-links
    return (0, jsx_runtime_1.jsx)("a", __assign({}, newProps, { "data-mock": "LinkMock" }));
};
exports.LinkMock = LinkMock;
exports.default = exports.LinkMock;
