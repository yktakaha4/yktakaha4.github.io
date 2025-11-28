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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pdf_mjs_1 = require("pdfjs-dist/legacy/build/pdf.mjs");
var helper_1 = require("./helper");
var fs_extra_1 = __importDefault(require("fs-extra"));
var getPageText = function (document, pageNumber) { return __awaiter(void 0, void 0, void 0, function () {
    var page, textContent;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, document.getPage(pageNumber)];
            case 1:
                page = _a.sent();
                return [4 /*yield*/, page.getTextContent()];
            case 2:
                textContent = _a.sent();
                return [2 /*return*/, textContent.items
                        .map(function (item) { return ('str' in item ? item.str : ''); })
                        .join('')
                        .normalize('NFKC')
                        .trim()];
        }
    });
}); };
var getPageLinks = function (document, pageNumber) { return __awaiter(void 0, void 0, void 0, function () {
    var page, annotations, links, _i, annotations_1, annotation;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, document.getPage(pageNumber)];
            case 1:
                page = _a.sent();
                return [4 /*yield*/, page.getAnnotations()];
            case 2:
                annotations = _a.sent();
                links = [];
                for (_i = 0, annotations_1 = annotations; _i < annotations_1.length; _i++) {
                    annotation = annotations_1[_i];
                    if (typeof annotation.url === 'string') {
                        links.push(annotation.url);
                    }
                }
                return [2 /*return*/, links];
        }
    });
}); };
describe('pdf', function () {
    var document;
    var expectedMaxPageNumber = 6;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var pdfPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pdfPath = "".concat(helper_1.rootDirectoryName, "/pdf/out/resume.pdf");
                    if (!fs_extra_1.default.existsSync(pdfPath)) {
                        throw new Error("Pdf file is not found: ".concat(pdfPath));
                    }
                    return [4 /*yield*/, (0, pdf_mjs_1.getDocument)(pdfPath).promise];
                case 1:
                    document = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('ページ数が一定である', function () {
        expect(document.numPages).toBe(expectedMaxPageNumber);
    });
    test.each([
        ['dc:title', 'Portfolio | yktakaha4.github.io'],
        ['pdf:author', 'yktakaha4'],
    ])('メタデータが適切である #%#', function (key, expected) { return __awaiter(void 0, void 0, void 0, function () {
        var metadata;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, document.getMetadata()];
                case 1:
                    metadata = (_a.sent()).metadata;
                    expect(metadata === null || metadata === void 0 ? void 0 : metadata.get(key)).toBe(expected);
                    return [2 /*return*/];
            }
        });
    }); });
    test.each([
        [1, 'Portfolio | yktakaha4.github.io'],
        [1, "1 / ".concat(expectedMaxPageNumber)],
        [1, 'プロフィール'],
        [1, '職務経歴'],
        [1, '正社員'],
        [2, '副業'],
        [3, '経験'],
        [4, 'イベント参加‧登壇'],
        [4, '資格‧認定'],
        [5, '公開アウトプット'],
        [5, '個人開発'],
        [5, '技術記事'],
        [6, 'OSS活動'],
        [6, 'このページについて'],
        [6, "6 / ".concat(expectedMaxPageNumber)],
    ])("\u30DA\u30FC\u30B8\u306B\u7279\u5B9A\u306E\u5024\u304C\u542B\u307E\u308C\u308B #%#", function (pageNumber, expected) { return __awaiter(void 0, void 0, void 0, function () {
        var text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getPageText(document, pageNumber)];
                case 1:
                    text = _a.sent();
                    expect(text).toContain(expected);
                    return [2 /*return*/];
            }
        });
    }); });
    test('リンクが外部リンクであること', function () { return __awaiter(void 0, void 0, void 0, function () {
        var pages, _loop_1, _i, pages_1, page;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pages = Array.from({ length: document.numPages }, function (_, i) { return i + 1; });
                    _loop_1 = function (page) {
                        var links;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, getPageLinks(document, page)];
                                case 1:
                                    links = _b.sent();
                                    links.forEach(function (link, index) {
                                        expect({
                                            page: page,
                                            index: index,
                                            link: link,
                                            isExternal: (0, helper_1.isExternalLink)(link),
                                        }).toEqual({
                                            page: page,
                                            index: index,
                                            link: link,
                                            isExternal: true,
                                        });
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, pages_1 = pages;
                    _a.label = 1;
                case 1:
                    if (!(_i < pages_1.length)) return [3 /*break*/, 4];
                    page = pages_1[_i];
                    return [5 /*yield**/, _loop_1(page)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    }); });
});
