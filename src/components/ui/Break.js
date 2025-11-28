"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Break = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var Break = function (props) {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(props === null || props === void 0 ? void 0 : props.page) && (0, jsx_runtime_1.jsx)("div", { style: { pageBreakAfter: 'always' } }), (props === null || props === void 0 ? void 0 : props.line) && (0, jsx_runtime_1.jsx)("hr", {})] }));
};
exports.Break = Break;
