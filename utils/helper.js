const Table = require('cli-table')
const chalk = require('chalk')

const table = new Table({
  head: ['Template Name', 'Description', 'Owner/Name', 'Branch'],
  style: {
    head: ['green']
  }
})

/**
 * 展示所有tpl列表
 * 
 * @param {object} tplList 模板对象 
 * @param {string} lyric 描述console
 */
function listTable(tplList, lyric) {
  const list = Object.keys(tplList)
  if (list.length) {
    list.forEach((key) => {
      table.push([key, tplList[key]['description'], tplList[key]['owner/name'], tplList[key]['branch']])
      if (table.length === list.length) {
        console.log(table.toString())
        if (lyric) {
          print.success(`\u2714 ${lyric}`)
        }
        process.exit()
      }
    })
  } else {
    console.log(table.toString())
    if (lyric) {
      print.success(`\u2714 ${lyric}`)
    }
    process.exit()
  }
}

/**
 * 打印对应级别的log
 */
const print = {
  success(msg) {
    return console.log(chalk.green(msg))
  },
  info(msg) {
    return console.log(chalk.blue(msg))
  },
  warn(msg) {
    return console.log(chalk.yellow(msg))
  },
  error(msg) {
    return console.log(chalk.red(msg))
  }
}

module.exports = {
  listTable,
  print
}
