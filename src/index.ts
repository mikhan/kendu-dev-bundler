import webpackConfigFactory from './webpack'
import webpack from 'webpack'
import type { KenduApplication, KenduDevBundlerConfig } from './declarations'
import type { Stats } from 'webpack'

let lastHash: string | null | undefined

export const bundle = async (kenduApplication: KenduApplication, options: KenduDevBundlerConfig) => {
  const webpackConfiguration = await webpackConfigFactory(kenduApplication, options)
  const compiler = webpack(webpackConfiguration)
  const watchOptions = {
    aggregateTimeout: 300,
    poll: undefined
  }
  const outputOptions: Stats.ToStringOptions = {
    //assetsSort: '!size',
    hash: true,
    version: false,
    timings: true,
    builtAt: false,
    colors: true,
    assets: true,
    cached: false,
    chunks: false,
    modules: false,
    children: false,
    entrypoints: false,
    exclude: /\.(ico|png|json|txt)/
  }

  const compilerHandler = (err: Error, stats: Stats) => {
    if (err) {
      lastHash = null
      console.error(err.stack || err)
      process.exitCode = 1

      return
    }

    if (stats.hash !== lastHash) {
      lastHash = stats.hash
      const statsString = stats.toString(outputOptions)

      if (statsString) process.stdout.write(`${statsString}\n\n`)

      if (!options.watch && stats.hasErrors()) {
        process.exitCode = 2
      }
    }
  }

  if (options.watch) {
    compiler.watch(watchOptions, compilerHandler)
  } else {
    compiler.run(compilerHandler)
  }
}
