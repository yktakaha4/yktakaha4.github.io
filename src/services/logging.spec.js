"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logging_1 = require("@/services/logging");
describe('singleLine', function () {
    test('単一行に変換される', function () {
        var func = function () { };
        var logEvent = {
            data: [
                'test message',
                { key: 'value', func: func },
                [1, 2, 3],
                null,
                undefined,
            ],
        };
        var result = (0, logging_1.singleLine)(logEvent);
        expect(result).toBe("test message { key: 'value', func: [Function: func] } [ 1, 2, 3 ] null undefined");
    });
});
