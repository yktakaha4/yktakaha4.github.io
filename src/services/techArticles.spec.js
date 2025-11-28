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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var techArticles_1 = require("@/services/techArticles");
var constants = __importStar(require("@/constants"));
var helper_1 = require("@/test/helper");
var fs_extra_1 = require("fs-extra");
var vitest_1 = require("vitest");
var mockedGetComponentsDataPath = vitest_1.vi.fn();
vitest_1.vi.spyOn(constants, 'getComponentsDataPath').mockImplementation(function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return mockedGetComponentsDataPath.apply(void 0, args);
});
describe('getTechArticles', function () {
    test('技術記事が取得できる', function () {
        var articles = (0, techArticles_1.getTechArticles)();
        expect(articles.length).toBeGreaterThan(70);
        expect(articles.filter(function (a) { return a.publisher === 'zenn' && a.tags.length > 0; })
            .length).toBeGreaterThan(0);
        expect(articles.filter(function (a) { return a.publisher === 'qiita' && a.tags.length > 0; })
            .length).toBeGreaterThan(0);
        expect(articles.filter(function (a) { return a.publisher === 'speakerDeck'; }).length).toBeGreaterThan(0);
        expect(articles.filter(function (a) { return a.publisher === 'note'; }).length).toBeGreaterThan(0);
        expect(articles.filter(function (a) { return a.publisher === 'techBlog'; }).length).toBeGreaterThan(0);
    });
    test('URLが一意である', function () {
        var articles = (0, techArticles_1.getTechArticles)();
        var counter = articles.reduce(function (acc, a) {
            acc[a.url] = (acc[a.url] || 0) + 1;
            return acc;
        }, {});
        var duplicates = Object.entries(counter).reduce(function (acc, _a) {
            var url = _a[0], count = _a[1];
            if (count > 1) {
                acc[url] = count;
            }
            return acc;
        }, {});
        expect(duplicates).toEqual({});
    });
});
describe('sortTechArticles', function () {
    test('技術記事がソートできる', function () {
        var defaultValues = {
            title: 'dummy',
            url: 'https://dummy.com',
            likes: 0,
            publishedAt: new Date(),
            publisher: 'zenn',
            tags: ['dummy'],
        };
        var articles = [
            __assign(__assign({}, defaultValues), { title: 'dummy1', likes: 2, publishedAt: new Date('2021-01-01') }),
            __assign(__assign({}, defaultValues), { title: 'dummy2', likes: 1, publishedAt: new Date('2021-01-01') }),
            __assign(__assign({}, defaultValues), { title: 'dummy3', likes: 2, publishedAt: new Date('2021-01-02') }),
        ];
        var sorted = (0, techArticles_1.sortTechArticles)(articles, 'likes desc, publishedAt desc');
        expect(sorted.length).toBe(articles.length);
        expect(sorted[0].title).toBe('dummy3');
        expect(sorted[1].title).toBe('dummy1');
        expect(sorted[2].title).toBe('dummy2');
        expect(sorted).not.toEqual(articles);
    });
});
describe('storeTechArticles', function () {
    test('技術記事が保存できる', function () { return __awaiter(void 0, void 0, void 0, function () {
        var dir, mockedJsonPath, articles;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dir = (0, helper_1.tempDir)();
                    mockedJsonPath = "".concat(dir, "/dummy.json");
                    mockedGetComponentsDataPath.mockImplementation(function () { return mockedJsonPath; });
                    articles = [
                        {
                            dummy: 'dummy',
                        },
                    ];
                    return [4 /*yield*/, (0, techArticles_1.storeTechArticles)(articles)];
                case 1:
                    _a.sent();
                    expect((0, fs_extra_1.existsSync)(mockedJsonPath)).toBeTruthy();
                    expect((0, fs_extra_1.readJsonSync)(mockedJsonPath)).toEqual({
                        articles: articles,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
