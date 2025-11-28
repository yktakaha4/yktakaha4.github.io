"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.singleLine = void 0;
var log4js_1 = __importDefault(require("log4js"));
var util_1 = __importDefault(require("util"));
var process = __importStar(require("process"));
var singleLine = function (logEvent) {
    return logEvent.data
        .map(function (d) {
        if (typeof d === 'boolean' ||
            typeof d === 'number' ||
            typeof d === 'string') {
            return d.toString().replace(/\n/gm, '\\n');
        }
        else {
            return util_1.default
                .inspect(d, { breakLength: Infinity })
                .replace(/\n/gm, '\\n');
        }
    })
        .filter(function (d) { return d.length > 0; })
        .join(' ');
};
exports.singleLine = singleLine;
var logLayout = {
    type: 'pattern',
    pattern: '%[%d %p %f{1}:%l %x{singleLine}%]',
    tokens: {
        singleLine: exports.singleLine,
    },
};
log4js_1.default.configure({
    appenders: {
        console: {
            type: 'console',
            layout: logLayout,
        },
    },
    categories: {
        default: {
            appenders: ['console'],
            level: !!process.env.DEBUG ? 'debug' : 'info',
            enableCallStack: true,
        },
    },
});
exports.logger = log4js_1.default.getLogger();
