const { prompt } = require('inquirer')
const chalk = require('chalk')
const { resolve } = require('path')
const Download = require('../utils/download')

let tplList = require('../templates.json')
// 已添加的模板名称和简短描述
const existTplName = Object.entries(tplList).map(item => {
  const name = item[0]
  const description = item[1].description
  return `${name}    ${chalk.yellow(description)}`
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
    validate(val) {
      if (val !== '') {
        return true
      }
      return 'Project name is required!'
    }
  },
  // 项目描述
  {
    type: 'input',
    name: 'projectDesc',
    message: 'Project description:',
    default: 'a project based on alan-cli'
  },
  // 项目版本号
  {
    type: 'input',
    name: 'projectVersion',
    message: 'Project version:',
    default: '0.0.1'
  },
  // 项目初始化目录
  {
    type: 'input',
    name: 'place',
    message: 'Where to init the project:',
    default: './'
  }
]

module.exports = prompt(question).then(({ name, project, projectDesc, projectVersion, place }) => {
  const key = name.split(' ')[0]
  const gitPlace = tplList[key]['owner/name']
  const gitBranch = tplList[key]['branch']

  new Download({
    gitPath: `${gitPlace}#${gitBranch}`,
    dstPath: resolve(process.cwd(), `${place}/${project}`),
    cliMessage: {
      name: project,
      description: projectDesc,
      version: projectVersion
    }
  })
})
