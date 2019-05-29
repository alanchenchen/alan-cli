const { resolve } = require('path')
const { writeFile } = require('fs')

/**
 * cli对所有模板的默认hooks
 */
module.exports = {
    async beforeInit() {},
    // 模板初始化后同步修改package.json中的名称、描述和版本号信息
    async afterInit({
        configs
    }) {
        const {resourcePath, cliMessage} = configs
        const modifyInfo = () => {
            return new Promise((done, reject) => {
                const targetPath = resolve(resourcePath, './package.json')
                let clone = require(targetPath)
                clone.name = cliMessage.name
                clone.description = cliMessage.description
                clone.version = cliMessage.version

                writeFile(targetPath, JSON.stringify(clone, null, 2), 'utf-8', err => {
                    if(err) {
                        print.error(err)
                        reject(err)
                    }
                    else {
                        done()
                    }
                })
            })
        }
        await modifyInfo()
    }
}