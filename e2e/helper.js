"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExternalLink = exports.rootDirectoryName = void 0;
var url_1 = require("url");
var path_1 = require("path");
exports.rootDirectoryName = (0, path_1.resolve)((0, path_1.dirname)((0, url_1.fileURLToPath)(import.meta.url)), '..');
var externalUrlRegexp = /https?:\/\/((?:[\w-]+\.)+\w{2,})/i;
var isExternalLink = function (link) { return externalUrlRegexp.test(link); };
exports.isExternalLink = isExternalLink;
