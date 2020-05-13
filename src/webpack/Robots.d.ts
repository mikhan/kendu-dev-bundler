declare module 'robotstxt-webpack-plugin'
declare module 'postcss-preset-env' {
  const postcssPresetEnv: (config?: object) => any
  export default postcssPresetEnv
}