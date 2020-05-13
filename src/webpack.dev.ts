import type { Configuration } from 'webpack'
import type { KenduApplication, KenduDevBundlerConfig } from './declarations'

export const enviromentConfigFactory = async (kenduApplication: KenduApplication, config: KenduDevBundlerConfig): Promise<Configuration> => ({
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
})
