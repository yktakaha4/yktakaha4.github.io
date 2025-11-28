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
exports.checkGitHubPAT = exports.storePullRequests = exports.fetchPullRequests = exports.createGraphQLClient = void 0;
var graphql_1 = require("@octokit/graphql");
var constants_1 = require("@/constants");
var fs_extra_1 = require("fs-extra");
var logging_1 = require("@/services/logging");
var pullRequestsLimit = 100;
var languagesLimit = 10;
var fetchPullRequestsQuery = "\nquery ($login: String!, $cursor: String) {\n  user(login: $login) {\n    pullRequests(first: ".concat(pullRequestsLimit, ", states: MERGED, orderBy: {field: UPDATED_AT, direction: DESC}, after: $cursor) {\n      edges {\n        node {\n          id\n          number\n          title\n          mergedAt\n          permalink\n          additions\n          deletions\n          changedFiles\n          repository {\n            id\n            nameWithOwner\n            url\n            owner {\n              login\n            }\n            isFork\n            stargazerCount\n            languages(first: ").concat(languagesLimit, ", orderBy: {field: SIZE, direction: DESC}) {\n              edges {\n                node {\n                  name\n                  color\n                }\n                size\n              }\n            }\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n");
var createGraphQLClient = function () {
    return graphql_1.graphql.defaults({
        headers: {
            authorization: "token ".concat(process.env.GITHUB_PAT),
        },
    });
};
exports.createGraphQLClient = createGraphQLClient;
var fetchPullRequests = function (login) { return __awaiter(void 0, void 0, void 0, function () {
    var client, pullRequests, params, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logging_1.logger.debug('start', { login: login });
                client = (0, exports.createGraphQLClient)();
                pullRequests = [];
                params = { cursor: null };
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 3];
                logging_1.logger.debug('fetch', { params: params, total: pullRequests.length });
                return [4 /*yield*/, client(fetchPullRequestsQuery, {
                        login: login,
                        cursor: params.cursor,
                    })];
            case 2:
                result = _a.sent();
                pullRequests.push.apply(pullRequests, result.user.pullRequests.edges);
                logging_1.logger.debug('fetched', { total: pullRequests.length });
                if (result.user.pullRequests.pageInfo.hasNextPage) {
                    params.cursor = result.user.pullRequests.pageInfo.endCursor;
                    return [3 /*break*/, 1];
                }
                return [3 /*break*/, 3];
            case 3:
                logging_1.logger.debug('result', { total: pullRequests.length });
                return [2 /*return*/, pullRequests];
        }
    });
}); };
exports.fetchPullRequests = fetchPullRequests;
var storePullRequests = function (pullRequests) { return __awaiter(void 0, void 0, void 0, function () {
    var dataPath, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logging_1.logger.debug('start', { count: pullRequests.length });
                dataPath = (0, constants_1.getSNSDataPath)('gitHubPullRequests');
                data = {
                    pullRequests: pullRequests,
                };
                return [4 /*yield*/, (0, fs_extra_1.writeJson)(dataPath, data, { spaces: 2 })];
            case 1:
                _a.sent();
                logging_1.logger.debug('stored', { dataPath: dataPath });
                return [2 /*return*/];
        }
    });
}); };
exports.storePullRequests = storePullRequests;
var checkGitHubPAT = function () { return __awaiter(void 0, void 0, void 0, function () {
    var url, response, scopes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logging_1.logger.debug('start');
                url = 'https://api.github.com';
                logging_1.logger.debug('fetch', { url: url });
                return [4 /*yield*/, fetch(url, {
                        headers: {
                            authorization: "Bearer ".concat(process.env.GITHUB_PAT),
                        },
                    })];
            case 1:
                response = _a.sent();
                logging_1.logger.debug('fetched', { response: response });
                if (!response.ok) {
                    throw new Error('Failed to get grants');
                }
                scopes = response.headers.get('x-oauth-scopes');
                logging_1.logger.debug('scopes', { scopes: scopes });
                if (scopes !== 'public_repo') {
                    throw new Error("Invalid scope: ".concat(scopes));
                }
                logging_1.logger.debug('end');
                return [2 /*return*/];
        }
    });
}); };
exports.checkGitHubPAT = checkGitHubPAT;
