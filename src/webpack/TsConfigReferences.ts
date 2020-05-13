import path from 'path'
import { readFileSync, existsSync } from 'fs'

type TsConfigFile = {
  compilerOptions?: {
    baseUrl: string
  }
  references?: {
    path: string
  }[]
}
const loadTsConfig = (dir: string, tsConfigFilename = 'tsconfig.json'): TsConfigFile | null => {
  const tsConfigPath = path.resolve(dir, tsConfigFilename)

  return existsSync(tsConfigPath) ? JSON.parse(readFileSync(tsConfigPath, { encoding: 'utf-8' })) : null
}

export function TsConfigReferences(dir: string, tsConfigFilename?: string): string[] {
  const tsConfigPaths: string[] = []

  const tsConfig = loadTsConfig(dir)

  if (tsConfig?.references) {
    for (const reference of tsConfig.references) {
      const tsConfig = loadTsConfig(reference.path, tsConfigFilename)

      if (tsConfig?.compilerOptions?.baseUrl) {
        const referencePath = path.resolve(dir, reference.path, tsConfig.compilerOptions.baseUrl)
        tsConfigPaths.push(referencePath)
      }
    }
  }

  return tsConfigPaths
}
