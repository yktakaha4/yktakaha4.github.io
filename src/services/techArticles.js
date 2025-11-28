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
exports.storeTechArticles = exports.sortTechArticles = exports.getTechArticles = void 0;
var zennArticles_json_1 = __importDefault(require("@/services/sns/data/zennArticles.json"));
var zennTopics_json_1 = __importDefault(require("@/services/sns/data/zennTopics.json"));
var qiitaItems_json_1 = __importDefault(require("@/services/sns/data/qiitaItems.json"));
var noteContents_json_1 = __importDefault(require("@/services/sns/data/noteContents.json"));
var others_1 = require("@/services/sns/others");
var dayjs_1 = __importDefault(require("dayjs"));
var constants_1 = require("@/constants");
var fs_extra_1 = require("fs-extra");
var logging_1 = require("@/services/logging");
var getTechArticles = function () {
    var techArticles = zennArticles_json_1.default.articles
        .map(function (_a) {
        var _b;
        var title = _a.title, path = _a.path, published_at = _a.published_at, liked_count = _a.liked_count, slug = _a.slug;
        var tags = ((_b = zennTopics_json_1.default.topics.find(function (topic) { return topic.slug === slug; })) === null || _b === void 0 ? void 0 : _b.topics) || [];
        return {
            title: title,
            url: "".concat(constants_1.zennBaseURL).concat(path),
            publishedAt: (0, dayjs_1.default)(published_at).toDate(),
            likes: liked_count,
            publisher: 'zenn',
            tags: tags,
        };
    })
        .concat(qiitaItems_json_1.default.items.map(function (_a) {
        var title = _a.title, url = _a.url, created_at = _a.created_at, likes_count = _a.likes_count, tags = _a.tags;
        return {
            title: title,
            url: url,
            publishedAt: new Date(created_at),
            likes: likes_count,
            publisher: 'qiita',
            tags: tags.map(function (_a) {
                var name = _a.name;
                return name;
            }),
        };
    }))
        .concat(noteContents_json_1.default.contents.map(function (_a) {
        var name = _a.name, noteUrl = _a.noteUrl, publishAt = _a.publishAt, likeCount = _a.likeCount, hashtags = _a.hashtags;
        return {
            title: name,
            url: noteUrl,
            publishedAt: new Date(publishAt),
            likes: likeCount,
            publisher: 'note',
            tags: hashtags.map(function (_a) {
                var hashtag = _a.hashtag;
                return hashtag.name.replace(/^#/, '');
            }),
        };
    }))
        .concat(others_1.othersArticles)
        .map(function (article) {
        var url = article.url, tags = article.tags;
        logging_1.logger.debug('article', { url: url, tags: tags });
        return article;
    });
    return (0, exports.sortTechArticles)(techArticles, 'likes desc, publishedAt desc');
};
exports.getTechArticles = getTechArticles;
var sortTechArticles = function (techArticles, order) {
    if (order === 'likes desc, publishedAt desc') {
        return __spreadArray([], techArticles, true).sort(function (lhs, rhs) {
            var _a, _b;
            if (lhs.likes === rhs.likes) {
                return rhs.publishedAt.getTime() - lhs.publishedAt.getTime();
            }
            else {
                return ((_a = rhs.likes) !== null && _a !== void 0 ? _a : 0) - ((_b = lhs.likes) !== null && _b !== void 0 ? _b : 0);
            }
        });
    }
    else {
        return __spreadArray([], techArticles, true).sort(function (lhs, rhs) {
            return rhs.publishedAt.getTime() - lhs.publishedAt.getTime();
        });
    }
};
exports.sortTechArticles = sortTechArticles;
var storeTechArticles = function (articles) { return __awaiter(void 0, void 0, void 0, function () {
    var dataPath, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logging_1.logger.debug('start', { count: articles.length });
                dataPath = (0, constants_1.getComponentsDataPath)('techArticles');
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
exports.storeTechArticles = storeTechArticles;
