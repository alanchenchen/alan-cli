const download = require('download-git-repo')
const ora = require('ora')
const { prompt } = require('inquirer')
const defaultHooks = require('../config/defaultHooks')

const { 
    renameFolder,
    deleteFolder, 
    print 
} = require('./helper')

const { 
    TEMPLATE_BACKUP_FOLDER_PATH, 
    TEMPLATE_RESOURCE_FOLDER_PATH, 
    TEMPLATE_HOOKS_FILE_PATH 
} = require('../config/constant')

/**
 * 处理git仓库下载到本地的class
 * 集成hooks功能，会自动导入仓库模板顶层目录的template.hooks.js作为钩子函数执行
 * 
 * @constructor
 *  @param {object} opts
 *  @param {string} opts.gitPath git仓库地址
 *  @param {string} opts.dstPath 最终下载的目的地址
 *  @param {object} opts.cliMessage 命令行参数
 *      @param {string} opts.cliMessage.name 项目名称
 *      @param {string} opts.cliMessage.description 项目描述
 *      @param {string} opts.cliMessage.version 项目版本号
 */
class Download {
    constructor({ gitPath, dstPath, cliMessage }) {
        this._init({
            gitPath,
            dstPath,
            cliMessage
        })
    }

    _init({ gitPath, dstPath, cliMessage }) {
        const spinner = ora('Downloading template...')
        spinner.start()

        download(gitPath, TEMPLATE_BACKUP_FOLDER_PATH, async (err) => {
            if (err) {
                spinner.stop()
                print.error(err)
                process.exit(1)
            }
            spinner.succeed()

            const beforeOpts = {
                print,
                prompt,
                configs: {
                    cliMessage,
                    resourcePath: TEMPLATE_BACKUP_FOLDER_PATH
                }
            }
            const afterOpts = {
                print,
                prompt,
                configs: {
                    cliMessage,
                    resourcePath: dstPath
                }
            }
            const customHooks = require(TEMPLATE_HOOKS_FILE_PATH)

            try {
                // 默认的beforeInit钩子执行
                await defaultHooks.beforeInit(beforeOpts)

                // 自定义的beforeInit钩子执行
                if (customHooks.hasOwnProperty('beforeInit')) {
                    await customHooks.beforeInit(beforeOpts)
                }

                // 重命名目录，将缓存目录里的模板挪到目的地址，并删除缓存目录
                await renameFolder(TEMPLATE_RESOURCE_FOLDER_PATH, dstPath)
                await deleteFolder(TEMPLATE_BACKUP_FOLDER_PATH)
                
                // 默认的afterInit钩子执行
                await defaultHooks.afterInit(afterOpts)

                print.success('New project has been initialized successfully!')
                
                // 自定义的afterInit钩子执行
                if (customHooks.hasOwnProperty('afterInit')) {
                    await customHooks.afterInit(afterOpts)
                }
                else {
                    print.info(
                        `
                        npm install or yarn
                        `
                    )
                }
            } catch (err) {
                print.error(err)
            }
        })
    }

}

module.exports = Download