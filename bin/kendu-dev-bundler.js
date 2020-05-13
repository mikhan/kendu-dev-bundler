#!/usr/bin/env node
//@ts-check
'use strict'
const path = require('path')
const fs = require('fs')
const { bundle } = require('../lib')
const yargs = require('yargs')

const MODE_PRODUCTION = 'prod'
const MODE_DEVELOPMENT = 'dev'

const options = yargs
  .help()
  .alias('help', 'h')
  .version()
  .alias('version', 'v')
  .usage('Usage: $0 [options]')
  .options({
    config: {
      type: 'string',
      default: 'application.json',
      description: 'Application config file',
      normalize: true,
    },
  })
  .options({
    mode: {
      type: 'string',
      alias: 'm',
      description: 'Build mode',
      choices: [MODE_DEVELOPMENT, MODE_PRODUCTION],
      default: process.env.NODE_ENV === 'production' ? MODE_PRODUCTION : MODE_DEVELOPMENT,
    },
  })
  .options({
    watch: {
      type: 'boolean',
      alias: 'w',
      default: false,
      description: 'Watch for changes',
    },
  }).argv

const handleExit = () => {
  process.exit()
}

const handleError = (e) => {
  console.error(e)
  process.exit(1)
}

process.on('SIGINT', handleExit)
process.on('uncaughtException', handleError)

const rootDir = process.cwd()
const configPath = path.join(rootDir, options.config)

if(!fs.existsSync(configPath)) {
    throw 'Config file application.json not found in project root'
}

const KenduApplication = require(configPath)
const production = options.mode === MODE_PRODUCTION
const watch = options.watch

bundle(KenduApplication, { production, rootDir, watch })
