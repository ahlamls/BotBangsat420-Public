"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomKata = function (kata) {
    return kata[Math.floor(Math.random() * kata.length)];
};
