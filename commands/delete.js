const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { listTable } = require('../utils/helper')
const { print } = require('../utils/helper')
const { TEMPLATES_JSON_PATH } = require('../config/constant')

let tplList = require('../templates.json')
// 已添加的模板名称
const existTplName = Object.keys(tplList)

const question = [
  {
    type: 'list',
    name: 'name',
    message: 'Which template you want to delete:',
    choices: existTplName
  }
]

module.exports = prompt(question).then(({ name }) => {
  delete tplList[name]

  writeFile(TEMPLATES_JSON_PATH, JSON.stringify(tplList, null, 2), 'utf-8', (err) => {
    if (err) {
      print.error(err)
    }
    listTable(tplList, 'Template has been deleted successfully!')
  })
})
