import path from 'path'
import WebpackNotifierPlugin from 'webpack-notifier'
import type { KenduApplication, KenduDevBundlerConfig } from '../declarations'

export const NotifierFactory = async (kenduApplication: KenduApplication, config: KenduDevBundlerConfig) => {
  return new WebpackNotifierPlugin({
    title: kenduApplication.name,
    contentImage: path.resolve(__dirname, 'main.ico'),
    alwaysNotify: true,
  })
}
