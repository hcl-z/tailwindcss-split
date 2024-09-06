/* eslint-disable ts/no-unused-expressions */
import process from 'node:process'
import path from 'node:path'
import fs from 'node:fs'
import { Command } from 'commander'

export interface Args {
  watch?: boolean
  include?: string
  ignore?: string
  twConfigPath?: string
  globalStyle?: string
  config?: string
}
const program = new Command()

const pkgPath = path.resolve(process.cwd(), 'package.json')

if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  const { name, version, description } = pkg || {}
  name && program.name(name)
  version && program.version(version)
  description && program.description(description)
}

program
  .option('-w, --watch', 'watch mode')
  .option('-c, --config', 'config file path')
  .option('-i, --include <path>', 'file path to be processed')
  .option('-x, --ignore <path>', 'file path to be ignored')
  .option('-tc, --twConfig <path>', 'tailwindcss config file path')
  .option('-g, --globalStyle <path>', 'global style file path')

program.parse(process.argv)

export function getArgs() {
  return program.opts<Args>()
}
