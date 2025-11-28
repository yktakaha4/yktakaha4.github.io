"use strict";
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
exports.storeArticles = exports.fetchArticles = exports.storeTopics = exports.fetchTopics = void 0;
var fs_extra_1 = require("fs-extra");
var constants_1 = require("@/constants");
var logging_1 = require("@/services/logging");
var baseUri = 'https://zenn.dev/api/articles';
var fetchTopics = function (_a, _b, force_1) { return __awaiter(void 0, [_a, _b, force_1], void 0, function (_c, _d, force) {
    var sleepTime, sleepTimer, newTopics, _loop_1, _i, articles_1, slug;
    var articles = _c.articles;
    var topics = _d.topics;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                sleepTime = 1500;
                sleepTimer = null;
                logging_1.logger.debug('start', { count: articles.length, force: force });
                newTopics = [];
                _loop_1 = function (slug) {
                    var topic, response, article, articleTopics, published;
                    return __generator(this, function (_f) {
                        switch (_f.label) {
                            case 0:
                                topic = topics.find(function (topic) { return topic.slug === slug; });
                                if (topic && !force) {
                                    logging_1.logger.debug('found', { slug: slug });
                                    newTopics.push(topic);
                                    return [2 /*return*/, "continue"];
                                }
                                if (!sleepTimer) return [3 /*break*/, 2];
                                logging_1.logger.debug('sleep', { sleepTime: sleepTime });
                                return [4 /*yield*/, sleepTimer];
                            case 1:
                                _f.sent();
                                _f.label = 2;
                            case 2:
                                logging_1.logger.debug('fetch', { baseUri: baseUri, slug: slug });
                                return [4 /*yield*/, fetch("".concat(baseUri, "/").concat(slug))];
                            case 3:
                                response = _f.sent();
                                logging_1.logger.debug('fetched', { response: response });
                                if (!response.ok) {
                                    if (response.status === 404) {
                                        logging_1.logger.debug('not found', { slug: slug, status: response.status });
                                        return [2 /*return*/, "continue"];
                                    }
                                    throw new Error('Failed to fetch articles');
                                }
                                sleepTimer = new Promise(function (resolve) { return setTimeout(resolve, sleepTime); });
                                return [4 /*yield*/, response.json()];
                            case 4:
                                article = (_f.sent()).article;
                                articleTopics = article.topics
                                    .map(function (topic) { return topic.display_name; })
                                    .filter(function (topic) { return !!topic; });
                                articleTopics.sort(function (lhs, rhs) { return lhs.localeCompare(rhs); });
                                published = article.status === 'published';
                                if (!published) {
                                    logging_1.logger.debug('not published', { slug: slug });
                                    return [2 /*return*/, "continue"];
                                }
                                logging_1.logger.debug('new topic', { slug: slug, articleTopics: articleTopics, published: published });
                                newTopics.push({
                                    slug: slug,
                                    topics: articleTopics,
                                    published: published,
                                });
                                return [2 /*return*/];
                        }
                    });
                };
                _i = 0, articles_1 = articles;
                _e.label = 1;
            case 1:
                if (!(_i < articles_1.length)) return [3 /*break*/, 4];
                slug = articles_1[_i].slug;
                return [5 /*yield**/, _loop_1(slug)];
            case 2:
                _e.sent();
                _e.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                newTopics.sort(function (lhs, rhs) { return lhs.slug.localeCompare(rhs.slug); });
                logging_1.logger.debug('end');
                return [2 /*return*/, newTopics];
        }
    });
}); };
exports.fetchTopics = fetchTopics;
var storeTopics = function (topics) { return __awaiter(void 0, void 0, void 0, function () {
    var dataPath, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logging_1.logger.debug('start', { count: topics.length });
                dataPath = (0, constants_1.getSNSDataPath)('zennTopics');
                data = {
                    topics: topics,
                };
                return [4 /*yield*/, (0, fs_extra_1.writeJson)(dataPath, data, { spaces: 2 })];
            case 1:
                _a.sent();
                logging_1.logger.debug('stored', { dataPath: dataPath });
                return [2 /*return*/];
        }
    });
}); };
exports.storeTopics = storeTopics;
var fetchArticles = function (userName) { return __awaiter(void 0, void 0, void 0, function () {
    var allArticles, currentPage, hasNextPage, sleepTime, params, response, getArticlesResponse, articles, next_page;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logging_1.logger.debug('start', { userName: userName });
                if (!userName) {
                    throw new Error('userName is not specified');
                }
                allArticles = [];
                currentPage = 1;
                hasNextPage = true;
                sleepTime = 1000;
                _a.label = 1;
            case 1:
                if (!hasNextPage) return [3 /*break*/, 6];
                params = new URLSearchParams({
                    username: userName,
                    order: 'latest',
                    page: String(currentPage),
                });
                logging_1.logger.debug('fetch', { baseUri: baseUri, params: params, currentPage: currentPage });
                return [4 /*yield*/, fetch("".concat(baseUri, "?").concat(params.toString()))];
            case 2:
                response = _a.sent();
                logging_1.logger.debug('fetched', { response: response, currentPage: currentPage });
                if (!response.ok) {
                    throw new Error("Failed to fetch articles (page ".concat(currentPage, "): ").concat(response.status));
                }
                return [4 /*yield*/, response.json()];
            case 3:
                getArticlesResponse = _a.sent();
                articles = getArticlesResponse.articles, next_page = getArticlesResponse.next_page;
                logging_1.logger.debug('fetched page', {
                    currentPage: currentPage,
                    articlesCount: articles.length,
                    nextPage: next_page,
                });
                allArticles.push.apply(allArticles, articles);
                hasNextPage = next_page !== null;
                currentPage = next_page !== null && next_page !== void 0 ? next_page : currentPage + 1;
                if (!hasNextPage) return [3 /*break*/, 5];
                logging_1.logger.debug('sleep before next page', { sleepTime: sleepTime });
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, sleepTime); })];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [3 /*break*/, 1];
            case 6:
                logging_1.logger.debug('completed fetching all pages', {
                    totalArticles: allArticles.length,
                    totalPages: currentPage - 1,
                });
                return [2 /*return*/, allArticles];
        }
    });
}); };
exports.fetchArticles = fetchArticles;
var storeArticles = function (articles) { return __awaiter(void 0, void 0, void 0, function () {
    var dataPath, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logging_1.logger.debug('start', { count: articles.length });
                dataPath = (0, constants_1.getSNSDataPath)('zennArticles');
                data = {
                    articles: articles,
                };
                return [4 /*yield*/, (0, fs_extra_1.writeJson)(dataPath, data, { spaces: 2 })];
            case 1:
                _a.sent();
                logging_1.logger.debug('stored', { dataPath: dataPath });
                return [2 /*return*/];
        }
    });
}); };
exports.storeArticles = storeArticles;
