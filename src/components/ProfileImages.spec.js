"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@testing-library/react");
var ProfileImages_1 = require("@/components/ProfileImages");
describe('ProfileImages', function () {
    describe('スナップショットテスト', function () {
        test('プロフィール画像が描画される', function () {
            var container = (0, react_1.render)((0, jsx_runtime_1.jsx)(ProfileImages_1.ProfileImages, {})).container;
            expect(container).toMatchSnapshot();
        });
    });
});
