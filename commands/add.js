const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { listTable } = require(`${__dirname}/../utils`)

let tplList = require(`${__dirname}/../templates`)

const question = [
  // 模板名称
  {
    type: 'input',
    name: 'name',
    message: 'Set the custom name of the template:',
    validate (val) {
      if (tplList[val]) {
        return 'Template is existed!'
      } else if (val === '') {
        return 'Name is required!'
      } else {
        return true
      }
    }
  },
  // 模板名称简短描述
  {
    type: 'input',
    name: 'short',
    message: 'Set the short description of the template:',
  },
  // 模板仓库名
  {
    type: 'input',
    name: 'place',
    message: 'Owner/name of the template:',
    validate (val) {
      if (val !== '') {
        return true
      }
      return 'Link is required!'
    }
  },
  // 模板仓库分支
  {
    type: 'input',
    name: 'branch',
    message: 'Branch of the template:',
    default: 'master'
  }
]

module.exports = prompt(question).then(({ name, short, place, branch }) => {
  tplList[name] = {}
  tplList[name]['short'] = short || ''
  tplList[name]['owner/name'] = place
  tplList[name]['branch'] = branch

  writeFile(`${__dirname}/../templates.json`, JSON.stringify(tplList, null, 2), 'utf-8', (err) => {
    if (err) {
      console.log(err)
    }
    listTable(tplList, 'New template has been added successfully!')
  })
})