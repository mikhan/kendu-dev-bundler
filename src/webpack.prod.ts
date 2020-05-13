/// <reference path="webpack/Robots.d.ts"/>
import postcssPresetEnv from 'postcss-preset-env'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import RobotstxtPlugin from 'robotstxt-webpack-plugin'
import { InjectManifest } from 'workbox-webpack-plugin'
import { ProgressPlugin } from 'webpack'
import type { Configuration } from 'webpack'
import type { KenduApplication, KenduDevBundlerConfig } from './declarations'

const workboxPlugin = new InjectManifest({
  swSrc: 'sw.ts',
  swDest: 'sw.js',
  /* @ts-ignore */
  injectionPoint: '__PRECACHE_MANIFEST__',
})

export const enviromentConfigFactory = async (
  kenduApplication: KenduApplication,
  config: KenduDevBundlerConfig
): Promise<Configuration> => ({
  mode: 'production',
  devtool: false, //'source-map',
  module: {
    rules: [
      {
        test: /\.s?css/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { importLoaders: 1, modules: { auto: true } } },
          { loader: 'postcss-loader', options: { plugins: () => postcssPresetEnv({ stage: 0 }) } },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  plugins: [
    workboxPlugin,
    new ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: './app/[name].css',
    }),
    new RobotstxtPlugin({
      policy: [{ userAgent: '*', disallow: '/' }],
    }),
  ],
})
