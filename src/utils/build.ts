import process from 'node:process'
import fs from 'node:fs'
import path from 'node:path'
import chokidar from 'chokidar'
import type { Config as TailwindConfig } from 'tailwindcss'
import type { Config } from '..'
import { handlePostcss } from './postcss'
import { logError,  logFileChange, logInfo } from './log'
import { getTailwindConfig } from './config'

export async function build(config: Config, isWatch = false) {
  const { include, ignore, tailwindcss } = config

  if (!include) {
    logError('No File Need To Be Processed')
    process.exit(1)
  }

  const tailwindConfig = await getTailwindConfig(tailwindcss?.configFile) as TailwindConfig

  const watcher = chokidar.watch(include, {
    ignored: ignore || undefined,
  })

  watcher.on('add', (path) => {
    if (!isWatch) {
      return
    }
    handlePostcss(path, config, tailwindConfig)
  })

  watcher.on('change', (path) => {
    if (!isWatch) {
      return
    }
    logFileChange(path)
    handlePostcss(path, config, tailwindConfig)
  })

  watcher.on('ready', async () => {
    const watched = watcher.getWatched()
    const globalStyleExist = !!config.globalStyle && fs.existsSync(config.globalStyle)
    if (globalStyleExist) {
      handlePostcss('', config, tailwindConfig, true)
    }
    if (!isWatch) {
      for (const [dir, files] of Object.entries(watched)) {
        for (const file of files) {
          const filePath = path.join(dir, file)
          await handlePostcss(filePath, config, tailwindConfig)
        }
      }
      process.exit(0)
    }
  })
}
