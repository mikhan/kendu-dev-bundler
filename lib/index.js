"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bundle = void 0;
const webpack_1 = __importDefault(require("./webpack"));
const webpack_2 = __importDefault(require("webpack"));
let lastHash;
exports.bundle = async (kenduApplication, options) => {
    const webpackConfiguration = await webpack_1.default(kenduApplication, options);
    const compiler = webpack_2.default(webpackConfiguration);
    const watchOptions = {
        aggregateTimeout: 300,
        poll: undefined
    };
    const outputOptions = {
        //assetsSort: '!size',
        hash: true,
        version: false,
        timings: true,
        builtAt: false,
        colors: true,
        assets: true,
        cached: false,
        chunks: false,
        modules: false,
        children: false,
        entrypoints: false,
        exclude: /\.(ico|png|json|txt)/
    };
    const compilerHandler = (err, stats) => {
        if (err) {
            lastHash = null;
            console.error(err.stack || err);
            process.exitCode = 1;
            return;
        }
        if (stats.hash !== lastHash) {
            lastHash = stats.hash;
            const statsString = stats.toString(outputOptions);
            if (statsString)
                process.stdout.write(`${statsString}\n\n`);
            if (!options.watch && stats.hasErrors()) {
                process.exitCode = 2;
            }
        }
    };
    if (options.watch) {
        compiler.watch(watchOptions, compilerHandler);
    }
    else {
        compiler.run(compilerHandler);
    }
};
