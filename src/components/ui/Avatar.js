"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Avatar = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var Link_1 = __importDefault(require("@docusaurus/Link"));
var Avatar = function (_a) {
    var src = _a.src, name = _a.name, subTitle = _a.subTitle, loading = _a.loading, decoding = _a.decoding;
    var srcList = Array.isArray(src) ? src : [src];
    var alt = function (_a) {
        var alt = _a.alt;
        return alt || 'アバター画像';
    };
    var srcSet = function (_a) {
        var srcSets = _a.srcSets;
        return srcSets === null || srcSets === void 0 ? void 0 : srcSets.map(function (_a) {
            var src = _a.src, width = _a.width;
            return "".concat(src, " ").concat(width);
        }).join(',');
    };
    var sizes = function (_a) {
        var sizes = _a.sizes;
        return sizes === null || sizes === void 0 ? void 0 : sizes.map(function (_a) {
            var size = _a.size;
            return size;
        }).join(',');
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "avatar", children: [srcList.map(function (src, i) {
                var _a;
                return ((0, jsx_runtime_1.jsx)(Link_1.default, { className: "avatar__photo-link avatar__photo avatar__photo--lg", target: "_blank", to: src.src, children: (0, jsx_runtime_1.jsxs)("picture", { children: [(_a = src.sources) === null || _a === void 0 ? void 0 : _a.map(function (_a, i) {
                                var type = _a.type, srcset = _a.srcset;
                                return ((0, jsx_runtime_1.jsx)("source", { type: type, srcSet: srcset }, i));
                            }), (0, jsx_runtime_1.jsx)("img", { title: alt(src), loading: loading, decoding: decoding, alt: alt(src), src: src.src, srcSet: srcSet(src), sizes: sizes(src), width: src.width, height: src.height })] }) }, i));
            }), (0, jsx_runtime_1.jsxs)("div", { className: "avatar__intro", children: [(0, jsx_runtime_1.jsx)("div", { className: "avatar__name", children: name }), (0, jsx_runtime_1.jsx)("small", { className: "avatar__subtitle", children: subTitle })] })] }));
};
exports.Avatar = Avatar;
