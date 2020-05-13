"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSymlinkPlugin = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
async function createSymlink(outputDir, link, origin) {
    link = path_1.default.resolve(outputDir, link);
    const linkExists = fs_1.existsSync(link);
    if (linkExists)
        return;
    origin = path_1.default.resolve(outputDir, origin);
    const originExists = fs_1.existsSync(origin);
    if (!originExists)
        return;
    const stat = await fs_1.promises.lstat(origin);
    if (stat.isDirectory()) {
        await fs_1.promises.symlink(origin, link, 'junction');
    }
    else {
        await fs_1.promises.link(origin, link);
    }
}
class CreateSymlinkPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.done.tapAsync('CreateSymlinkPlugin', (_stats, callback) => {
            var _a, _b;
            const outputDir = path_1.default.resolve((_b = (_a = compiler.options.output) === null || _a === void 0 ? void 0 : _a.path) !== null && _b !== void 0 ? _b : '');
            for (let { link, origin } of this.options) {
                createSymlink(outputDir, link, origin);
            }
            callback();
        });
    }
}
exports.CreateSymlinkPlugin = CreateSymlinkPlugin;
