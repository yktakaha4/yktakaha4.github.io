"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var zenn_1 = require("@/services/sns/zenn");
var helper_1 = require("@/test/helper");
var fs_extra_1 = require("fs-extra");
var nock_1 = __importDefault(require("nock"));
var zennApiGetArticleResponse_json_1 = __importDefault(require("@/services/sns/mocks/zennApiGetArticleResponse.json"));
var zennApiGetArticlesResponse_json_1 = __importDefault(require("@/services/sns/mocks/zennApiGetArticlesResponse.json"));
var constants = __importStar(require("@/constants"));
var vitest_1 = require("vitest");
var mockedGetSNSDataPath = vitest_1.vi.fn();
vitest_1.vi.spyOn(constants, 'getSNSDataPath').mockImplementation(function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return mockedGetSNSDataPath.apply(void 0, args);
});
describe('fetchTopics', function () {
    var alreadySavedSlug = 'already_saved_slug';
    var notFoundSlug = 'not_found_slug';
    var newSlug = 'new_slug';
    var errorSlug = 'error_slug';
    beforeEach(function () {
        nock_1.default.cleanAll();
        (0, nock_1.default)('https://zenn.dev')
            .get("/api/articles/".concat(alreadySavedSlug))
            .reply(200, zennApiGetArticleResponse_json_1.default)
            .get("/api/articles/".concat(newSlug))
            .reply(200, zennApiGetArticleResponse_json_1.default)
            .get("/api/articles/".concat(notFoundSlug))
            .reply(404)
            .get("/api/articles/".concat(errorSlug))
            .reply(500);
    });
    test('トピックが差分取得できる', function () { return __awaiter(void 0, void 0, void 0, function () {
        var topics;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, zenn_1.fetchTopics)({
                        articles: [
                            {
                                slug: alreadySavedSlug,
                            },
                            {
                                slug: notFoundSlug,
                            },
                            {
                                slug: newSlug,
                            },
                        ],
                    }, {
                        topics: [
                            {
                                slug: alreadySavedSlug,
                                topics: ['topic1'],
                                published: true,
                            },
                        ],
                    }, false)];
                case 1:
                    topics = _a.sent();
                    expect(topics).toEqual([
                        {
                            slug: alreadySavedSlug,
                            topics: ['topic1'],
                            published: true,
                        },
                        {
                            slug: newSlug,
                            topics: ['Terraform', 'uptimerobot', '監視'],
                            published: true,
                        },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    test('トピックが強制取得できる', function () { return __awaiter(void 0, void 0, void 0, function () {
        var topics;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, zenn_1.fetchTopics)({
                        articles: [
                            {
                                slug: alreadySavedSlug,
                            },
                            {
                                slug: notFoundSlug,
                            },
                            {
                                slug: newSlug,
                            },
                        ],
                    }, {
                        topics: [
                            {
                                slug: alreadySavedSlug,
                                topics: ['topic1'],
                                published: true,
                            },
                        ],
                    }, true)];
                case 1:
                    topics = _a.sent();
                    expect(topics).toEqual([
                        {
                            slug: alreadySavedSlug,
                            topics: ['Terraform', 'uptimerobot', '監視'],
                            published: true,
                        },
                        {
                            slug: newSlug,
                            topics: ['Terraform', 'uptimerobot', '監視'],
                            published: true,
                        },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    test('APIエラーの場合は処理が失敗する', function () { return __awaiter(void 0, void 0, void 0, function () {
        var promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promise = (0, zenn_1.fetchTopics)({
                        articles: [
                            {
                                slug: alreadySavedSlug,
                            },
                            {
                                slug: notFoundSlug,
                            },
                            {
                                slug: errorSlug,
                            },
                        ],
                    }, {
                        topics: [
                            {
                                slug: alreadySavedSlug,
                                topics: ['topic1'],
                                published: true,
                            },
                        ],
                    }, false);
                    return [4 /*yield*/, expect(promise).rejects.toThrow('Failed to fetch articles')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('storeTopics', function () {
    test('トピックが保存できる', function () { return __awaiter(void 0, void 0, void 0, function () {
        var dir, mockedJsonPath, topics;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dir = (0, helper_1.tempDir)();
                    mockedJsonPath = "".concat(dir, "/dummy.json");
                    mockedGetSNSDataPath.mockImplementation(function () { return mockedJsonPath; });
                    topics = [
                        {
                            dummy: 'dummy',
                        },
                    ];
                    return [4 /*yield*/, (0, zenn_1.storeTopics)(topics)];
                case 1:
                    _a.sent();
                    expect((0, fs_extra_1.existsSync)(mockedJsonPath)).toBeTruthy();
                    expect((0, fs_extra_1.readJsonSync)(mockedJsonPath)).toEqual({
                        topics: topics,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('fetchArticles', function () {
    beforeEach(function () {
        nock_1.default.cleanAll();
    });
    test('記事が取得できる', function () { return __awaiter(void 0, void 0, void 0, function () {
        var articles;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, nock_1.default)('https://zenn.dev')
                        .get('/api/articles')
                        .query({
                        username: 'yktakaha4',
                        order: 'latest',
                        page: String(1),
                    })
                        .reply(200, zennApiGetArticlesResponse_json_1.default);
                    return [4 /*yield*/, (0, zenn_1.fetchArticles)('yktakaha4')];
                case 1:
                    articles = _a.sent();
                    expect(articles.length).toBe(2);
                    expect(articles[0].title).toBe('（SRE的）作ってよかったドキュメント・表・運用');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('storeArticles', function () {
    test('記事が保存できる', function () { return __awaiter(void 0, void 0, void 0, function () {
        var dir, mockedJsonPath, articles;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dir = (0, helper_1.tempDir)();
                    mockedJsonPath = "".concat(dir, "/dummy.json");
                    mockedGetSNSDataPath.mockImplementation(function () { return mockedJsonPath; });
                    articles = [
                        {
                            dummy: 'dummy',
                        },
                    ];
                    return [4 /*yield*/, (0, zenn_1.storeArticles)(articles)];
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
