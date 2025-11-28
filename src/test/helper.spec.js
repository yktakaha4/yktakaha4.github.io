"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("@/test/helper");
var fs_extra_1 = require("fs-extra");
describe('uuid', function () {
    test('uuidが取得できる', function () {
        var id1 = (0, helper_1.uuid)();
        expect(id1).toMatch(/^[a-f0-9]{8}-([a-f0-9]{4}-){3}[a-f0-9]{12}$/);
        var id2 = (0, helper_1.uuid)();
        expect(id2).toMatch(/^[a-f0-9]{8}-([a-f0-9]{4}-){3}[a-f0-9]{12}$/);
        expect(id1).not.toBe(id2);
    });
});
describe('tempDir', function () {
    test('一時ディレクトリが取得できる', function () {
        var dir1 = (0, helper_1.tempDir)();
        expect((0, fs_extra_1.existsSync)(dir1)).toBeTruthy();
        expect((0, fs_extra_1.readdirSync)(dir1).length).toBe(0);
        var dir2 = (0, helper_1.tempDir)();
        expect((0, fs_extra_1.existsSync)(dir2)).toBeTruthy();
        expect((0, fs_extra_1.readdirSync)(dir2).length).toBe(0);
        expect(dir1).not.toBe(dir2);
    });
});
describe('removeAllTempDirs', function () {
    test('一時ディレクトリが削除される', function () {
        var dir1 = (0, helper_1.tempDir)();
        var dir2 = (0, helper_1.tempDir)();
        expect((0, fs_extra_1.existsSync)(dir1)).toBeTruthy();
        expect((0, fs_extra_1.existsSync)(dir2)).toBeTruthy();
        (0, helper_1.removeAllTempDirs)();
        expect((0, fs_extra_1.existsSync)(dir1)).toBeFalsy();
        expect((0, fs_extra_1.existsSync)(dir2)).toBeFalsy();
    });
});
