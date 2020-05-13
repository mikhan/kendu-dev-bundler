export type KenduApplicationTheme = {
  canvasBackground: string
  canvasText: string
  primaryBackground: string
  primaryText: string
}

export type KenduApplicationIcon = {
  src: string
  sizes?: number[]
}

export type KenduApplicationSymlink = {
  link: string
  origin: string
}

export type KenduApplication = {
  name: string
  shorName: string
  description: string
  favicon?: string
  theme: KenduApplicationTheme
  lang: string
  icons: KenduApplicationIcon[]
  rootDir: string
  sourceDir: string
  outputDir: string
  modulesDir: string
  entries: {
    [name: string]: string
  },
  symlinks: KenduApplicationSymlink[],
  compilerOptions: {
    
  }
}

export type KenduDevBundlerConfig = {
  production: boolean
  rootDir: string
  watch: boolean
}