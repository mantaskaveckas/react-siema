"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _arguments = arguments;

exports.default = function (func, wait, immediate) {
    var timeout = void 0;
    return function () {
        var context = undefined,
            args = _arguments;
        var later = function later() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};