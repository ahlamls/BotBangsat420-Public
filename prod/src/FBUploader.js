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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var https = __importStar(require("https"));
var rz_logger_1 = require("./rz-logger");
require('dotenv').config();
exports.uploadToFacebook = function (data, onFinish) {
    var tokenFB = process.env.FB_TOKEN;
    var facebookPageID = process.env.FB_PAGEID;
    var requestURL = "https://graph.facebook.com/" + facebookPageID + "/photos?method=POST&url=" + data.link + "&access_token=" + tokenFB;
    var result = '';
    https.get(requestURL, function (resp) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            resp.on('data', function (chunk) { result += chunk; });
            resp.on('end', function () { return __awaiter(void 0, void 0, void 0, function () {
                var json;
                return __generator(this, function (_a) {
                    json = JSON.parse(result);
                    if ('error' in json) {
                        rz_logger_1.Log('Can\'t upload image to FB :(\n[JSON_DUMP]:' + JSON.stringify(json.error));
                    }
                    else {
                        rz_logger_1.Log("Posted to FB with ID: " + json.id + "!");
                        addComment(json.id, data);
                        if (typeof onFinish !== 'undefined') {
                            onFinish();
                        }
                    }
                    return [2 /*return*/];
                });
            }); });
            return [2 /*return*/];
        });
    }); }).on('error', function (err) {
        rz_logger_1.Log('Can\'t upload image to FB :(\n[REASON]:' + err);
    });
};
var addComment = function (postID, data) {
    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        var tokenFB, facebookPageID, link, comment, requestURL, result_1;
        return __generator(this, function (_a) {
            try {
                tokenFB = process.env.FB_TOKEN;
                facebookPageID = process.env.FB_PAGEID;
                link = data.word;
                comment = "https://kbbi.web.id/" + link.toLowerCase().replace(' ', '_') + "\n\nWarna Latar Belakang: " + data.bg + "\nKata Tersisa: " + data.remainings;
                requestURL = "https://graph.facebook.com/" + facebookPageID + "_" + postID + "/comments?method=POST&message=" + encodeURIComponent(comment) + "&access_token=" + tokenFB;
                result_1 = '';
                https.get(requestURL, function (resp) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        resp.on('data', function (chunk) {
                            result_1 += chunk;
                        });
                        resp.on('end', function () { return __awaiter(void 0, void 0, void 0, function () {
                            var json;
                            return __generator(this, function (_a) {
                                json = JSON.parse(result_1);
                                if ('error' in json) {
                                    throw new Error("Can't post comment on picture. [JSON_DUMP]: + " + JSON.stringify(json.error));
                                }
                                else {
                                    rz_logger_1.Log("Comment added!");
                                    resolve({ status: 'SUCCESS' });
                                }
                                return [2 /*return*/];
                            });
                        }); });
                        return [2 /*return*/];
                    });
                }); });
            }
            catch (error) {
                reject({ status: 'ERR', error: error });
            }
            return [2 /*return*/];
        });
    }); });
};
