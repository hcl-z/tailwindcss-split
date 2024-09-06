import path from 'node:path'
import fs from 'node:fs'
import postcss from 'postcss'
import type { Config as TailwindConfig } from 'tailwindcss'
import tailwindcss from 'tailwindcss'
import type { Config } from '../index'
import { getAbsolutePath, resetExt } from './path'
import { logInfo } from './log'

export async function handlePostcss(file: string, config: Config, tailwindConfig: TailwindConfig, isGlobal?: boolean) {
  // postcss plugins
  const prePostcssPlugins = config.postcss?.prePlugins || []
  const postPostcssPlugins = config.postcss?.postPlugins || []

  // output
  const singleOutput = (typeof config.output?.single === 'function' ? config.output?.single(file) : config.output?.single) || resetExt(file, '.css')
  const globalOutput = config.output?.global || 'global.css'
  const outputPath = getAbsolutePath(isGlobal ? globalOutput : singleOutput)

  // tailwindcss config
  const twConfig = {
    ...tailwindConfig,
    ...config.tailwindcss || {},
    content: isGlobal ? [] : [file],
  }

  // css content
  const singleCssContent = `
    @tailwind utilities;    
    `
  
  const globalCssContent = fs.readFileSync(config.globalStyle!, 'utf8')
  const cssContent = isGlobal ? globalCssContent : singleCssContent


  await postcss([
    ...prePostcssPlugins,
    tailwindcss(twConfig),
    ...postPostcssPlugins,
  ]).process(cssContent, { from: undefined }).then((result) => {
    const outputDir = path.dirname(outputPath)

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    fs.writeFileSync(outputPath, result.css)
    logInfo(`Generated CSS for ${file} -> ${outputPath}`)
  })
}
