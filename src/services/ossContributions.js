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
exports.storeOSSContributions = exports.sortOSSContributions = exports.getOSSContributions = void 0;
var gitHubPullRequests_json_1 = __importDefault(require("@/services/sns/data/gitHubPullRequests.json"));
var dayjs_1 = __importDefault(require("dayjs"));
var constants_1 = require("@/constants");
var fs_extra_1 = require("fs-extra");
var logging_1 = require("@/services/logging");
var getOSSContributions = function () {
    var contributions = gitHubPullRequests_json_1.default.pullRequests
        .map(function (_a) {
        var node = _a.node;
        var title = node.title, permalink = node.permalink, mergedAt = node.mergedAt, repository = node.repository;
        var nameWithOwner = repository.nameWithOwner, stargazerCount = repository.stargazerCount, url = repository.url, owner = repository.owner;
        var totalSize = repository.languages.edges.reduce(function (acc, _a) {
            var size = _a.size;
            return acc + size;
        }, 0);
        var languages = [];
        for (var _i = 0, _b = repository.languages.edges; _i < _b.length; _i++) {
            var _c = _b[_i], node_1 = _c.node, size = _c.size;
            if (size / totalSize >= constants_1.gitHubLanguageSizeThreshold) {
                var name_1 = node_1.name;
                languages.push(name_1);
            }
        }
        return {
            title: title,
            url: permalink,
            kind: 'mergedPullRequest',
            mergedAt: (0, dayjs_1.default)(mergedAt).toDate(),
            changedLines: (node.additions || 0) + (node.deletions || 0),
            repository: {
                owner: owner.login,
                name: nameWithOwner,
                stars: stargazerCount,
                url: url,
                languages: languages,
            },
        };
    })
        .filter(function (_a) {
        var url = _a.url, repository = _a.repository;
        var owner = repository.owner, stars = repository.stars;
        var visible = stars >= constants_1.gitHubStargazersCountThreshold &&
            !constants_1.gitHubIgnoreOwnerNames.includes(owner);
        logging_1.logger.debug('filter', { url: url, visible: visible });
        return visible;
    });
    return (0, exports.sortOSSContributions)(contributions);
};
exports.getOSSContributions = getOSSContributions;
var sortOSSContributions = function (contributions) {
    return __spreadArray([], contributions, true).sort(function (lhs, rhs) {
        if (rhs.mergedAt.getTime() === lhs.mergedAt.getTime()) {
            return rhs.changedLines - lhs.changedLines;
        }
        else {
            return rhs.mergedAt.getTime() - lhs.mergedAt.getTime();
        }
    });
};
exports.sortOSSContributions = sortOSSContributions;
var storeOSSContributions = function (contributions) { return __awaiter(void 0, void 0, void 0, function () {
    var dataPath, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logging_1.logger.debug('start', { count: contributions.length });
                dataPath = (0, constants_1.getComponentsDataPath)('ossContributions');
                data = {
                    contributions: contributions,
                };
                return [4 /*yield*/, (0, fs_extra_1.writeJson)(dataPath, data, { spaces: 2 })];
            case 1:
                _a.sent();
                logging_1.logger.debug('stored', { dataPath: dataPath });
                return [2 /*return*/];
        }
    });
}); };
exports.storeOSSContributions = storeOSSContributions;
