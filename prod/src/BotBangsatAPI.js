"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var rz_logger_1 = require("./rz-logger");
var port = process.env.PORT || 4040;
var BotBangsatAPI = /** @class */ (function () {
    // tslint:disable:no-empty
    // tslint:disable:max-line-length
    function BotBangsatAPI() {
        var exp = express_1.default();
        exp.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
        exp.get('/', function (req, res) {
            rz_logger_1.Log('Accesed!');
            res.send('<h3>Bot Bangsat 420 API</h3><p>I made this to keep bot awake by accesing this page from bot.</p>');
            res.end();
        });
        exp.listen(port, function () {
            rz_logger_1.Log('API Server started!');
        });
    }
    return BotBangsatAPI;
}());
/**
 * RZFury's Awaker
 *
 * I make this to make app stay awake on heroku by creating http server and access it every given minutes
 * @param {string} url
 * URL of The APP SERVER
 * @param {string} number
 * Array on numbers
 */
exports.ActivateAPIServer = function () { return new BotBangsatAPI(); };
