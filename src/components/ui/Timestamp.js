"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timestamp = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var dayjs_1 = __importDefault(require("dayjs"));
var Link_1 = __importDefault(require("@docusaurus/Link"));
var helper_1 = require("@/components/helper");
var Timestamp = function () {
    var _a = (0, helper_1.getCustomFields)(), buildAt = _a.buildAt, commitHash = _a.commitHash;
    var versionUrl = "https://github.com/yktakaha4/yktakaha4.github.io/tree/".concat(commitHash);
    return ((0, jsx_runtime_1.jsx)("table", { className: "capy--plain-table", style: { fontStyle: 'italic' }, children: (0, jsx_runtime_1.jsxs)("tbody", { children: [(0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "\u6700\u7D42\u66F4\u65B0\u65E5:" }), (0, jsx_runtime_1.jsx)("td", { children: (0, dayjs_1.default)(buildAt).format() })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "Version:" }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)(Link_1.default, { to: versionUrl, children: commitHash }) })] })] }) }));
};
exports.Timestamp = Timestamp;
