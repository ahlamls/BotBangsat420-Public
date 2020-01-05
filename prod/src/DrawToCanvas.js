"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var canvas_1 = require("canvas");
const { registerFont, createCanvas } = require('canvas');
registerFont('comicsans.ttf', { family: 'Comic Sans' });
var ColorManager_1 = require("./ColorManager");
var rz_logger_1 = require("./rz-logger");
var DrawToCanvasClass = /** @class */ (function () {
    function DrawToCanvasClass() {
        this.canvas = canvas_1.createCanvas(512, 128);
        this.context = this.canvas.getContext('2d');
        this.initialFontSize = 60;
    }
    DrawToCanvasClass.prototype.drawTextToCanvas = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (res) {
                        rz_logger_1.Log('Generating Image...');
                        _this.bgColor = ColorManager_1.Color.randomRGBColor();
                        _this.initialFontSize = 60;
                        _this.context.textAlign = 'center';
                        _this.context.textBaseline = 'middle';
                        _this.context.font = _this.initialFontSize + "px Comic Sans";
                        var decrease = 0;
                        while (_this.context.measureText(text).width > (_this.canvas.width * 0.8)) {
                            _this.context.font = _this.initialFontSize - decrease + "px Comic Sans";
                            decrease++;
                        }
//                        _this.context.fillStyle = ColorManager_1.Color.parseRGB(_this.bgColor);
var my_gradient = _this.context.createLinearGradient(0, 0, 0, 170);
my_gradient.addColorStop(0,ColorManager_1.Color.parseRGB(_this.bgColor));
my_gradient.addColorStop(1,ColorManager_1.Color.parseRGBx(_this.bgColor));
_this.context.fillStyle = my_gradient;
                        _this.context.fillRect(0, 0, _this.canvas.width, _this.canvas.height);
                        _this.context.fillStyle = ColorManager_1.Color.getBrightness(_this.bgColor) > 0.5 ? '#000' : '#fff';
                        _this.context.fillText(text, _this.canvas.width / 2, _this.canvas.height / 2);
                        res();
                    })];
            });
        });
    };
    DrawToCanvasClass.prototype.uploadToImgur = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (res, rej) {
                        rz_logger_1.Log('Uploading to Imgur');
                        var link = '';
                        var imgur = require('imgur');
                        imgur.setAPIUrl('https://api.imgur.com/3/');
                        imgur.getAPIUrl();
                        imgur.uploadBase64(_this.canvas.toDataURL().replace(/^data:image\/png;base64,/, ''))
                            .then(function (json) {
                            link = json.data.link;
                            res({
                                link: link,
                                bg: ColorManager_1.Color.rgbToHex(_this.bgColor),
                                remainings: 0,
                            });
                        })
                            .catch(function (err) {
                            link = '';
                            rz_logger_1.Log("Fail... " + JSON.stringify(err));
                            rej("Fail... " + JSON.stringify(err));
                        });
                    })];
            });
        });
    };
    return DrawToCanvasClass;
}());
exports.DrawToCanvas = (function () { return new DrawToCanvasClass(); })();
