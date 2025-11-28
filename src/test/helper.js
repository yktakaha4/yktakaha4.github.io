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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAllTempDirs = exports.tempDir = exports.uuid = void 0;
var os = __importStar(require("os"));
var crypto = __importStar(require("crypto"));
var fs_extra_1 = require("fs-extra");
var process = __importStar(require("process"));
var uuid = function () { return crypto.randomUUID(); };
exports.uuid = uuid;
var baseTempDir = os.tmpdir();
if (!baseTempDir) {
    throw new Error('Failed to get baseTempDir');
}
var tempDirPrefix = "__capy".concat(process.pid, "__");
var tempDir = function () {
    var dir = "".concat(baseTempDir, "/").concat(tempDirPrefix).concat((0, exports.uuid)());
    (0, fs_extra_1.mkdirpSync)(dir);
    return dir;
};
exports.tempDir = tempDir;
var removeAllTempDirs = function () {
    try {
        var dirs = (0, fs_extra_1.readdirSync)(baseTempDir);
        for (var _i = 0, dirs_1 = dirs; _i < dirs_1.length; _i++) {
            var dir = dirs_1[_i];
            if (dir.startsWith(tempDirPrefix)) {
                (0, fs_extra_1.rmSync)("".concat(baseTempDir, "/").concat(dir), { recursive: true });
            }
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.removeAllTempDirs = removeAllTempDirs;
