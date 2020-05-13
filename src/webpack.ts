import merge from 'webpack-merge'
import type { KenduApplication, KenduDevBundlerConfig } from './declarations'

export default async (kenduApplication: KenduApplication, config: KenduDevBundlerConfig) => {
  const { production } = config
  const { baseConfigFactory } = await import('./webpack.base')
  const { enviromentConfigFactory } = production
    ? await import('./webpack.prod')
    : await import('./webpack.dev')

  const baseConfig = await baseConfigFactory(kenduApplication, config)
  const enviromentConfig = await enviromentConfigFactory(kenduApplication, config)

  return merge(baseConfig, enviromentConfig)
}
