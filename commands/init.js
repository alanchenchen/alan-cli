const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { listTable } = require(`${__dirname}/../utils`)
const { resolve } = require('path')
const chalk = require('chalk')
const download = require('download-git-repo')
const ora = require('ora')

let tplList = require(`${__dirname}/../templates`)
// 已添加的模板名称和简短描述
const existTplName = Object.entries(tplList).map(item => {
  const name = item[0]
  const short = item[1].short
  return `${name}    ${chalk.yellow(short)}`
})

const question = [
  // 模板名称，选择
  {
    type: 'list',
    name: 'name',
    message: 'Template name:',
    choices: existTplName
  },
  // 项目名
  {
    type: 'input',
    name: 'project',
    message: 'Project name:',
    validate (val) {
      if (val !== '') {
        return true
      }
      return 'Project name is required!'
    }
  },
  // 项目初始化目录
  {
    type: 'input',
    name: 'place',
    message: 'Where to init the project:',
    default: './'
  }
]

module.exports = prompt(question).then(({ name, project, place }) => {
  const key = name.split(' ')[0]
  const gitPlace = tplList[key]['owner/name']
  const gitBranch = tplList[key]['branch']
  const spinner = ora('Downloading template...')

  spinner.start()

  download(`${gitPlace}#${gitBranch}`, `${place}/${project}`, (err) => {
    if (err) {
      console.log(chalk.red(err))
      process.exit()
    }
    spinner.stop()
    console.log(chalk.green('New project has been initialized successfully!'))
    console.log(chalk.yellow(
      `      cd ${project}
      npm install or yarn
      `
    ))
  })
})
