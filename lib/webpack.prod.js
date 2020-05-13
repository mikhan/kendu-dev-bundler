"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviromentConfigFactory = void 0;
/// <reference path="webpack/Robots.d.ts"/>
const postcss_preset_env_1 = __importDefault(require("postcss-preset-env"));
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const robotstxt_webpack_plugin_1 = __importDefault(require("robotstxt-webpack-plugin"));
const workbox_webpack_plugin_1 = require("workbox-webpack-plugin");
const webpack_1 = require("webpack");
const workboxPlugin = new workbox_webpack_plugin_1.InjectManifest({
    swSrc: 'sw.ts',
    swDest: 'sw.js',
    /* @ts-ignore */
    injectionPoint: '__PRECACHE_MANIFEST__',
});
exports.enviromentConfigFactory = async (kenduApplication, config) => ({
    mode: 'production',
    devtool: false,
    module: {
        rules: [
            {
                test: /\.s?css/,
                use: [
                    { loader: mini_css_extract_plugin_1.default.loader },
                    { loader: 'css-loader', options: { importLoaders: 1, modules: { auto: true } } },
                    { loader: 'postcss-loader', options: { plugins: () => postcss_preset_env_1.default({ stage: 0 }) } },
                    { loader: 'sass-loader' },
                ],
            },
        ],
    },
    plugins: [
        workboxPlugin,
        new webpack_1.ProgressPlugin(),
        new mini_css_extract_plugin_1.default({
            filename: './app/[name].css',
        }),
        new robotstxt_webpack_plugin_1.default({
            policy: [{ userAgent: '*', disallow: '/' }],
        }),
    ],
});
