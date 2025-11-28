"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechArticles = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var techArticles_json_1 = __importDefault(require("@/components/data/techArticles.json"));
var constants_1 = require("@/constants");
var dayjs_1 = __importDefault(require("dayjs"));
var SearchableTable_1 = require("@/components/ui/SearchableTable");
var TechArticles = function () {
    var headers = [
        {
            label: '公開日',
            align: 'center',
            width: '10%',
        },
        {
            label: 'タイトル',
            align: 'left',
            width: '70%',
        },
        {
            label: 'タグ',
            align: 'left',
            width: '20%',
        },
    ];
    var items = techArticles_json_1.default.articles;
    var searchTexts = function (item) {
        return __spreadArray(__spreadArray([
            item.title
        ], item.tags, true), [
            (0, constants_1.getTechArticlePublisherName)(item.publisher),
            (0, dayjs_1.default)(item.publishedAt).format('YYYY/M/D'),
        ], false);
    };
    var row = function (item) {
        var tagValues = [
            {
                icon: 'publisher',
                value: (0, constants_1.getTechArticlePublisherName)(item.publisher),
                color: 'primary',
            },
        ];
        if (item.likes != null) {
            tagValues.push({
                icon: 'heart',
                value: item.likes.toLocaleString(),
                color: 'danger',
            });
        }
        return [
            {
                type: 'date',
                value: (0, dayjs_1.default)(item.publishedAt).toDate(),
                format: 'YYYY/M/D',
            },
            {
                type: 'string',
                value: item.title,
                link: {
                    type: 'external',
                    href: item.url,
                },
            },
            {
                type: 'tags',
                values: tagValues,
            },
        ];
    };
    return ((0, jsx_runtime_1.jsx)(SearchableTable_1.SearchableTable, { headers: headers, items: items, searchTexts: searchTexts, row: row }));
};
exports.TechArticles = TechArticles;
