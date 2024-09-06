<h1 align="center">
Welcome to tailwindcss-split 👋
<br>
<a href="https://npm.im/tailwindcss-split">
  <img src="https://badgen.net/npm/v/tailwindcss-split">
</a>
<a href="https://npm.im/tailwindcss-split">
  <img src="https://badgen.net/github/stars/hcl-z/tailwindcss-split">
</a>
<a href="https://npm.im/tailwindcss-split">
  <img src="https://badgen.net/npm/license/tailwindcss-split">
</a>
</h1>

## 简介
> "一个用于分割和优化 Tailwind CSS 样式的工具，为组件或页面生成单独的 CSS 文件，以提高性能和可维护性。"

## Install
确认 `postcss` and `tailwindcss` 已经安装
```sh
npm install -D postcss tailwindcss
```
安装 `tailwindcss-split`
```sh
npm install -D tailwindcss-split
```

## Usage
```sh
tws [options]
```

## Options

```sh
-w, --watch: 以监视模式运行
-c, --config <path>: 指定配置文件路径，默认为 tws.config.js
-i, --include <path>: 指定要处理的文件路径
-x, --ignore <path>: 指定要忽略的文件路径
-tc, --twConfig <path>: 指定 Tailwind CSS 配置文件路径
-g, --globalStyle <path>: 指定全局样式文件路径

```

## Config
```js
// tws.config.js
export default {
  include: [
    'src/**/*.tsx',
  ],
  ignore: [
    'src/**/*.spec.tsx',
  ],
  postcss: {

  }
}
```
```ts
export interface Config {
  /**
   * 要包含的文件或目录
   */
  include?: string | string[]
  /**
   * 要忽略的文件或目录
   */
  ignore?: string | RegExp | (string | RegExp)[]
  /**
   * PostCSS 配置
   */
  postcss?: {
    /**
     * 预处理插件
     */
    prePlugins?: Plugin[]
    /**
     * 后处理插件
     */
    postPlugins?: Plugin[]
  }
  /**
   * Tailwind 配置文件路径
   */
  twConfig?: string
  /**
   * Tailwind CSS 配置（不包含 content 选项）
   */
  tailwindcss?: Omit<TailwindConfig, 'content'>
  /**
   * 输出配置
   */
  output?: {
    /**
     * 全局样式输出路径
     */
    global?: string
    /**
     * 单文件样式输出路径或生成函数
     */
    single?: string | ((path: string) => string)
  }
}
```

## License
MIT
