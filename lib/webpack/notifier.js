"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifierFactory = void 0;
const path_1 = __importDefault(require("path"));
const webpack_notifier_1 = __importDefault(require("webpack-notifier"));
exports.NotifierFactory = async (kenduApplication, config) => {
    return new webpack_notifier_1.default({
        title: kenduApplication.name,
        contentImage: path_1.default.resolve(__dirname, 'main.ico'),
        alwaysNotify: true,
    });
};
