import path from 'path'
import WebpackPwaManifest from 'webpack-pwa-manifest'
import type { KenduApplication, KenduDevBundlerConfig } from '../declarations'

const defaultSizes = [512, 192, 144, 96, 48]

export const PWAManifestFactory = async (kenduApplication: KenduApplication, config: KenduDevBundlerConfig) => {
  const { rootDir } = config
  const icons = []

  if (Array.isArray(kenduApplication.icons)) {
    for (let { src, sizes } of kenduApplication.icons) {
      icons.push({
        src: path.resolve(rootDir, src),
        sizes: sizes || defaultSizes,
        destination: 'app/icons',
      })
    }
  }

  return new WebpackPwaManifest({
    name: kenduApplication.name,
    short_name: kenduApplication.shorName,
    description: kenduApplication.description,
    fingerprints: false,
    background_color: kenduApplication.theme.canvasBackground,
    start_url: '.',
    display: 'standalone',
    orientation: 'any',
    lang: kenduApplication.lang,
    dir: 'ltr',
    theme_color: kenduApplication.theme.primaryBackground,
    icons,
  })
}
