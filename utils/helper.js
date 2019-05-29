const Table = require('cli-table')
const chalk = require('chalk')
const { readdirSync, lstatSync, unlinkSync, existsSync, rmdirSync, rename } = require('fs')

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
 * 删除目录(包括非空目录)
 * 
 * @param {string} path 目录路径
 */
function deleteFolder(path) {
  if (existsSync(path)) {  // 查看这个路径是否存在
    const files = readdirSync(path) //  读取一个目录的内容 返回不包含'.' '.' 的文件名的数组（其实会包含）
    files.forEach((file, index) => {
      const curPath = `${path}/${file}`
      if (lstatSync(curPath).isDirectory()) {  // 判断是否是文件夹
        deleteFolder(curPath)
      } else {
        unlinkSync(curPath)
      }
    });
    rmdirSync(path)
  }
}

/**
 * 重命名目录
 * 
 * @param {string} oldPath 旧目录地址 
 * @param {string} newPath 新目录地址
 */
function renameFolder(oldPath, newPath) {
  return new Promise((resolve, reject) => {
    rename(oldPath, newPath, (err) => {
      if (err) {
        reject(err)
      }
      else {
        resolve()
      }
    })
  })
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
  deleteFolder,
  renameFolder,
  print
}
