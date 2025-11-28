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
exports.OSSContributions = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var ossContributions_json_1 = __importDefault(require("@/components/data/ossContributions.json"));
var dayjs_1 = __importDefault(require("dayjs"));
var constants_1 = require("@/constants");
var SearchableTable_1 = require("@/components/ui/SearchableTable");
var OSSContributions = function () {
    var headers = [
        {
            label: '日付',
            align: 'center',
            width: '10%',
        },
        {
            label: 'タイトル',
            align: 'left',
            width: '35%',
        },
        {
            label: 'リポジトリ',
            align: 'left',
            width: '35%',
        },
        {
            label: 'タグ',
            align: 'left',
            width: '20%',
        },
    ];
    var items = ossContributions_json_1.default.contributions;
    var searchTexts = function (item) {
        return __spreadArray(__spreadArray([
            item.title,
            (0, dayjs_1.default)(item.mergedAt).format('YYYY/M/D'),
            (0, constants_1.getOSSContributionKindName)(item.kind)
        ], item.repository.languages, true), [
            item.repository.name,
        ], false);
    };
    var row = function (item) {
        var _a;
        return [
            {
                type: 'date',
                value: (0, dayjs_1.default)(item.mergedAt).toDate(),
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
                type: 'string',
                value: item.repository.name,
                link: {
                    type: 'external',
                    href: item.repository.url,
                },
            },
            {
                type: 'tags',
                values: [
                    {
                        icon: (_a = (0, constants_1.getOssContributionIcon)(item.kind)) !== null && _a !== void 0 ? _a : undefined,
                        value: (0, constants_1.getOSSContributionKindName)(item.kind),
                        color: 'primary',
                    },
                    {
                        icon: 'prChanges',
                        value: (0, constants_1.getOSSContributionSizeKindName)(item.changedLines),
                        color: 'secondary',
                    },
                    {
                        icon: 'star',
                        value: item.repository.stars.toLocaleString(),
                        color: 'warning',
                    },
                ],
            },
        ];
    };
    return ((0, jsx_runtime_1.jsx)(SearchableTable_1.SearchableTable, { headers: headers, items: items, searchTexts: searchTexts, row: row }));
};
exports.OSSContributions = OSSContributions;
