"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviromentConfigFactory = void 0;
exports.enviromentConfigFactory = async (kenduApplication, config) => ({
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.s?css/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' },
                ],
            },
        ],
    },
    plugins: [
    //new BundleAnalyzerPlugin(),
    ],
});
