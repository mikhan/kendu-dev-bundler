import path from 'path'
import { IgnorePlugin } from 'webpack'
import { PWAManifestFactory } from './webpack/pwaManifest'
import { NotifierFactory } from './webpack/notifier'
import { htmlIndexFactory } from './webpack/htmlIndex'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { CreateSymlinkPlugin } from './webpack/Symlink'
import { TsConfigReferences } from './webpack/TsConfigReferences'
import { default as HardSourceWebpackPlugin } from 'hard-source-webpack-plugin'
import type { Configuration } from 'webpack'
import type { KenduApplication, KenduDevBundlerConfig } from './declarations'
import { LoaderConfig } from 'awesome-typescript-loader/dist/interfaces'

export const baseConfigFactory = async (
  kenduApplication: KenduApplication,
  config: KenduDevBundlerConfig
): Promise<Configuration> => {
  const { rootDir } = config
  const sourceDir = path.resolve(rootDir, kenduApplication.sourceDir)
  const outputDir = path.resolve(rootDir, kenduApplication.outputDir)
  const modulesDir = path.resolve(rootDir, 'node_modules')

  const pwaManifestPligin = await PWAManifestFactory(kenduApplication, config)
  const notifierPligin = await NotifierFactory(kenduApplication, config)
  const htmlIndexPligin = await htmlIndexFactory(kenduApplication, config)
  const cleanPlugin = new CleanWebpackPlugin()
  const symlinkPlugin = new CreateSymlinkPlugin(kenduApplication.symlinks)
  const ignorePlugin = new IgnorePlugin(/^\.\/locale$/, /moment$/)
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
  }
  const awLoaderOptions: LoaderConfig = {
    useCache: true,
    useBabel: true,
    cacheDirectory: '.cache',
    babelOptions: babelOptions,
    babelCore: '@babel/core',
    transpileOnly: true,
    useTranspileModule: true,
  }

  const tsConfigPaths = TsConfigReferences(rootDir)

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
              const packageName = <string>module.context.match(/[\\/]@?(kendu[\\/].*?)(?:[\\/]|$)/i)[1]
              return packageName.replace(/[\\/]/, '-').toLowerCase()
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
      new HardSourceWebpackPlugin(),
    ],
  }
}
