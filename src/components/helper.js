"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomFields = void 0;
var useDocusaurusContext_1 = __importDefault(require("@docusaurus/useDocusaurusContext"));
var getCustomFields = function () {
    var customFields = (0, useDocusaurusContext_1.default)().siteConfig.customFields;
    if (customFields) {
        return customFields;
    }
    throw new Error('customFields is not defined');
};
exports.getCustomFields = getCustomFields;
