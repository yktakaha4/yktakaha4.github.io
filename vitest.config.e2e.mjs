"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { defineConfig } from 'vitest/config';
import config from './vitest.config.mjs';
export default defineConfig(__assign(__assign({}, config), { test: __assign(__assign({}, config.test), { include: ['e2e/**/*.{spec,test}.{ts,tsx}'], coverage: {
            enabled: false,
        } }) }));
