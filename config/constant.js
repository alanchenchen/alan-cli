const { resolve } = require('path')

/**
 * @constant {path} TEMPLATES_JSON_PATH 模板列表的文件路径
 * @constant {string} TEMPLATE_BACKUP_FOLDER_PATH git仓库下载到指定目录的缓存目录路径
 * @constant {string} TEMPLATE_RESOURCE_FOLDER_PATH git仓库下载到指定目录的缓存目录名下的真实模板目录路径
 * @constant {string} TEMPLATE_HOOKS_FILE_PATH git仓库下载到指定目录的缓存目录名下的hooks文件路径
 */
const TEMPLATES_JSON_PATH = resolve(__dirname, '../templates.json')
const TEMPLATE_BACKUP_FOLDER_PATH = resolve(__dirname, '../.temporary')
const TEMPLATE_RESOURCE_FOLDER_PATH = resolve(TEMPLATE_BACKUP_FOLDER_PATH, './template')
const TEMPLATE_HOOKS_FILE_PATH = resolve(TEMPLATE_BACKUP_FOLDER_PATH, './template.hooks.js')

module.exports = {
    TEMPLATES_JSON_PATH,
    TEMPLATE_BACKUP_FOLDER_PATH,
    TEMPLATE_RESOURCE_FOLDER_PATH,
    TEMPLATE_HOOKS_FILE_PATH
}