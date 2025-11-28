"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dayjs_1 = __importDefault(require("dayjs"));
var useDocusaurusContext = function () {
    var customFields = {
        buildAt: (0, dayjs_1.default)().format(),
        commitHash: 'dummy_commit_hash',
        isDevelopment: true,
        isProduction: false,
        withEmbeddedContent: false,
    };
    return {
        siteConfig: {
            customFields: customFields,
        },
    };
};
exports.default = useDocusaurusContext;
