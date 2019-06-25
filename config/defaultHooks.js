const { resolve } = require('path')

/**
 * cli对所有模板的默认hooks
 */
module.exports = {
    async beforeInit() {},
    // 模板初始化后同步修改package.json中的名称、描述和版本号信息
    async afterInit({
        configs,
        fs,
        print
    }) {
        try {
            const {resourcePath, cliMessage} = configs
            const targetPath = resolve(resourcePath, './package.json')
            let clone = require(targetPath)
            clone.name = cliMessage.name
            clone.description = cliMessage.description
            clone.version = cliMessage.version
    
            await fs.outputFile(targetPath, JSON.stringify(clone, null, 2), 'utf-8')
        } catch (err) {
            print.error(err)
        }
    }
}