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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = __importStar(require("mysql"));
var RandomKata_1 = require("./RandomKata");
var DrawToCanvas_1 = require("./DrawToCanvas");
var FBUploader_1 = require("./FBUploader");
var rz_logger_1 = require("./rz-logger");
require('dotenv').config();
var BotBangsatClass = /** @class */ (function () {
    function BotBangsatClass() {
        this.specialWord = 'goblok';
        this.kata = [];
    }
    BotBangsatClass.prototype.upload = function (timer) {
        return __awaiter(this, void 0, void 0, function () {
            var selectedKata, sentence;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getKata()
                            .then(function (kata) {
                            _this.kata = kata;
                        })];
                    case 1:
                        _a.sent();
                        selectedKata = RandomKata_1.RandomKata(this.kata);
                        sentence = selectedKata.includes(' -- ') ? " " + selectedKata.split(' -- ').join(this.specialWord) : " " + selectedKata + " " + this.specialWord;
                        return [4 /*yield*/, DrawToCanvas_1.DrawToCanvas.drawTextToCanvas(sentence)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, DrawToCanvas_1.DrawToCanvas.uploadToImgur()
                                .then(function (res) {
                                rz_logger_1.Log('Uploaded to imgur: ' + res.link);
                                FBUploader_1.uploadToFacebook(__assign(__assign({}, res), { word: selectedKata, remainings: _this.kata.length - 1 }), function () {
                                    _this.removeKata(selectedKata, function () {
                                        _this.updateKata(_this.kata);
                                    });
                                    var timeout = Math.floor(Math.random() * timer.length);
                                    rz_logger_1.Log("Will upload again after " + timer[timeout] + " minutes");
                                    setTimeout(function () {
                                        _this.upload(timer);
                                    }, timer[timeout] * 60000);
                                });
                            })
                                .catch(function (err) {
                                rz_logger_1.Log(err);
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BotBangsatClass.prototype.removeKata = function (kata, callback) {
        var indexOfKata = this.kata.indexOf(kata);
        if (typeof this.kata[indexOfKata] !== 'undefined') {
            this.kata.splice(indexOfKata, 1);
            callback && callback();
        }
        else {
            callback && callback();
        }
    };
    BotBangsatClass.prototype.getKata = function () {
        return new Promise(function (res, rej) {
            var connection = mysql.createConnection({
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE
            });
            connection.connect();
            connection.query('SELECT kata FROM `kata` WHERE `id` = 1', function (error, results, fields) {
                if (error !== null) {
                    rej(error.code);
                }
                res(results[0].kata.split(','));
            });
            connection.end();
        });
    };
    BotBangsatClass.prototype.updateKata = function (kata) {
        var stringOfKata = kata.join(',');
        return new Promise(function (res, rej) {
            var connection = mysql.createConnection({
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE
            });
            connection.query("UPDATE kata SET kata = \"" + stringOfKata + "\"", function (error, results, fields) {
                if (error !== null) {
                    rej(error.code);
                }
                rz_logger_1.Log("Database updated!");
                connection.end();
                res();
            });
        });
    };
    return BotBangsatClass;
}());
exports.BotBangsat = (function () { return new BotBangsatClass(); });
