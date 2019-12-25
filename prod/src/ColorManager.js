"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ColorManagerClass = /** @class */ (function () {
    function ColorManagerClass() {
    }
    ColorManagerClass.prototype.randomRGBColor = function () {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return { r: r, g: g, b: b };
    };
    ColorManagerClass.prototype.parseRGB = function (rgb) {
        var r = rgb.r, g = rgb.g, b = rgb.b;
        return "rgb(" + r + "," + g + "," + b + ")";
    };
    ColorManagerClass.prototype.getBrightness = function (rgb) {
        var r = rgb.r, g = rgb.g, b = rgb.b;
        return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    };
    ColorManagerClass.prototype.rgbToHex = function (rgb) {
        var r = rgb.r, g = rgb.g, b = rgb.b;
        var toHex = function (x) {
            var hex = Math.round(x).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return "#" + toHex(r) + toHex(g) + toHex(b);
    };
    return ColorManagerClass;
}());
exports.Color = (function () { return new ColorManagerClass(); })();
