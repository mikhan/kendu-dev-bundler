"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsConfigReferences = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const loadTsConfig = (dir, tsConfigFilename = 'tsconfig.json') => {
    const tsConfigPath = path_1.default.resolve(dir, tsConfigFilename);
    return fs_1.existsSync(tsConfigPath) ? JSON.parse(fs_1.readFileSync(tsConfigPath, { encoding: 'utf-8' })) : null;
};
function TsConfigReferences(dir, tsConfigFilename) {
    var _a;
    const tsConfigPaths = [];
    const tsConfig = loadTsConfig(dir);
    if (tsConfig === null || tsConfig === void 0 ? void 0 : tsConfig.references) {
        for (const reference of tsConfig.references) {
            const tsConfig = loadTsConfig(reference.path, tsConfigFilename);
            if ((_a = tsConfig === null || tsConfig === void 0 ? void 0 : tsConfig.compilerOptions) === null || _a === void 0 ? void 0 : _a.baseUrl) {
                const referencePath = path_1.default.resolve(dir, reference.path, tsConfig.compilerOptions.baseUrl);
                tsConfigPaths.push(referencePath);
            }
        }
    }
    return tsConfigPaths;
}
exports.TsConfigReferences = TsConfigReferences;
