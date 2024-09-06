import chalk from 'chalk'

export function logInfo(...message: any[]) {
  console.log(chalk.bgBlue.bold.white(' INFO '), ...message)
}

export function logError(...message: any[]) {
  console.log(chalk.bgRed.bold.white(' ERROR '), ...message)
}

export function logWarn(...message: any[]) {
  console.log(chalk.bgYellow.bold.black(' WARN '), ...message)
}

export function logFileChange(path: string) {
  console.log(chalk.bgGreen.bold.white(' CHANGE '), path)
}
