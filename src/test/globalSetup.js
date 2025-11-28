"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teardown = exports.setup = void 0;
var nock_1 = __importDefault(require("nock"));
var react_1 = require("@testing-library/react");
var helper_1 = require("./helper");
var setup = function () {
    nock_1.default.disableNetConnect();
    (0, react_1.cleanup)();
};
exports.setup = setup;
var teardown = function () {
    (0, helper_1.removeAllTempDirs)();
};
exports.teardown = teardown;
