"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Margin = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var Margin = function (_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)("div", { style: { margin: '1rem 0' }, children: children });
};
exports.Margin = Margin;
