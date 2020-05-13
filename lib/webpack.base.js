"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseConfigFactory = void 0;
const path_1 = __importDefault(require("path"));
const webpack_1 = require("webpack");
const pwaManifest_1 = require("./webpack/pwaManifest");
const notifier_1 = require("./webpack/notifier");
const htmlIndex_1 = require("./webpack/htmlIndex");
const clean_webpack_plugin_1 = require("clean-webpack-plugin");
const Symlink_1 = require("./webpack/Symlink");
const TsConfigReferences_1 = require("./webpack/TsConfigReferences");
const hard_source_webpack_plugin_1 = __importDefault(require("hard-source-webpack-plugin"));
exports.baseConfigFactory = async (kenduApplication, config) => {
    const { rootDir } = config;
    const sourceDir = path_1.default.resolve(rootDir, kenduApplication.sourceDir);
    const outputDir = path_1.default.resolve(rootDir, kenduApplication.outputDir);
    const modulesDir = path_1.default.resolve(rootDir, 'node_modules');
    const pwaManifestPligin = await pwaManifest_1.PWAManifestFactory(kenduApplication, config);
    const notifierPligin = await notifier_1.NotifierFactory(kenduApplication, config);
    const htmlIndexPligin = await htmlIndex_1.htmlIndexFactory(kenduApplication, config);
    const cleanPlugin = new clean_webpack_plugin_1.CleanWebpackPlugin();
    const symlinkPlugin = new Symlink_1.CreateSymlinkPlugin(kenduApplication.symlinks);
    const ignorePlugin = new webpack_1.IgnorePlugin(/^\.\/locale$/, /moment$/);
    const babelOptions = {
        plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties'],
            ['@babel/plugin-proposal-nullish-coalescing-operator'],
            ['@babel/plugin-proposal-optional-chaining'],
            ['@babel/plugin-proposal-private-methods'],
            ['@babel/plugin-syntax-dynamic-import'],
            //['angularjs-digest-await'],
            ['angularjs-annotate'],
        ],
        presets: [
            [
                '@babel/preset-env',
                {
                    useBuiltIns: 'usage',
                    corejs: 3,
                },
            ],
        ],
    };
    const awLoaderOptions = {
        useCache: true,
        useBabel: true,
        cacheDirectory: '.cache',
        babelOptions: babelOptions,
        babelCore: '@babel/core',
        transpileOnly: true,
        useTranspileModule: true,
    };
    const tsConfigPaths = TsConfigReferences_1.TsConfigReferences(rootDir);
    return {
        context: sourceDir,
        entry: kenduApplication.entries,
        output: {
            path: outputDir,
            filename: './app/[name].js',
        },
        resolve: {
            modules: [sourceDir, ...tsConfigPaths, modulesDir],
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        target: 'web',
        module: {
            rules: [
                {
                    test: /\.(ts)$/,
                    exclude: /node_modules/,
                    /*exclude: (a) => {
                      console.log(a)
                      return /[\\/]node_modules[\\/](?!(kendu|@kendu))/.test(a)
                    },*/
                    use: [{ loader: 'awesome-typescript-loader', options: awLoaderOptions }],
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [{ loader: 'babel-loader', options: babelOptions }],
                },
                {
                    test: /\.(html)$/,
                    use: [{ loader: 'html-loader', options: { attributes: false } }],
                },
                {
                    test: /\.(svg|png|jpe?g)$/i,
                    use: [{ loader: 'url-loader' }],
                },
            ],
        },
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    submodules: {
                        minSize: 0,
                        minChunks: 1,
                        chunks: 'all',
                        test: /kendu/i,
                        name(module) {
                            const packageName = module.context.match(/[\\/]@?(kendu[\\/].*?)(?:[\\/]|$)/i)[1];
                            return packageName.replace(/[\\/]/, '-').toLowerCase();
                        },
                    },
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                    },
                },
            },
        },
        plugins: [
            cleanPlugin,
            notifierPligin,
            ignorePlugin,
            htmlIndexPligin,
            pwaManifestPligin,
            symlinkPlugin,
            new hard_source_webpack_plugin_1.default(),
        ],
    };
};
