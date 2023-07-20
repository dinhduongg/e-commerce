import chalk from 'chalk'

const logger = {
  error: (text: string) => {
    console.log(chalk.red(text))
  },
  success: (text: string) => {
    console.log(chalk.greenBright(text))
  },
  warning: (text: string) => {
    console.log(chalk.yellow(text))
  },
  info: (text: string) => {
    console.log(chalk.blue(text))
  }
}

export default logger
