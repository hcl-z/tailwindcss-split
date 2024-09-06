import path from 'node:path'
import process from 'node:process'

export function normalizePath(path: string) {
  return path.replace(/\\/g, '/')
}

export function getAbsolutePath(file: string) {
  if (path.isAbsolute(file)) {
    return file
  }
  else {
    return path.resolve(process.cwd(), file)
  }
}

export function resetExt(file: string, ext: string) {
  return file.replace(/\.[^.]+$/, ext)
}
