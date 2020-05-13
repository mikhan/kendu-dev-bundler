import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import templateConstructor from '../template'
import type { KenduApplication, KenduDevBundlerConfig } from '../declarations'

export const htmlIndexFactory = async (kenduApplication: KenduApplication, config: KenduDevBundlerConfig) => {
  const { rootDir } = config

  return new HtmlWebpackPlugin({
    title: kenduApplication.name,
    filename: 'index.html',
    template: path.resolve(kenduApplication.sourceDir, 'index.html'),
    inject: 'head',
    scriptLoading: 'defer',
    showErrors: true,
    minify: true,
    hash: true,
    favicon: kenduApplication.favicon ? path.resolve(rootDir, kenduApplication.favicon) : false,
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
  })
}
