
# alan-cli

![](https://img.shields.io/npm/v/alan-cli.svg)
![](https://img.shields.io/npm/dt/alan-cli.svg)
[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)

A simple CLI for creating your projects
> Author：Alan Chen

> version: 2.0.2

> date: 2019/06/25

## Feature
一款轻量的前端CLI工具，支持自定义添加模板，删除模板，和初始化项目。不仅仅局限于webpack模板，初始化项目其实就是将模板对应的github仓库拷贝到本地。目前CLI内置了3款webpack模板，用于解决多种开发场景配置繁琐的问题。

## Usage
全局安装alan-cli。`npm install -g alan-cli`

打开terminal或 cmd ，输入`alan` or `alan -h` ，你将看到如下信息:
```
  Usage: alan <command>


  Commands:

    add|a      Add a new template
    list|l     List all the templates
    init|i     Generate a new project
    delete|d   Delete a template

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

> 如果你是在使用 `MacOS`, `sudo`可能要加载 `add`和 `delete`命令前.

## Commands
### list | l
这个命令会展示当前脚手架的模板列表.
```
$ alan list
┌───────────────┬─────────────────────────────┬───────────────────────────────┬────────┐
│ Template Name │ Description                 │ Owner/Name                    │ Branch │
├───────────────┼─────────────────────────────┼───────────────────────────────┼────────┤
│ simple        │ building multiple entries   │ alanchenchen/simple-template  │ master │
├───────────────┼─────────────────────────────┼───────────────────────────────┼────────┤
│ vue           │ building vue project easily │ alanchenchen/vue-template     │ master │
├───────────────┼─────────────────────────────┼───────────────────────────────┼────────┤
│ react         │ building react SPA          │ alanchenchen/react-template   │ master │
├───────────────┼─────────────────────────────┼───────────────────────────────┼────────┤
│ library       │ building npm library        │ alanchenchen/library-template │ master │
└───────────────┴─────────────────────────────┴───────────────────────────────┴────────┘
```
目前内置了4个模板,详情请看模板仓库 :
  * [simple](https://github.com/alanchenchen/simple-template)
  * [vue](https://github.com/alanchenchen/vue-template)
  * [react](https://github.com/alanchenchen/react-template)
  * [library](https://github.com/alanchenchen/library-template)

### init | i
初始化新项目，初始化过程会有几次问答，Template name是模板名称，选择`simple`，`react`或者`library`，Project name是项目名称，Project description是项目描述，Project version是项目版本，最后一个问题是在哪个地方初始化项目，默认是当前目录，建议直接按enter.
```
$ alan init

? Template name: simple    building multiple entries
? Project name: demo
? Project description: a project based on alan-cli
? Project version: 0.0.1
? Where to init the project: (./)
New project has been initialized successfully!
      cd demo
      npm install or yarn
```

### add|a
如果你有自定义的模板，你可以直接将github某一仓库模板添加到本地模板列表。模板添加后会自动展示出当前模板列表
```
$ alan add

? Set the custom name of the template: library
? Set the short description of the template: building npm library
? Owner/name of the template: alanchenchen/library-template
? Branch of the template: master
┌───────────────┬─────────────────────────────┬───────────────────────────────┬────────┐
│ Template Name │ Description                 │ Owner/Name                    │ Branch │
├───────────────┼─────────────────────────────┼───────────────────────────────┼────────┤
│ simple        │ building multiple entries   │ alanchenchen/simple-template  │ master │
├───────────────┼─────────────────────────────┼───────────────────────────────┼────────┤
│ vue           │ building vue project easily │ alanchenchen/vue-template     │ master │
├───────────────┼─────────────────────────────┼───────────────────────────────┼────────┤
│ react         │ building react SPA          │ alanchenchen/react-template   │ master │
├───────────────┼─────────────────────────────┼───────────────────────────────┼────────┤
│ library       │ building npm library        │ alanchenchen/library-template │ master │
└───────────────┴─────────────────────────────┴───────────────────────────────┴────────┘
```

## Template
项目模板必须要有固定的目录结构，仓库根目录必须要有一个`template`目录，cli会将整个`template`目录下的所有文件下载下来。仓库根目录可选一个`template.hooks.js`文件，`template.hooks.js`是该模板的cli预处理模块。代码示例如下：
```js
  // 模板hooks文件里，只能导入node原生模块，否则会报错找不到依赖包
  const { resolve } = require('path')

  /*
   * 必须导出一个对象，对象包含两个函数的键值对
   */
  module.exports = {
      // 模板初始前钩子，会在模板下载下来，但是生成目录之前触发
      async beforeInit() {},
      // 模板初始后钩子，会在模板下载下来，生成目录之后触发
      /*
       * 每个钩子函数均有一个形参，形参是一个对象，如下：
       *        {
       *          fs,                // fs-extral包，并不是原生fs模块，使用方法可以参考其文档
       *          print,             // 一个对象，控制台打印模块，print.info()、print.success()、print.warn()、print.error()
       *          prompt,            // 用于命令行交互提问的模块，同inquirer的prompt方法
       *          configs: {         
       *             cliMessage,     // 一个对象，cli中前面几个提示用户输入的答案，name是项目名、description是项目描述、version是版本号
       *             resourcePath    // 模板资源目录的绝对路径，这个路径在不同钩子函数不同，beforeInit阶段指向缓存目录(可以访问到template.hooks.js)，afterInit阶段指向cli进程目录(模板的根目录)
       *         }
       *
       */
      async afterInit({
          configs,
          fs,
          print
      }) {
          // 以下是cli的默认钩子，会在每个模板初始化之后在package.json文件里写入用户输入的项目信息
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

```

## license
* Anti 996(996.ICU)

## Thanks to
* [scion](https://github.com/jrainlau/scion)







