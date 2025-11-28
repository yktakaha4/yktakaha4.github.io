"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var NotFound = function () {
    (0, react_1.useEffect)(function () {
        window.location.replace('/');
    }, []);
    return (0, jsx_runtime_1.jsx)("div", { children: "Redirecting..." });
};
exports.default = NotFound;
