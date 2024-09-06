#!/usr/bin/env node

import type { Plugin } from 'postcss'
import type { Config as TailwindConfig } from 'tailwindcss'
import { getArgs } from './utils/args'
import { getConfig, getTwsConfig } from './utils/config'
import { build } from './utils/build'

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
    single?: string | ((file: string) => string)
  }
  /**
   * 全局样式文件路径
   */
  globalStyle?: string
  /**
   * 是否启用监听模式
   */
  watch?: boolean
}

export function defineConfig(config: Config) {
  return config
}

async function main() {
  const args = getArgs()
  const { config } = args
  const twsConfig = await getTwsConfig(config) as Config

  const _config = {
    ...twsConfig,
    ...args,
  }

  if (_config.watch) {
    await build(_config, true)
  }
  else {
    await build(_config)
  }
}

main()
