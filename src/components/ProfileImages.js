"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileImages = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var Avatar_1 = require("@/components/ui/Avatar");
var useBaseUrl_1 = __importDefault(require("@docusaurus/useBaseUrl"));
var helper_1 = require("@/components/helper");
var icon_jpg_1 = __importDefault(require("@site/static/img/icon.jpg"));
var icon_thumb_jpg_1 = __importDefault(require("@site/static/img/icon_thumb.jpg"));
var icon_thumb_webp_1 = __importDefault(require("@site/static/img/icon_thumb.webp"));
var yktakaha4_jpg_1 = __importDefault(require("@site/static/img/yktakaha4.jpg"));
var yktakaha4_thumb_jpg_1 = __importDefault(require("@site/static/img/yktakaha4_thumb.jpg"));
var yktakaha4_thumb_webp_1 = __importDefault(require("@site/static/img/yktakaha4_thumb.webp"));
var ProfileImages = function () {
    var absolute = (0, helper_1.getCustomFields)().isProduction;
    var src = [
        {
            src: (0, useBaseUrl_1.default)(icon_jpg_1.default, {
                absolute: absolute,
            }),
            alt: 'コウテイペンギン',
            srcSets: [
                {
                    src: icon_thumb_jpg_1.default,
                    width: '128w',
                },
                {
                    src: icon_jpg_1.default,
                    width: '400w',
                },
            ],
            sources: [
                {
                    type: 'image/webp',
                    srcset: icon_thumb_webp_1.default,
                },
            ],
        },
        {
            src: (0, useBaseUrl_1.default)(yktakaha4_jpg_1.default, {
                absolute: absolute,
            }),
            alt: '近影',
            srcSets: [
                {
                    src: yktakaha4_thumb_jpg_1.default,
                    width: '128w',
                },
                {
                    src: yktakaha4_jpg_1.default,
                    width: '400w',
                },
            ],
            sources: [
                {
                    type: 'image/webp',
                    srcset: yktakaha4_thumb_webp_1.default,
                },
            ],
        },
    ];
    return (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: src, loading: "lazy", decoding: "async" });
};
exports.ProfileImages = ProfileImages;
