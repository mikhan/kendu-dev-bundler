"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PWAManifestFactory = void 0;
const path_1 = __importDefault(require("path"));
const webpack_pwa_manifest_1 = __importDefault(require("webpack-pwa-manifest"));
const defaultSizes = [512, 192, 144, 96, 48];
exports.PWAManifestFactory = async (kenduApplication, config) => {
    const { rootDir } = config;
    const icons = [];
    if (Array.isArray(kenduApplication.icons)) {
        for (let { src, sizes } of kenduApplication.icons) {
            icons.push({
                src: path_1.default.resolve(rootDir, src),
                sizes: sizes || defaultSizes,
                destination: 'app/icons',
            });
        }
    }
    return new webpack_pwa_manifest_1.default({
        name: kenduApplication.name,
        short_name: kenduApplication.shorName,
        description: kenduApplication.description,
        fingerprints: false,
        background_color: kenduApplication.theme.canvasBackground,
        start_url: '.',
        display: 'standalone',
        orientation: 'any',
        lang: kenduApplication.lang,
        dir: 'ltr',
        theme_color: kenduApplication.theme.primaryBackground,
        icons,
    });
};
