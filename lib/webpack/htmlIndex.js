"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlIndexFactory = void 0;
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const path_1 = __importDefault(require("path"));
exports.htmlIndexFactory = async (kenduApplication, config) => {
    const { rootDir } = config;
    return new html_webpack_plugin_1.default({
        title: kenduApplication.name,
        filename: 'index.html',
        template: path_1.default.resolve(kenduApplication.sourceDir, 'index.html'),
        inject: 'head',
        scriptLoading: 'defer',
        showErrors: true,
        minify: true,
        hash: true,
        favicon: kenduApplication.favicon ? path_1.default.resolve(rootDir, kenduApplication.favicon) : false,
        meta: {
            viewport: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
            description: kenduApplication.description,
        },
        link: []
        //templateContent: templateConstructor,
        /*templateParameters: (_compilation, assets, _assetTags, options) => ({
          title: options.title || '',
          lang: kenduApplication.lang,
          base: options.base,
          meta: [
            ...Object.entries(options.meta)
              .map(([name, content]) => ({ name, content })),
          ],
          link: [
            { rel: 'icon', type: 'image/x-icon', href: assets.favicon },
            ...options.link,
            ...assets.css.map((href: string) => ({ rel: 'stylesheet', href, media: 'all' }))
          ],
          script: [
            ...assets.js.map((src: string) => ({ type: 'text/javascript', src, defer: true }))
          ],
        }),*/
        //base: '/',
    });
};
