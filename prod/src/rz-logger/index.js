"use strict";
// tslint:disable
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var RZLog = /** @class */ (function () {
    function RZLog(logs) {
        var date = new Date();
        date.setHours(date.getHours() + 7);
        var logDate = "[" + date.toUTCString() + "+7]";
        var first = logs.shift();
        console.log.apply(console, __spreadArrays([logDate, first], logs));
    }
    return RZLog;
}());
var RZErrorLog = /** @class */ (function () {
    function RZErrorLog(logs) {
        var date = new Date();
        date.setHours(date.getHours() + 7);
        var logDate = "[" + date.toUTCString() + "+7]";
        var first = logs.shift();
        console.error.apply(console, __spreadArrays([logDate, first], logs));
    }
    return RZErrorLog;
}());
exports.Log = function () {
    var logs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        logs[_i] = arguments[_i];
    }
    return new RZLog(logs);
};
exports.ErrorLog = function () {
    var logs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        logs[_i] = arguments[_i];
    }
    return new RZErrorLog(logs);
};
